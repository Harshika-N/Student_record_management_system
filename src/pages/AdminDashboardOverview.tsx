import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  GraduationCap, 
  CheckCircle2, 
  TrendingUp, 
  Search,
  School,
  ArrowUpRight,
  UserCheck,
  Clock
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import AdminSidebar from '../components/AdminSidebar';
import { MOCK_STUDENTS } from '../mockData';
import { cn } from '../lib/utils';

const DEPT_STATS = Object.entries(
  MOCK_STUDENTS.reduce<Record<string, number>>((acc, student) => {
    acc[student.department] = (acc[student.department] || 0) + 1;
    return acc;
  }, {})
).map(([name, value], index) => ({
  name,
  value,
  color: ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'][index % 4],
}));

const ATTENDANCE_TREND = [
  { day: 'Mon', rate: 92 },
  { day: 'Tue', rate: 88 },
  { day: 'Wed', rate: 95 },
  { day: 'Thu', rate: 90 },
  { day: 'Fri', rate: 85 },
];

export default function AdminDashboardOverview() {
  const navigate = useNavigate();
  const totalStudents = MOCK_STUDENTS.length;
  const averageCgpa = parseFloat(
    (MOCK_STUDENTS.reduce((sum, student) => sum + student.cgpa, 0) / totalStudents).toFixed(2)
  );
  const participationRate = parseFloat(
    (MOCK_STUDENTS.filter((student) => student.attendance >= 75).length / totalStudents * 100).toFixed(1)
  );
  const topPerformers = [...MOCK_STUDENTS].sort((a, b) => b.cgpa - a.cgpa).slice(0, 3);

  const stats = [
    { label: 'Total Students', value: totalStudents.toLocaleString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', change: '+12%' },
    { label: 'Avg CGPA', value: averageCgpa.toFixed(2), icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50', change: '+0.2' },
    { label: 'Participation', value: `${participationRate}%`, icon: UserCheck, color: 'text-purple-600', bg: 'bg-purple-50', change: '+5%' },
    { label: 'Pending Docs', value: '18', icon: Clock, color: 'text-red-600', bg: 'bg-red-50', change: '-2' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <main className="flex-1 p-10 max-w-7xl mx-auto space-y-8 overflow-y-auto">
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-500 font-medium">Monday, 20 May 2024 • Academic Year 2024-25</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Global search..." 
                className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none w-64 text-sm transition-all"
              />
            </div>
            <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-500">
              <span className="text-xs font-bold leading-none">JD</span>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-start justify-between"
            >
              <div className="space-y-3">
                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <div className={cn(
                "flex items-center text-xs font-bold px-2 py-1 rounded-full",
                stat.change.startsWith('+') ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
              )}>
                {stat.change}
                <ArrowUpRight size={14} className="ml-0.5" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Attendance Summary (Weekly)</h3>
              <select className="border-none bg-gray-50 text-sm font-semibold rounded-lg px-3 py-1 outline-none text-gray-600">
                <option>May 2024</option>
                <option>April 2024</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ATTENDANCE_TREND}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="rate" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-6">Department Split</h3>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={DEPT_STATS}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {DEPT_STATS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-auto space-y-3">
              {DEPT_STATS.map((dept) => (
                <div key={dept.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: dept.color }}></div>
                    <span className="text-sm font-semibold text-gray-600">{dept.name}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{dept.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Activity & Top Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
          <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50">
              <h3 className="font-bold text-gray-900">Recent Student Activity</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {[
                { name: 'Ananya Rao', action: 'Uploaded Fees Receipt', time: '2 mins ago', type: 'upload' },
                { name: 'Kushal Dev', action: 'Updated Contact Details', time: '15 mins ago', type: 'edit' },
                { name: 'Samarth K', action: 'Applied for Leave', time: '1 hour ago', type: 'request' },
              ].map((activity, i) => (
                <div key={i} className="p-4 flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500">
                    <UserCheck size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">{activity.name} <span className="font-normal text-gray-500">{activity.action}</span></p>
                    <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                  </div>
                  <button className="text-xs font-bold text-blue-600 hover:underline">View</button>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Top Performers</h3>
              <ArrowUpRight className="text-green-600" size={20} />
            </div>
            <div className="divide-y divide-gray-50">
              {topPerformers.map((student, i) => (
                <div key={student.usn} className="p-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{student.name}</p>
                      <p className="text-xs text-gray-500">{student.department} • Sem {student.semester}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 justify-between w-full md:w-auto">
                    <div className="text-right">
                      <p className="text-sm font-bold text-green-600">{student.cgpa} CGPA</p>
                    </div>
                    <button
                      onClick={() => navigate('/admin/records')}
                      className="rounded-2xl px-4 py-2 text-xs font-bold uppercase tracking-widest bg-blue-600 text-white hover:bg-blue-700 transition-all"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
