import type {
  School,
  Student,
  Teacher,
  Complaint,
  Notification,
  TimetableSlot,
  HomeworkItem,
  ChatMessage,
} from './types';

export const schools: School[] = [
  {
    id: 's1',
    name: 'Kendriya Vidyalaya',
    code: '72849163',
    city: 'Ongole',
    district: 'Prakasam',
    state: 'Andhra Pradesh',
    board: 'CBSE',
    rating: 4.5,
    students: 1200,
    teachers: 64,
    classes: 'I–XII',
    logoColor: 'bg-brand-500',
    logoInitials: 'KV',
    status: 'approved',
  },
  {
    id: 's2',
    name: 'Sri Chaitanya Techno School',
    code: '51293487',
    city: 'Ongole',
    district: 'Prakasam',
    state: 'Andhra Pradesh',
    board: 'CBSE',
    rating: 4.2,
    students: 850,
    teachers: 48,
    classes: 'I–X',
    logoColor: 'bg-accent-500',
    logoInitials: 'SC',
    status: 'approved',
  },
  {
    id: 's3',
    name: 'Narayana Junior College',
    code: '63847192',
    city: 'Ongole',
    district: 'Prakasam',
    state: 'Andhra Pradesh',
    board: 'State Board',
    rating: 4.4,
    students: 1640,
    teachers: 92,
    classes: 'XI–XII',
    logoColor: 'bg-success-500',
    logoInitials: 'NJ',
    status: 'approved',
  },
  {
    id: 's4',
    name: 'Vikas Concept School',
    code: '48572913',
    city: 'Ongole',
    district: 'Prakasam',
    state: 'Andhra Pradesh',
    board: 'CBSE',
    rating: 4.1,
    students: 720,
    teachers: 38,
    classes: 'I–X',
    logoColor: 'bg-warning-500',
    logoInitials: 'VC',
    status: 'approved',
  },
  {
    id: 's5',
    name: 'Bhashyam Public School',
    code: '92746183',
    city: 'Ongole',
    district: 'Prakasam',
    state: 'Andhra Pradesh',
    board: 'State Board',
    rating: 4.3,
    students: 1100,
    teachers: 57,
    classes: 'I–XII',
    logoColor: 'bg-danger-500',
    logoInitials: 'BP',
    status: 'pending',
  },
];

