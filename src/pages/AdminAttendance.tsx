import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Clock, TrendingUp, ArrowRight, Search, CheckCircle2 } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import { MOCK_STUDENTS } from '../mockData';
import { cn } from '../lib/utils';

const attendanceBuckets = [
  { name: '90%+', value: 0, color: '#22c55e' },
  { name: '80-89%', value: 0, color: '#2563eb' },
  { name: '70-79%', value: 0, color: '#f59e0b' },
  { name: '<70%', value: 0, color: '#ef4444' },
];

export default function AdminAttendance() {
  const data = MOCK_STUDENTS.reduce((acc, student) => {
    if (student.attendance >= 90) acc[0].value += 1;
    else if (student.attendance >= 80) acc[1].value += 1;
    else if (student.attendance >= 70) acc[2].value += 1;
    else acc[3].value += 1;
    return acc;
  }, attendanceBuckets.map((bucket) => ({ ...bucket })));

  const averageAttendance =
    MOCK_STUDENTS.reduce((sum, student) => sum + student.attendance, 0) / MOCK_STUDENTS.length;

  const lowAttendance = MOCK_STUDENTS
    .filter((student) => student.attendance < 75)
    .sort((a, b) => a.attendance - b.attendance)
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 p-10 max-w-7xl mx-auto space-y-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Attendance Control</h1>
            <p className="text-gray-500">Monitor attendance distribution across the full student body.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-3xl bg-white p-4 shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400">Avg Attendance</p>
                <p className="text-2xl font-bold text-gray-900">{averageAttendance.toFixed(1)}%</p>
              </div>
            </div>
            <div className="rounded-3xl bg-white p-4 shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users size={24} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400">Students</p>
                <p className="text-2xl font-bold text-gray-900">{MOCK_STUDENTS.length.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {data.map((bucket) => (
            <div key={bucket.name} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase font-bold tracking-widest text-gray-400">{bucket.name}</p>
                  <p className="text-3xl font-bold text-gray-900">{bucket.value}</p>
                </div>
                <div className="w-11 h-11 rounded-2xl" style={{ backgroundColor: bucket.color }} />
              </div>
              <p className="mt-4 text-sm text-gray-500">Students with this attendance range.</p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm font-bold text-gray-900">Attendance Distribution</p>
                <p className="text-sm text-gray-500">View how attendance segments compare across departments.</p>
              </div>
              <span className="text-xs uppercase font-bold tracking-widest text-gray-400">Weekly Report</span>
            </div>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 20, left: -10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2563eb" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-900">At-risk Students</p>
                <p className="text-sm text-gray-500">Lowest attendance records needing follow-up.</p>
              </div>
              <ArrowRight size={18} className="text-blue-600" />
            </div>
            <div className="space-y-4">
              {lowAttendance.map((student) => (
                <div key={student.id} className="rounded-3xl border border-gray-100 p-4 bg-gray-50">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-bold text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.department} • {student.usn}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                      {student.attendance}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
