import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Award, ChartPie, TrendingUp, BookOpen } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import { MOCK_STUDENTS } from '../mockData';

const COLORS = ['#2563eb', '#22c55e', '#f59e0b', '#ec4899'];

export default function AdminReports() {
  const topPerformers = [...MOCK_STUDENTS]
    .sort((a, b) => b.cgpa - a.cgpa)
    .slice(0, 5);

  const departmentData = Object.entries(
    MOCK_STUDENTS.reduce<Record<string, number>>((acc, student) => {
      acc[student.department] = (acc[student.department] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value], index) => ({ name, value, color: COLORS[index % COLORS.length] }));

  const semesterPerformance = Object.entries(
    MOCK_STUDENTS.reduce<Record<string, { total: number; count: number }>>((acc, student) => {
      const key = `Sem ${student.semester}`;
      acc[key] = acc[key] || { total: 0, count: 0 };
      acc[key].total += student.cgpa;
      acc[key].count += 1;
      return acc;
    }, {})
  ).map(([semester, data]) => ({ semester, avgCGPA: parseFloat((data.total / data.count).toFixed(2)) }));

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 p-10 max-w-7xl mx-auto space-y-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Performance Reports</h1>
            <p className="text-gray-500">Generate insights about student performance, departments, and semester ranking.</p>
          </div>
          <div className="rounded-3xl bg-white p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400">Top CGPA</p>
              <p className="text-2xl font-bold text-gray-900">{topPerformers[0]?.cgpa.toFixed(2)}</p>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm font-bold text-gray-900">Average Semester CGPA</p>
                <p className="text-sm text-gray-500">Calculated from all enrolled students.</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{(
                  MOCK_STUDENTS.reduce((sum, student) => sum + student.cgpa, 0) / MOCK_STUDENTS.length
                ).toFixed(2)}</p>
              </div>
            </div>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={semesterPerformance} margin={{ top: 10, right: 10, left: -16, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="semester" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="avgCGPA" fill="#22c55e" radius={[10, 10, 0, 0]} barSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm font-bold text-gray-900">Department Distribution</p>
                <p className="text-sm text-gray-500">Active enrollment across departments.</p>
              </div>
              <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-gray-500">Total {MOCK_STUDENTS.length.toLocaleString()}</div>
            </div>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={departmentData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={4}>
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${entry.name}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm font-bold text-gray-900 flex items-center gap-2"><Award size={18} /> Top Performers</p>
              <p className="text-sm text-gray-500">Top 5 students by CGPA.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topPerformers.map((student, index) => (
              <div key={student.id} className="rounded-3xl border border-gray-100 p-5 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{student.name}</p>
                    <p className="text-xs uppercase tracking-widest text-gray-400">{student.department}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{student.cgpa.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">Sem {student.semester}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
