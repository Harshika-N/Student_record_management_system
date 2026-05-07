import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  MoreVertical,
  X,
  UserPlus,
  Send,
  Phone,
  Hash,
  School,
  GraduationCap
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import { MOCK_STUDENTS, Student } from '../mockData';
import { cn } from '../lib/utils';

export default function StudentManagement() {
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(20);
  const [selectedDepartment, setSelectedDepartment] = useState(''); // For department filter
  const [highlightedStudentId, setHighlightedStudentId] = useState<string | null>(null);
  const location = useLocation();
   
  // Form State
  const [formData, setFormData] = useState<Partial<Student>>({
    name: '',
    usn: '',
    department: '',
    semester: 1,
    cgpa: 0,
    attendance: 0,
    contactNumber: ''
  });

  // Reset page when search or department filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDepartment]);

   const filteredStudents = students.filter(s => 
     (searchTerm === '' || 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.usn.toLowerCase().includes(searchTerm.toLowerCase())) &&
     (selectedDepartment === '' || s.department === selectedDepartment)
   );
   
   // Pagination logic
   const totalPages = Math.max(1, Math.ceil(filteredStudents.length / studentsPerPage));
   const paginatedStudents = filteredStudents.slice(
     (currentPage - 1) * studentsPerPage,
     currentPage * studentsPerPage
   );

   React.useEffect(() => {
     if (currentPage > totalPages) {
       setCurrentPage(totalPages);
     }
   }, [currentPage, totalPages]);

   React.useEffect(() => {
     const params = new URLSearchParams(location.search);
     const studentId = params.get('student');
     if (!studentId) {
       setHighlightedStudentId(null);
       return;
     }

     setHighlightedStudentId(studentId);
     const studentIndex = filteredStudents.findIndex((student) => student.id === studentId);
     if (studentIndex >= 0) {
       const newPage = Math.floor(studentIndex / studentsPerPage) + 1;
       setCurrentPage(newPage);
       window.setTimeout(() => {
         const row = document.getElementById(`student-row-${studentId}`);
         row?.scrollIntoView({ behavior: 'smooth', block: 'center' });
       }, 120);
     }
   }, [location.search, filteredStudents, studentsPerPage]);

   const startIndex = filteredStudents.length === 0 ? 0 : (currentPage - 1) * studentsPerPage + 1;
   const endIndex = Math.min(filteredStudents.length, currentPage * studentsPerPage);

  const handleOpenModal = (student: Student | null = null) => {
    if (student) {
      setEditingStudent(student);
      setFormData(student);
    } else {
      setEditingStudent(null);
      setFormData({
        name: '',
        usn: '',
        department: '',
        semester: 1,
        cgpa: 0,
        attendance: 0,
        contactNumber: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent) {
      setStudents(students.map(s => s.id === editingStudent.id ? { ...s, ...formData } as Student : s));
    } else {
      const newStudent: Student = {
        ...(formData as Omit<Student, 'id'>),
        id: Math.random().toString(36).substr(2, 9)
      };
      setStudents([newStudent, ...students]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <main className="flex-1 p-10 max-w-7xl mx-auto space-y-8 flex flex-col h-screen">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Student Records</h1>
            <p className="text-gray-500 font-medium font-sans">Manage university-wide student database</p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            <Plus size={20} className="mr-2" />
            Add New Student
          </button>
        </header>

         {/* Search & Filter Bar */}
         <div className="flex flex-col md:flex-row gap-4 shrink-0">
           <div className="relative flex-1">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
             <input 
               type="text" 
               placeholder="Search by name, USN..." 
               className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
           <div className="relative flex-1">
             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
               <School size={18} />
             </div>
             <select 
               value={selectedDepartment}
               onChange={(e) => setSelectedDepartment(e.target.value)}
               className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
             >
               <option value="">All Departments</option>
               <option value="Computer Science">Computer Science</option>
               <option value="Information Science">Information Science</option>
               <option value="Electronics">Electronics</option>
               <option value="Mechanical">Mechanical</option>
             </select>
           </div>
           <button className="flex items-center px-6 py-3.5 bg-white border border-gray-200 text-gray-600 rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-sm">
             <Filter size={18} className="mr-2" />
             Apply Filters
           </button>
           <div className="relative flex-1 md:max-w-[220px]">
             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
               <Hash size={18} />
             </div>
             <select
               value={studentsPerPage}
               onChange={(e) => {
                 setStudentsPerPage(Number(e.target.value));
                 setCurrentPage(1);
               }}
               className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
             >
               <option value={10}>10 per page</option>
               <option value={20}>20 per page</option>
               <option value={50}>50 per page</option>
               <option value={100}>100 per page</option>
             </select>
           </div>
         </div>

        {/* Table Container */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col flex-1 min-h-0">
          <div className="overflow-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-gray-50/80 backdrop-blur-md z-10">
                <tr>
                  <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Student Information</th>
                  <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Semester</th>
                  <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">CGPA</th>
                  <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Attendance</th>
                  <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Contact</th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
             <tbody className="divide-y divide-gray-50">
                 {paginatedStudents.map((student) => (
                   <tr
                     id={`student-row-${student.id}`}
                     key={student.id}
                     className={cn(
                       highlightedStudentId === student.id ? 'bg-yellow-50' : 'hover:bg-blue-50/30',
                       'transition-all group'
                     )}
                   >
                     <td className="px-8 py-4">
                       <div className="flex items-center space-x-4">
                         <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center font-bold text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                           {student.name.charAt(0)}
                         </div>
                         <div>
                           <p className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{student.name}</p>
                           <div className="flex items-center text-xs text-gray-500 font-semibold space-x-2">
                             <span className="uppercase tracking-wider">{student.usn}</span>
                             <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                             <span>{student.department}</span>
                           </div>
                         </div>
                       </div>
                     </td>
                     <td className="px-6 py-4 text-center">
                       <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
                         Sem {student.semester}
                       </span>
                     </td>
                     <td className="px-6 py-4 text-center">
                       <span className={cn(
                         "font-mono font-bold px-3 py-1 rounded-lg text-sm",
                         student.cgpa >= 8.5 ? "text-green-600 bg-green-50" : "text-yellow-600 bg-yellow-50"
                       )}>
                         {student.cgpa.toFixed(2)}
                       </span>
                     </td>
                     <td className="px-6 py-4 text-center">
                       <div className="flex flex-col items-center space-y-1">
                         <span className={cn(
                           "text-xs font-bold",
                           student.attendance >= 85 ? "text-green-600" : student.attendance >= 75 ? "text-yellow-600" : "text-red-600"
                         )}>
                           {student.attendance}%
                         </span>
                         <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                           <div 
                             className={cn(
                               "h-full rounded-full transition-all duration-1000",
                               student.attendance >= 85 ? "bg-green-500" : student.attendance >= 75 ? "bg-yellow-500" : "bg-red-500"
                             )} 
                             style={{ width: `${student.attendance}%` }}
                           />
                         </div>
                       </div>
                     </td>
                     <td className="px-6 py-4 text-center font-medium text-gray-500 text-sm">
                       {student.contactNumber}
                     </td>
                     <td className="px-8 py-4 text-right">
                       <div className="flex items-center justify-end space-x-2">
                         <button 
                           onClick={() => handleOpenModal(student)}
                           className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                         >
                           <Edit2 size={18} />
                         </button>
                         <button 
                           onClick={() => handleDelete(student.id)}
                           className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                         >
                           <Trash2 size={18} />
                         </button>
                         <button className="p-2.5 text-gray-400 hover:text-gray-900 rounded-xl transition-all">
                           <MoreVertical size={18} />
                         </button>
                       </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
            </table>
            {filteredStudents.length === 0 && (
              <div className="py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                  <Search size={32} className="text-gray-300" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-gray-900">No results found</h4>
                  <p className="text-gray-500">We couldn't find any student matching "{searchTerm}"</p>
                </div>
              </div>
            )}
          </div>
             <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between shrink-0">
               <div className="flex-1">
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                   Showing {startIndex}-{endIndex} of {filteredStudents.length.toLocaleString()} Students
                 </p>
               </div>
               <div className="flex items-center space-x-2">
                 <button 
                   onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                   disabled={currentPage === 1}
                   className={cn(
                     "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                     currentPage === 1 ? "text-gray-400 bg-gray-100" : "bg-blue-600 text-white hover:bg-blue-700"
                   )}
                 >
                   Previous
                 </button>
                 <span className="px-3 py-1 text-xs font-bold text-gray-600 bg-gray-50 rounded">
                   Page {currentPage} of {totalPages}
                 </span>
                 <button 
                   onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                   disabled={currentPage === totalPages}
                   className={cn(
                     "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                     currentPage === totalPages ? "text-gray-400 bg-gray-100" : "bg-blue-600 text-white hover:bg-blue-700"
                   )}
                 >
                   Next
                 </button>
               </div>
             </div>
        </div>
      </main>

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] p-10 max-w-2xl w-full shadow-2xl space-y-8 overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <UserPlus className="text-blue-600" size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{editingStudent ? 'Edit Student' : 'Add New Student'}</h3>
                    <p className="text-sm font-medium text-gray-500">Enter academic and contact information</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-2xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 col-span-1 md:col-span-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Johnathan Doe" 
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">USN</label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      required
                      type="text" 
                      placeholder="1MS21CSXXX" 
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all outline-none uppercase"
                      value={formData.usn}
                      onChange={(e) => setFormData({ ...formData, usn: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Department</label>
                  <div className="relative">
                    <School className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <select 
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all outline-none appearance-none"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    >
                      <option value="">Select Dept</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Information Science">Information Science</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Mechanical">Mechanical</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Semester</label>
                  <input 
                    required
                    type="number" 
                    min="1" max="8"
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: parseInt(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">CGPA</label>
                  <input 
                    required
                    type="number" 
                    step="0.01" min="0" max="10"
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                    value={formData.cgpa}
                    onChange={(e) => setFormData({ ...formData, cgpa: parseFloat(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Attendance %</label>
                  <input 
                    required
                    type="number" 
                    min="0" max="100"
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                    value={formData.attendance}
                    onChange={(e) => setFormData({ ...formData, attendance: parseInt(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Contact Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      required
                      type="tel" 
                      placeholder="+91 XXXXX XXXXX" 
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                      value={formData.contactNumber}
                      onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4 col-span-1 md:col-span-2">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 bg-gray-50 text-gray-600 font-bold rounded-2xl hover:bg-gray-100 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-2 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center"
                  >
                    <Send size={18} className="mr-2" />
                    {editingStudent ? 'Update Records' : 'Create Record'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
