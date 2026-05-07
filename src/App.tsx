import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StudentLogin from './pages/StudentLogin';
import AdminLogin from './pages/AdminLogin';
import ForgotPassword from './pages/ForgotPassword';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboardOverview from './pages/AdminDashboardOverview';
import StudentManagement from './pages/StudentManagement';
import DSAVisualizations from './pages/DSAVisualizations';
import AdminAttendance from './pages/AdminAttendance';
import AdminReports from './pages/AdminReports';
import AdminSettings from './pages/AdminSettings';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth Paths */}
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Student View */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />

        {/* Admin Views */}
        <Route path="/admin/dashboard" element={<AdminDashboardOverview />} />
        <Route path="/admin/records" element={<StudentManagement />} />
        <Route path="/admin/attendance" element={<AdminAttendance />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/visualizations" element={<DSAVisualizations />} />
        <Route path="/admin/settings" element={<AdminSettings />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
