import React from 'react';
import { Settings, ShieldCheck, Bell, UserCog } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

export default function AdminSettings() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 p-10 max-w-7xl mx-auto space-y-8 overflow-y-auto">
        <header className="space-y-1">
          <div className="flex items-center gap-3 text-blue-600">
            <Settings size={20} />
            <p className="text-sm uppercase font-bold tracking-widest">Admin Settings</p>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">System Configuration</h1>
          <p className="text-gray-500">Adjust admin preferences, access control, and notification settings.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: UserCog, title: 'User Access', description: 'Manage admin and faculty roles from a central panel.' },
            { icon: ShieldCheck, title: 'Security Policy', description: 'Configure password, session, and data access rules.' },
            { icon: Bell, title: 'Notifications', description: 'Set up attendance alerts, report reminders, and announcements.' },
            { icon: Settings, title: 'Appearance', description: 'Customize theme, dashboard layout, and UI preferences.' },
          ].map((card) => (
            <div key={card.title} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <card.icon size={24} />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">{card.title}</p>
                <p className="text-sm text-gray-500">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
