import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const schoolSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: String,
    code: { type: String, unique: true },
    city: String,
    district: String,
    state: String,
    board: String,
    rating: Number,
    students: Number,
    teachers: Number,
    classes: String,
    logoColor: String,
    logoInitials: String,
    status: { type: String, enum: ['approved', 'pending'], default: 'pending' },
    address: String,
    principalName: String,
    email: String,
    phone: String,
  },
  { timestamps: true },
);

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: String,
    role: { type: String, enum: ['admin', 'principal', 'teacher', 'parent'] },
    schoolId: String,
    studentIds: [String],
    initials: String,
    color: String,
    title: String,
  },
  { timestamps: true },
);

const studentSchema = new Schema({ id: { type: String, unique: true }, schoolId: String }, { strict: false, timestamps: true });
const teacherSchema = new Schema({ id: { type: String, unique: true }, schoolId: String }, { strict: false, timestamps: true });
const complaintSchema = new Schema({ id: { type: String, unique: true }, schoolId: String }, { strict: false, timestamps: true });
const notificationSchema = new Schema({ id: { type: String, unique: true }, schoolId: String }, { strict: false, timestamps: true });
const homeworkSchema = new Schema({ id: { type: String, unique: true }, schoolId: String }, { strict: false, timestamps: true });
const timetableSchema = new Schema({ schoolId: String, day: String, periods: Array }, { timestamps: true });
const messageSchema = new Schema(
  {
    schoolId: String,
    from: { type: String, enum: ['teacher', 'parent'] },
    text: String,
    time: String,
  },
  { timestamps: true },
);
const attendanceSchema = new Schema(
  {
    schoolId: String,
    date: String,
    records: Schema.Types.Mixed,
  },
  { timestamps: true },
);

export const School = model('School', schoolSchema);
export const User = model('User', userSchema);
export const Student = model('Student', studentSchema);
export const Teacher = model('Teacher', teacherSchema);
export const Complaint = model('Complaint', complaintSchema);
export const Notification = model('Notification', notificationSchema);
export const Homework = model('Homework', homeworkSchema);
export const Timetable = model('Timetable', timetableSchema);
export const Message = model('Message', messageSchema);
export const Attendance = model('Attendance', attendanceSchema);
