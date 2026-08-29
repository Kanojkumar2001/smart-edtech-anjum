import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { connectMongo } from './db.js';
import { seedIfEmpty } from './seed.js';
import {
  School, User, Student, Teacher, Complaint, Notification, Homework, Timetable, Message, Attendance,
} from './models.js';

const envPath = resolve(process.cwd(), '.env');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const i = trimmed.indexOf('=');
    if (i === -1) continue;
    const key = trimmed.slice(0, i).trim();
    const val = trimmed.slice(i + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

const PORT = Number(process.env.PORT) || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'eduvision-dev-secret';
const DATABASE_URI = process.env.MONGODB_URI || process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017/eduvision';

const app = express();
app.use(cors());
app.use(express.json());

function lean(doc) {
  if (!doc) return doc;
  const o = typeof doc.toObject === 'function' ? doc.toObject() : { ...doc };
  delete o._id;
  delete o.__v;
  delete o.createdAt;
  delete o.updatedAt;
  delete o.passwordHash;
  return o;
}

function sign(user) {
  return jwt.sign({ sub: user._id.toString(), role: user.role, schoolId: user.schoolId, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
}

function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) return res.status(401).json({ error: 'Sign in required' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Session expired. Please sign in again.' });
  }
}

app.get('/api/health', (_req, res) => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.json({
    ok: mongoose.connection.readyState === 1,
    database: 'primary',
    status: states[mongoose.connection.readyState] || 'unknown',
  });
});

app.get('/api/schools', async (_req, res) => {
  const schools = await School.find().sort({ status: 1, name: 1 }).lean();
  res.json(schools.map(lean));
});

app.post('/api/schools', async (req, res) => {
  const body = req.body || {};
  const name = String(body.name || '').trim();
  const code = String(body.code || '').replace(/\D/g, '').slice(0, 8);
  if (!name || code.length !== 8) return res.status(400).json({ error: 'School name and an 8-digit code are required.' });
  const exists = await School.findOne({ code });
  if (exists) return res.status(409).json({ error: 'That school code is already registered.' });
  const id = `s${Date.now()}`;
  const school = await School.create({
    id,
    name,
    code,
    city: body.city || 'Ongole',
    district: body.district || 'Prakasam',
    state: body.state || 'Andhra Pradesh',
    board: body.board || 'CBSE',
    rating: 0,
    students: Number(body.students) || 0,
    teachers: Number(body.teachers) || 0,
    classes: body.classes || 'I–XII',
    logoColor: 'bg-brand-500',
    logoInitials: name.slice(0, 2).toUpperCase(),
    status: 'pending',
    address: body.address,
    principalName: body.principalName,
    email: body.email,
    phone: body.phone,
  });
  res.status(201).json(lean(school));
});

app.patch('/api/schools/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
  const school = await School.findOneAndUpdate({ id: req.params.id }, { $set: { status: req.body.status } }, { new: true });
  if (!school) return res.status(404).json({ error: 'School not found' });
  res.json(lean(school));
});

function publicUser(user, schoolId) {
  return {
    name: user.name,
    email: user.email,
    role: user.role,
    schoolId: schoolId || user.schoolId,
    studentIds: user.studentIds || [],
    initials: user.initials,
    color: user.color,
    title: user.title,
  };
}

const roleTitles = {
  admin: 'Super Admin',
  principal: 'Principal',
  teacher: 'Teacher',
  parent: 'Parent',
};
const roleColors = {
  admin: 'bg-brand-500',
  principal: 'bg-accent-500',
  teacher: 'bg-brand-500',
  parent: 'bg-success-500',
};

app.post('/api/auth/signup', async (_req, res) => {
  return res.status(403).json({ error: 'Account creation is disabled. Please use Sign in with your existing account.' });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password, role, schoolCode } = req.body || {};
  const school = await School.findOne({ code: String(schoolCode || '').trim() });
  if (!school) return res.status(404).json({ error: 'School code not found. Use 72849163 for the demo school.' });
  if (school.status !== 'approved' && role !== 'admin') {
    return res.status(403).json({ error: 'This school is pending admin approval.' });
  }
  const user = await User.findOne({ email: String(email || '').toLowerCase().trim(), role });
  if (!user) return res.status(401).json({ error: 'No account found for this role and email.' });
  const ok = await bcrypt.compare(String(password || ''), user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Incorrect password.' });
  if (user.role !== 'admin' && user.schoolId !== school.id) {
    return res.status(403).json({ error: 'This account is not linked to the selected school.' });
  }
  res.json({
    token: sign(user),
    user: publicUser(user, school.id),
  });
});

