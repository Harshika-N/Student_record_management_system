import React from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Award, 
  Download, 
  Search,
  LogOut,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PERFORMANCE } from '../mockData';

export default function StudentDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Current CGPA', value: '8.92', icon: Award, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Attendance', value: '92%', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Semester', value: '6th Sem', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Backlogs', value: '0', icon: Clock, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Small Top Bar for Mobile/Tablet */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-30 flex items-center justify-between px-6 md:hidden">
        <h1 className="font-bold text-blue-600">EduTrack</h1>
        <button onClick={() => navigate('/')}><LogOut size={20} className="text-gray-500" /></button>
      </div>

      <main className="flex-1 p-6 md:p-10 pt-24 md:pt-10 max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Student Profile</h1>
            <p className="text-gray-500">Welcome back, Rahul Sharma • 1MS21CS001</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search records..." 
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
              />
            </div>
            <button className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all text-sm shadow-lg shadow-blue-100">
              <Download size={18} className="mr-2" />
              Report
            </button>
            <button 
              onClick={() => navigate('/')}
              className="p-2.5 bg-white border border-gray-200 text-gray-500 rounded-xl hover:bg-gray-50 hover:text-red-600 transition-all"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Profile Card Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-6"
          >
            <div className="relative">
              <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                <User size={64} className="text-blue-600" />
              </div>
              <div className="absolute bottom-1 right-1 w-8 h-8 bg-green-500 border-4 border-white rounded-full"></div>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-gray-900">Rahul Sharma</h3>
              <p className="text-blue-600 font-semibold uppercase tracking-wider text-xs">Computer Science Engineering</p>
              <p className="text-gray-400 text-sm">Batch of 2021-25 • Section A</p>
            </div>
            <div className="w-full pt-4 space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm font-medium text-gray-500">Email</span>
                <span className="text-sm font-semibold text-gray-900">rahul.s@univ.edu</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm font-medium text-gray-500">Contact</span>
                <span className="text-sm font-semibold text-gray-900">+91 98765 43210</span>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-3"
                >
                  <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Performance Table */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                <h3 className="font-bold text-gray-900 flex items-center">
                  <TrendingUp className="mr-2 text-blue-600" size={20} />
                  Academic Performance
                </h3>
                <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-full font-bold text-gray-500 uppercase">Internal Marks</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Subject Name</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Marks / 100</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Performance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {MOCK_PERFORMANCE.map((item) => (
                      <tr key={item.subject} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-semibold text-gray-700">{item.subject}</td>
                        <td className="px-6 py-4 text-right font-mono font-bold text-gray-900">{item.marks}</td>
                        <td className="px-6 py-4 text-center text-xs">
                          <span className={`${item.marks >= 75 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'} px-3 py-1 rounded-full font-bold`}>
                            {item.marks >= 75 ? 'Distinction' : 'Pass'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${item.marks}%` }}
                              transition={{ duration: 1, ease: 'easeOut' }}
                              className={`h-full ${item.marks >= 90 ? 'bg-green-500' : item.marks >= 80 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                            ></motion.div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