export const students: Student[] = [
  {
    id: 'st1',
    name: 'Rahul Kumar',
    rollNo: '1023',
    className: 'B.Tech CSE',
    section: 'A',
    branch: 'Computer Science',
    avatarColor: 'bg-brand-500',
    initials: 'RK',
    attendance: 87,
    cgpa: 8.1,
    assignments: 92,
    projects: 88,
    participation: 75,
    riskScore: 28,
    riskLevel: 'Normal',
    attendanceTrend: [
      { label: 'Mar', value: 91 },
      { label: 'Apr', value: 89 },
      { label: 'May', value: 84 },
      { label: 'Jun', value: 86 },
      { label: 'Jul', value: 88 },
      { label: 'Aug', value: 87 },
    ],
    subjects: [
      { subject: 'Mathematics', current: 54, previous: 72, predicted: 66, trend: 'down', status: 'weak' },
      { subject: 'Physics', current: 62, previous: 68, predicted: 70, trend: 'down', status: 'average' },
      { subject: 'Programming', current: 85, previous: 80, predicted: 88, trend: 'up', status: 'strong' },
      { subject: 'English', current: 78, previous: 75, predicted: 81, trend: 'up', status: 'strong' },
    ],
    riskFactors: [
      { label: 'Academic Risk', level: 'medium' },
      { label: 'Attendance Risk', level: 'low' },
      { label: 'Assignment Risk', level: 'high' },
    ],
    studyPlan: [
      { day: 'Mon', slots: [
        { time: '6:00–7:00 PM', subject: 'Mathematics', focus: 'Algebra drill', priority: 'high' },
        { time: '7:15–7:45 PM', subject: 'Physics', focus: 'Formula revision', priority: 'medium' },
      ]},
      { day: 'Tue', slots: [
        { time: '6:00–7:00 PM', subject: 'Mathematics', focus: 'Trigonometry', priority: 'high' },
        { time: '7:15–8:00 PM', subject: 'Programming', focus: 'DSA practice', priority: 'low' },
      ]},
      { day: 'Wed', slots: [
        { time: '6:00–7:00 PM', subject: 'Mathematics', focus: 'Past papers', priority: 'high' },
      ]},
      { day: 'Thu', slots: [
        { time: '6:00–6:45 PM', subject: 'Physics', focus: 'Numericals', priority: 'medium' },
        { time: '7:00–8:00 PM', subject: 'Programming', focus: 'Mini project', priority: 'low' },
      ]},
      { day: 'Fri', slots: [
        { time: '6:00–7:00 PM', subject: 'Mathematics', focus: 'Weak areas', priority: 'high' },
      ]},
    ],
    careers: [
      { role: 'Machine Learning Engineer', match: 92, tags: ['Python', 'ML', 'Statistics'] },
      { role: 'Data Scientist', match: 87, tags: ['Python', 'Analysis', 'ML'] },
      { role: 'AI Engineer', match: 83, tags: ['Python', 'Deep Learning'] },
      { role: 'Data Analyst', match: 78, tags: ['SQL', 'Python', 'Visualization'] },
    ],
    roadmap: [
      { phase: 'Foundations', items: ['Python', 'Pandas', 'NumPy', 'Statistics'], done: true },
      { phase: 'Core ML', items: ['Scikit-learn', 'Supervised Learning', 'Model Evaluation'], done: true },
      { phase: 'Advanced', items: ['Deep Learning', 'NLP', 'MLOps', 'Cloud Deployment'], done: false },
      { phase: 'Industry Ready', items: ['Capstone Project', 'Internship', 'Portfolio'], done: false },
    ],
    achievements: [
      { title: '1st Place — Smart India Hackathon', type: 'Hackathon', date: 'Mar 2026' },
      { title: 'Best Project Award — AI Vision', type: 'Project', date: 'Feb 2026' },
      { title: 'Gold — National Math Olympiad', type: 'Olympiad', date: 'Dec 2025' },
    ],
    skills: [
      { name: 'Python', level: 85 },
      { name: 'Machine Learning', level: 82 },
      { name: 'Statistics', level: 78 },
      { name: 'Projects', level: 90 },
      { name: 'Problem Solving', level: 84 },
    ],
    fee: { total: 50000, paid: 35000, due: '10 Sept 2026' },
  },
  {
    id: 'st2',
    name: 'Ravi Sharma',
    rollNo: '1045',
    className: 'B.Tech CSE',
    section: 'B',
    branch: 'Computer Science',
    avatarColor: 'bg-accent-500',
    initials: 'RS',
    attendance: 79,
    cgpa: 7.4,
    assignments: 68,
    projects: 74,
    participation: 60,
    riskScore: 72,
    riskLevel: 'At Risk',
    attendanceTrend: [
      { label: 'Mar', value: 88 },
      { label: 'Apr', value: 85 },
      { label: 'May', value: 82 },
      { label: 'Jun', value: 80 },
      { label: 'Jul', value: 81 },
      { label: 'Aug', value: 79 },
    ],
    subjects: [
      { subject: 'Mathematics', current: 48, previous: 62, predicted: 56, trend: 'down', status: 'weak' },
      { subject: 'Physics', current: 55, previous: 60, predicted: 58, trend: 'down', status: 'weak' },
      { subject: 'Programming', current: 78, previous: 74, predicted: 82, trend: 'up', status: 'average' },
      { subject: 'English', current: 70, previous: 68, predicted: 73, trend: 'up', status: 'average' },
    ],
    riskFactors: [
      { label: 'Academic Risk', level: 'high' },
      { label: 'Attendance Risk', level: 'medium' },
      { label: 'Assignment Risk', level: 'high' },
    ],
    studyPlan: [
      { day: 'Mon', slots: [
        { time: '6:00–7:15 PM', subject: 'Mathematics', focus: 'Backlog topics', priority: 'high' },
        { time: '7:30–8:00 PM', subject: 'Physics', focus: 'Concepts', priority: 'high' },
      ]},
      { day: 'Tue', slots: [
        { time: '6:00–7:00 PM', subject: 'Mathematics', focus: 'Practice set', priority: 'high' },
      ]},
      { day: 'Wed', slots: [
        { time: '6:00–7:00 PM', subject: 'Physics', focus: 'Numericals', priority: 'high' },
        { time: '7:15–7:45 PM', subject: 'Programming', focus: 'Debugging', priority: 'medium' },
      ]},
      { day: 'Thu', slots: [
        { time: '6:00–7:00 PM', subject: 'Mathematics', focus: 'Revision', priority: 'high' },
      ]},
      { day: 'Fri', slots: [
        { time: '6:00–6:45 PM', subject: 'English', focus: 'Comprehension', priority: 'medium' },
      ]},
    ],
    careers: [
      { role: 'Software Developer', match: 74, tags: ['Programming', 'DSA'] },
      { role: 'Backend Engineer', match: 68, tags: ['Python', 'APIs'] },
      { role: 'QA Engineer', match: 61, tags: ['Testing', 'Automation'] },
    ],
    roadmap: [
      { phase: 'Foundations', items: ['Python', 'DSA Basics', 'DBMS'], done: true },
      { phase: 'Core', items: ['Web Backend', 'APIs', 'Testing'], done: false },
      { phase: 'Advanced', items: ['System Design', 'Cloud', 'DevOps'], done: false },
      { phase: 'Industry Ready', items: ['Projects', 'Internship', 'Interview Prep'], done: false },
    ],
    achievements: [
      { title: 'Participation — CodeQuest 2026', type: 'Hackathon', date: 'Apr 2026' },
      { title: 'Certification — Python Basics', type: 'Certificate', date: 'Jan 2026' },
    ],
    skills: [
      { name: 'Python', level: 70 },
      { name: 'DSA', level: 58 },
      { name: 'DBMS', level: 64 },
      { name: 'Web', level: 60 },
      { name: 'Communication', level: 55 },
    ],
    fee: { total: 50000, paid: 20000, due: '10 Sept 2026' },
  },
];