app.get('/api/me', auth, async (req, res) => {
  const user = await User.findById(req.user.sub);
  if (!user) return res.status(401).json({ error: 'Account not found' });
  res.json({
    name: user.name,
    email: user.email,
    role: user.role,
    schoolId: user.schoolId,
    studentIds: user.studentIds || [],
    initials: user.initials,
    color: user.color,
    title: user.title,
  });
});

app.get('/api/bootstrap', auth, async (req, res) => {
  const schoolId = req.user.role === 'admin' ? undefined : req.user.schoolId;
  const schoolFilter = schoolId ? { schoolId } : {};
  const [schools, students, teachers, complaints, notifications, homework, timetable, messages] = await Promise.all([
    School.find(req.user.role === 'admin' ? {} : { id: req.user.schoolId }).lean(),
    Student.find(schoolFilter).lean(),
    Teacher.find(schoolFilter).lean(),
    Complaint.find(schoolFilter).lean(),
    Notification.find(schoolFilter).lean(),
    Homework.find(schoolFilter).lean(),
    Timetable.find(schoolFilter).lean(),
    Message.find(schoolFilter).sort({ createdAt: 1 }).lean(),
  ]);
  res.json({
    schools: schools.map(lean),
    students: students.map(lean),
    teachers: teachers.map(lean),
    complaints: complaints.map(lean),
    notifications: notifications.map(lean),
    homework: homework.map(lean),
    timetable: timetable.map(lean),
    messages: messages.map(lean),
  });
});

app.post('/api/homework', auth, async (req, res) => {
  const id = `h${Date.now()}`;
  const item = await Homework.create({
    id,
    schoolId: req.user.schoolId,
    subject: req.body.subject || 'General',
    title: req.body.title || 'New assignment',
    due: req.body.due || 'TBD',
    status: 'pending',
    color: req.body.color || 'bg-brand-500',
  });
  res.status(201).json(lean(item));
});

app.patch('/api/complaints/:id', auth, async (req, res) => {
  const item = await Complaint.findOneAndUpdate({ id: req.params.id }, { $set: { status: req.body.status } }, { new: true });
  if (!item) return res.status(404).json({ error: 'Complaint not found' });
  res.json(lean(item));
});

app.patch('/api/notifications/:id/read', auth, async (req, res) => {
  const item = await Notification.findOneAndUpdate({ id: req.params.id }, { $set: { read: true } }, { new: true });
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(lean(item));
});

app.post('/api/messages', auth, async (req, res) => {
  const text = String(req.body.text || '').trim();
  if (!text) return res.status(400).json({ error: 'Message cannot be empty.' });
  const from = req.user.role === 'teacher' ? 'teacher' : 'parent';
  const item = await Message.create({
    schoolId: req.user.schoolId,
    from,
    text,
    time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
  });
  res.status(201).json(lean(item));
});

app.post('/api/attendance', auth, async (req, res) => {
  const date = req.body.date || new Date().toISOString().slice(0, 10);
  const item = await Attendance.findOneAndUpdate(
    { schoolId: req.user.schoolId, date },
    { $set: { records: req.body.records || {} } },
    { upsert: true, new: true },
  );
  res.json(lean(item));
});

app.post('/api/students/:id/marks', auth, async (req, res) => {
  const student = await Student.findOneAndUpdate(
    { id: req.params.id },
    { $set: { marksDraft: req.body } },
    { new: true },
  );
  if (!student) return res.status(404).json({ error: 'Student not found' });
  res.json(lean(student));
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Unexpected server error' });
});

async function start() {
  try {
    await connectMongo(DATABASE_URI);
    const seeded = await seedIfEmpty();
    console.log(seeded ? 'Database connected · demo data seeded' : 'Database connected');
    app.listen(PORT, () => console.log(`EduVision API http://localhost:${PORT}`));
  } catch (err) {
    console.error('Database connection failed:', err.message);
    console.error('Start the database service or set DATABASE_URI, then restart the API.');
    process.exit(1);
  }
}

start();
