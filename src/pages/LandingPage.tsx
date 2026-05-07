import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { GraduationCap, ShieldCheck, ArrowRight, School } from 'lucide-react';
import { cn } from '../lib/utils';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full text-center space-y-8"
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-200">
            <School className="text-white w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            EduTrack <span className="text-blue-600">Portal</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-lg">
            Welcome to the University Student Records Management System. Please select your role to continue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Student Card */}
          <motion.button
            whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
            onClick={() => navigate('/login/student')}
            className="group relative bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-left transition-all overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 text-blue-100 group-hover:text-blue-200 transition-colors transform group-hover:scale-110">
              <GraduationCap size={120} />
            </div>
            
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <GraduationCap size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Student Login</h3>
                <p className="text-gray-500 mt-1">Access your records, attendance, and performance.</p>
              </div>
              <div className="flex items-center text-blue-600 font-medium pt-4">
                Enter Portal <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.button>

          {/* Admin Card */}
          <motion.button
            whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
            onClick={() => navigate('/login/admin')}
            className="group relative bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-left transition-all overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 text-gray-100 group-hover:text-blue-50 transition-colors transform group-hover:scale-110">
              <ShieldCheck size={120} />
            </div>
            
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 bg-gray-50 group-hover:bg-blue-50 rounded-xl flex items-center justify-center text-gray-600 group-hover:text-blue-600 transition-colors">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Faculty / Admin</h3>
                <p className="text-gray-500 mt-1">Manage student records, attendance, and system settings.</p>
              </div>
              <div className="flex items-center text-gray-600 group-hover:text-blue-600 font-medium pt-4 transition-colors">
                Admin Console <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.button>
        </div>

        <p className="text-sm text-gray-400 pt-8">
          © 2024 University Academic Portal • Empowering Education
        </p>
      </motion.div>
    </div>
  );
}
