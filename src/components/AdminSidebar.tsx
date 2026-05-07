import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  BarChart3, 
  Database, 
  Settings, 
  LogOut,
  School
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/records', icon: Users, label: 'Student Records' },
  { path: '/admin/attendance', icon: CheckSquare, label: 'Attendance' },
  { path: '/admin/reports', icon: BarChart3, label: 'Reports' },
  { path: '/admin/visualizations', icon: Database, label: 'DSA Visualizations' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminSidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-72 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
      <div className="p-8 flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
          <School className="text-white" size={24} />
        </div>
        <div>
          <h1 className="font-bold text-xl tracking-tight">EduTrack</h1>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Admin Console</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all group",
              isActive 
                ? "bg-blue-50 text-blue-600 shadow-sm" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <item.icon size={20} className={cn(
              "mr-3 transition-colors",
              "group-hover:text-blue-600"
            )} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-gray-100">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center w-full px-4 py-3 text-sm font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all"
        >
          <LogOut size={20} className="mr-3" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
