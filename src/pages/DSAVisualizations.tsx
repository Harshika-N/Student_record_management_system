import React from 'react';
import { motion } from 'framer-motion';
import { 
   Database, 
   Layers, 
   Search, 
   GitBranch, 
   ArrowRight,
   Code2,
   Info
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

const DSACards = [
  {
    title: 'Arrays (Fixed-size storage)',
    description: 'Used for storing individual student marks and attendance records for a fixed semester duration.',
    icon: Layers,
    color: 'bg-blue-50 text-blue-600',
    details: 'Complexity: O(1) for access, O(n) for insertion'
  },
  {
    title: 'Linked Lists (Dynamic records)',
    description: 'Perfect for adding or removing students from a department registry without reallocating large memory blocks.',
    icon: GitBranch,
    color: 'bg-green-50 text-green-600',
    details: 'Complexity: O(1) for insertion, O(n) for search'
  },
  {
    title: 'String Search (USN Lookup)',
    description: 'Boyer-Moore or KMP algorithms are used for fast substring matching when searching for a specific USN or Name.',
    icon: Search,
    color: 'bg-orange-50 text-orange-600',
    details: 'Efficiency: Significantly faster than linear search'
  }
];

export default function DSAVisualizations() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <main className="flex-1 p-10 max-w-7xl mx-auto space-y-12 overflow-y-auto">
        <header className="space-y-2">
          <div className="flex items-center space-x-2 text-blue-600">
            <Database size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">Educational Hub</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">DSA In EduTrack</h1>
          <p className="text-gray-500 max-w-2xl font-medium">
            Learn how fundamental Data Structures and Algorithms power our Student Records Management System behind the scenes.
          </p>
        </header>

        {/* Primary Data Structures */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DSACards.map((dsa, i) => (
            <motion.div
              key={dsa.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all group"
            >
              <div className={`w-14 h-14 ${dsa.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                <dsa.icon size={28} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900">{dsa.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{dsa.description}</p>
              </div>
              <div className="pt-4 border-t border-gray-50">
                <code className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded">
                  {dsa.details}
                </code>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Traversal Visualizations */}
        <section className="space-y-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white">
              <Code2 size={16} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Graph Traversals (BFS & DFS)</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* BFS Diagram */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-900 p-10 rounded-[3rem] text-white space-y-8"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold text-blue-400">BFS Traversal</h4>
                <div className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-blue-500/20">
                  Level Order
                </div>
              </div>
              <p className="text-gray-400 text-sm">Used for finding the shortest path between prerequisite subjects or department hierarchies.</p>
              
              <div className="relative h-48 flex items-center justify-center">
                {/* Simplified Tree Visualization */}
                <div className="flex flex-col items-center space-y-8">
                  <div className="w-12 h-12 rounded-full border-2 border-blue-500 flex items-center justify-center font-bold relative z-10 bg-gray-900">1</div>
                  <div className="flex space-x-12 relative">
                    <div className="absolute -top-8 left-1/2 w-px h-8 bg-blue-500/30"></div>
                    <div className="w-12 h-12 rounded-full border-2 border-blue-500/50 flex items-center justify-center font-bold text-blue-300">2</div>
                    <div className="w-12 h-12 rounded-full border-2 border-blue-500/50 flex items-center justify-center font-bold text-blue-300">3</div>
                    <div className="w-12 h-12 rounded-full border-2 border-blue-500/50 flex items-center justify-center font-bold text-blue-300">4</div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <div className="w-full h-[1px] bg-blue-500"></div>
                </div>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-2xl flex items-center space-x-3 border border-gray-800">
                <Info size={16} className="text-blue-400" />
                <p className="text-xs text-gray-400 italic">Queue data structure is essential for BFS implementation.</p>
              </div>
            </motion.div>

            {/* DFS Diagram */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold text-purple-600">DFS Traversal</h4>
                <div className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Depth First
                </div>
              </div>
              <p className="text-gray-500 text-sm">Utilized for generating complex reports and analyzing student progress through multiple semesters.</p>
              
              <div className="relative h-48 flex items-center justify-center">
                {/* Simplified Branching Visualization */}
                <div className="flex space-x-8">
                  <div className="flex flex-col space-y-4 items-center">
                    <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">1</div>
                    <ArrowRight className="rotate-90 text-purple-200" />
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">2</div>
                    <ArrowRight className="rotate-90 text-purple-200" />
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">3</div>
                  </div>
                  <div className="flex flex-col space-y-4 items-center opacity-40">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-bold">4</div>
                    <ArrowRight className="rotate-90 text-gray-200" />
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-bold">5</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl flex items-center space-x-3 border border-gray-100">
                <Info size={16} className="text-purple-600" />
                <p className="text-xs text-gray-400 italic">Stack (or Recursion) is used to explore branches deeply.</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-blue-600 p-12 rounded-[3.5rem] relative overflow-hidden shadow-2xl shadow-blue-100">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <Code2 size={200} className="text-white" />
          </div>
          <div className="relative z-10 max-w-xl space-y-6">
            <h2 className="text-3xl font-black text-white leading-tight">Beyond The Basics</h2>
            <p className="text-blue-100 font-medium">
              We also use Hashing for instantaneous record lookups and Sorting algorithms (QuickSort) to rank top performers by CGPA.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-2xl font-bold hover:bg-blue-50 transition-all text-sm">
                Explore API Docs
              </button>
              <button className="bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold border border-blue-400 hover:bg-blue-400 transition-all text-sm">
                Algorithm Visualizer
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
