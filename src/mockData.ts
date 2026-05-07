export interface Student {
  id: string;
  name: string;
  usn: string;
  department: string;
  semester: number;
  cgpa: number;
  attendance: number;
  contactNumber: string;
}

const FIRST_NAMES = [
  'Rahul', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Ananya', 'Karthik', 'Sanya', 'Dev', 'Rhea', 'Nikhil', 'Meera', 'Rohan', 'Isha', 'Arjun', 'Pooja', 'Saanvi', 'Rishi', 'Yash', 'Naina'
];
const LAST_NAMES = [
  'Sharma', 'Patel', 'Kumar', 'Reddy', 'Singh', 'Shah', 'Gupta', 'Nair', 'Menon', 'Chaudhary', 'Desai', 'Joshi', 'Prasad', 'Chopra', 'Banerjee'
];
const DEPARTMENTS = ['Computer Science', 'Information Science', 'Electronics', 'Mechanical'];
const DEPT_ABBR: Record<string, string> = {
  'Computer Science': 'CS',
  'Information Science': 'IS',
  Electronics: 'EC',
  Mechanical: 'ME',
};

function createStudent(index: number): Student {
  const first = FIRST_NAMES[index % FIRST_NAMES.length];
  const last = LAST_NAMES[index % LAST_NAMES.length];
  const department = DEPARTMENTS[index % DEPARTMENTS.length];
  const studentNumber = Math.floor(index / DEPARTMENTS.length) + 1;
  const usn = `1MS21${DEPT_ABBR[department]}${String(studentNumber).padStart(3, '0')}`;
  const semester = ((studentNumber - 1) % 8) + 1;
  const cgpa = parseFloat((7 + ((studentNumber * 0.15) % 2.5)).toFixed(2));
  const attendance = 65 + ((studentNumber * 3) % 36);

  return {
    id: String(index + 1),
    name: `${first} ${last}`,
    usn,
    department,
    semester,
    cgpa,
    attendance,
    contactNumber: `+91 98${String(10000000 + index).slice(-8)}`,
  };
}

export const MOCK_STUDENTS: Student[] = Array.from({ length: 1380 }, (_, index) => createStudent(index));

export const MOCK_PERFORMANCE = [
  { subject: 'Data Structures', marks: 85 },
  { subject: 'Algorithms', marks: 92 },
  { subject: 'Database Systems', marks: 78 },
  { subject: 'Operating Systems', marks: 88 },
  { subject: 'Computer Networks', marks: 80 },
];