export const teachers: Teacher[] = [
  { id: 't1', name: 'Anita Rao', subject: 'Mathematics', classes: ['10-A', '10-B', '9-C'], attendance: 98, classesCompleted: 142, homeworkAssigned: 38, marksEntered: 36, pending: 2, status: 'active', initials: 'AR', color: 'bg-brand-500' },
  { id: 't2', name: 'Sunil Verma', subject: 'Physics', classes: ['10-A', '11-B'], attendance: 95, classesCompleted: 128, homeworkAssigned: 31, marksEntered: 28, pending: 3, status: 'active', initials: 'SV', color: 'bg-accent-500' },
  { id: 't3', name: 'Meena Iyer', subject: 'English', classes: ['9-A', '9-B'], attendance: 91, classesCompleted: 119, homeworkAssigned: 27, marksEntered: 25, pending: 2, status: 'active', initials: 'MI', color: 'bg-success-500' },
  { id: 't4', name: 'Rajesh Nair', subject: 'Computer Science', classes: ['12-A', '12-B'], attendance: 89, classesCompleted: 110, homeworkAssigned: 24, marksEntered: 20, pending: 4, status: 'review', initials: 'RN', color: 'bg-warning-500' },
  { id: 't5', name: 'Deepa Menon', subject: 'Chemistry', classes: ['11-A', '11-C'], attendance: 0, classesCompleted: 0, homeworkAssigned: 0, marksEntered: 0, pending: 0, status: 'on-leave', initials: 'DM', color: 'bg-danger-500' },
];

export const complaints: Complaint[] = [
  { id: 'c1', category: 'Academic Issue', subject: 'Syllabus pace too fast in 10-A', raisedBy: 'Parent — Mr. Kumar', date: '26 Aug', status: 'Under Review' },
  { id: 'c2', category: 'Infrastructure', subject: 'Projector not working in Lab 2', raisedBy: 'Teacher — Sunil Verma', date: '25 Aug', status: 'In Progress' },
  { id: 'c3', category: 'Transport', subject: 'Bus 7 late by 20 minutes', raisedBy: 'Parent — Mrs. Iyer', date: '24 Aug', status: 'Resolved' },
  { id: 'c4', category: 'Fees', subject: 'Duplicate payment not reflected', raisedBy: 'Parent — Mr. Nair', date: '22 Aug', status: 'Submitted' },
  { id: 'c5', category: 'Teacher Issue', subject: 'Homework not updated for 9-B', raisedBy: 'Parent — Mrs. Das', date: '20 Aug', status: 'Closed' },
];

export const notifications: Notification[] = [
  { id: 'n1', title: 'Rahul marked absent', body: 'Rahul was absent today in Mathematics.', time: '2h ago', type: 'absence', read: false },
  { id: 'n2', title: 'New homework assigned', body: 'Physics — Thermodynamics worksheet due 30 Aug.', time: '5h ago', type: 'homework', read: false },
  { id: 'n3', title: 'Marks published', body: 'Programming mid-semester results are out.', time: '1d ago', type: 'marks', read: true },
  { id: 'n4', title: 'Fee due reminder', body: '₹15,000 remaining — due 10 Sept.', time: '1d ago', type: 'fee', read: true },
  { id: 'n5', title: 'PTM scheduled', body: 'Parent-Teacher meeting on 5 Sept, 10:00 AM.', time: '2d ago', type: 'ptm', read: true },
  { id: 'n6', title: 'Holiday announced', body: 'School closed on 7 Sept for local festival.', time: '3d ago', type: 'announcement', read: true },
];

export const timetable: TimetableSlot[] = [
  { day: 'Mon', periods: [
    { time: '9:00', subject: 'Mathematics', teacher: 'Anita Rao', room: 'A-101', color: 'bg-brand-500' },
    { time: '10:00', subject: 'Physics', teacher: 'Sunil Verma', room: 'Lab 2', color: 'bg-accent-500' },
    { time: '11:15', subject: 'Programming', teacher: 'Rajesh Nair', room: 'Lab 4', color: 'bg-success-500' },
    { time: '12:15', subject: 'English', teacher: 'Meena Iyer', room: 'A-101', color: 'bg-warning-500' },
  ]},
  { day: 'Tue', periods: [
    { time: '9:00', subject: 'Programming', teacher: 'Rajesh Nair', room: 'Lab 4', color: 'bg-success-500' },
    { time: '10:00', subject: 'Mathematics', teacher: 'Anita Rao', room: 'A-101', color: 'bg-brand-500' },
    { time: '11:15', subject: 'Chemistry', teacher: 'Deepa Menon', room: 'Lab 3', color: 'bg-danger-500' },
    { time: '12:15', subject: 'English', teacher: 'Meena Iyer', room: 'A-101', color: 'bg-warning-500' },
  ]},
  { day: 'Wed', periods: [
    { time: '9:00', subject: 'Physics', teacher: 'Sunil Verma', room: 'Lab 2', color: 'bg-accent-500' },
    { time: '10:00', subject: 'Programming', teacher: 'Rajesh Nair', room: 'Lab 4', color: 'bg-success-500' },
    { time: '11:15', subject: 'Mathematics', teacher: 'Anita Rao', room: 'A-101', color: 'bg-brand-500' },
    { time: '12:15', subject: 'Library', teacher: '—', room: 'Library', color: 'bg-ink-400' },
  ]},
  { day: 'Thu', periods: [
    { time: '9:00', subject: 'English', teacher: 'Meena Iyer', room: 'A-101', color: 'bg-warning-500' },
    { time: '10:00', subject: 'Programming', teacher: 'Rajesh Nair', room: 'Lab 4', color: 'bg-success-500' },
    { time: '11:15', subject: 'Physics', teacher: 'Sunil Verma', room: 'Lab 2', color: 'bg-accent-500' },
    { time: '12:15', subject: 'Mathematics', teacher: 'Anita Rao', room: 'A-101', color: 'bg-brand-500' },
  ]},
  { day: 'Fri', periods: [
    { time: '9:00', subject: 'Mathematics', teacher: 'Anita Rao', room: 'A-101', color: 'bg-brand-500' },
    { time: '10:00', subject: 'Chemistry', teacher: 'Deepa Menon', room: 'Lab 3', color: 'bg-danger-500' },
    { time: '11:15', subject: 'Programming', teacher: 'Rajesh Nair', room: 'Lab 4', color: 'bg-success-500' },
    { time: '12:15', subject: 'Sports', teacher: '—', room: 'Ground', color: 'bg-ink-400' },
  ]},
];

export const homework: HomeworkItem[] = [
  { id: 'h1', subject: 'Mathematics', title: 'Algebra worksheet — Set 4', due: '30 Aug', status: 'pending', color: 'bg-brand-500' },
  { id: 'h2', subject: 'Physics', title: 'Thermodynamics problems', due: '01 Sep', status: 'pending', color: 'bg-accent-500' },
  { id: 'h3', subject: 'Programming', title: 'DSA — Sorting algorithms', due: '28 Aug', status: 'submitted', color: 'bg-success-500' },
  { id: 'h4', subject: 'English', title: 'Essay — Climate Action', due: '25 Aug', status: 'evaluated', color: 'bg-warning-500' },
];

export const initialChat: ChatMessage[] = [
  { id: 'm1', from: 'ai', text: "Hi! I'm EduVision AI. Ask me about Rahul's performance, weak subjects, or what to study today.", time: 'Now' },
];

export const suggestedQuestions = [
  "Why did my child's performance decrease?",
  "What should Rahul study today?",
  "Which subjects need attention?",
  "Suggest a career path for Rahul.",
];
