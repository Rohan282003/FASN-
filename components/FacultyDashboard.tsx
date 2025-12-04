
import React, { useState } from 'react';
import { User, Course, StudentSummary, Unit } from '../types';
import { CyberIcon, CyberCard, CyberButton } from './CyberComponents';
import { MOCK_COURSES, FACULTY_STATS, FACULTY_NOTIFICATIONS, MOCK_CLASS_ROSTER } from '../constants';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from 'recharts';

interface FacultyDashboardProps {
  user: User;
  onLogout: () => void;
}

// Mock data for charts
const MOCK_SKILLS_DATA = [
  { subject: 'Quant', A: 120, fullMark: 150 },
  { subject: 'Verbal', A: 98, fullMark: 150 },
  { subject: 'Logic', A: 86, fullMark: 150 },
  { subject: 'Theory', A: 99, fullMark: 150 },
  { subject: 'Case', A: 85, fullMark: 150 },
  { subject: 'Pres', A: 65, fullMark: 150 },
];

const MOCK_STUDY_DIST_DATA = [
  { name: 'Video', value: 400 },
  { name: 'Reading', value: 300 },
  { name: 'Quiz', value: 300 },
  { name: 'AI Tutor', value: 200 },
];

const MOCK_ATTENDANCE_HISTORY = [
    { day: 'Mon', hours: 4.2 },
    { day: 'Tue', hours: 3.5 },
    { day: 'Wed', hours: 5.1 },
    { day: 'Thu', hours: 2.8 },
    { day: 'Fri', hours: 6.0 },
    { day: 'Sat', hours: 1.5 },
    { day: 'Sun', hours: 0.5 },
];

const MOCK_ADMIN_LOGS = [
  { id: 1, action: "User 's3' password reset", time: "10:00 AM", admin: "System" },
  { id: 2, action: "Course 'MBA-SCM' backup complete", time: "09:45 AM", admin: "Auto-Bot" },
  { id: 3, action: "New Faculty 'Dr. Strange' added", time: "Yesterday", admin: "Admin_Root" },
  { id: 4, action: "Security Patch v4.2 deployed", time: "2 days ago", admin: "DevOps" },
];

const COLORS = ['#06b6d4', '#d946ef', '#9333ea', '#eab308'];

export const FacultyDashboard: React.FC<FacultyDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'STUDENT' | 'COURSE' | 'ADMIN' | 'NOTIFICATION'>('COURSE');
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  // COURSE TAB STATE
  const [localCourses, setLocalCourses] = useState<Course[]>(MOCK_COURSES);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  // MODAL STATES
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseId, setNewCourseId] = useState('');
  
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [generateAIQuiz, setGenerateAIQuiz] = useState(false); // AI Quiz State

  const [showGradebookModal, setShowGradebookModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showRiskModal, setShowRiskModal] = useState(false);

  // STUDENT TAB STATE
  const [studentViewLevel, setStudentViewLevel] = useState<'COURSE_SELECT' | 'ROSTER' | 'DETAIL'>('COURSE_SELECT');
  const [studentSelectedCourse, setStudentSelectedCourse] = useState<Course | null>(null);
  const [viewingStudent, setViewingStudent] = useState<StudentSummary | null>(null);

  const highRiskStudents = MOCK_CLASS_ROSTER.filter(s => s.riskLevel === 'High');

  // --- HANDLERS ---
  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
  };
  const handleBackToCourses = () => {
    setSelectedCourse(null);
  };
  
  const handleCreateCourse = () => {
    if(!newCourseName || !newCourseId) return;
    
    const newCourse: Course = {
        id: `c-new-${Date.now()}`,
        code: newCourseId,
        title: newCourseName,
        instructor: user.name,
        progress: 0,
        thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
        tags: ['New', 'Pending'],
        description: 'New course stream initialized. Awaiting content upload.',
        units: []
    };
    setLocalCourses([...localCourses, newCourse]);
    setShowAddCourseModal(false);
    setNewCourseName('');
    setNewCourseId('');
  };

  const handleUploadContent = (type: string) => {
    if (!selectedCourse) return;
    
    // Simulate adding a unit based on upload
    const newContentUnit: Unit = {
        id: `u-${Date.now()}`,
        title: `New ${type} Module`,
        description: `Uploaded ${type} content via Faculty CMS.`,
        videoUrl: '',
        notes: 'Content processing...',
        completed: false
    };

    let newUnits = [newContentUnit];

    // AI Quiz Generation Logic
    if (generateAIQuiz) {
        const newQuizUnit: Unit = {
            id: `u-quiz-${Date.now()}`,
            title: `AI Assessment: ${type}`,
            description: `Auto-generated quiz based on uploaded ${type} material.`,
            videoUrl: '',
            notes: 'Assessment Mode Enabled. 10 Questions generated based on content analysis.',
            completed: false
        };
        newUnits.push(newQuizUnit);
    }
    
    // Update local state for the selected course
    const updatedCourse = { ...selectedCourse, units: [...selectedCourse.units, ...newUnits] };
    setSelectedCourse(updatedCourse);
    
    // Update the list
    setLocalCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
    
    setShowUploadModal(false);
    setGenerateAIQuiz(false); // Reset
    alert(`${type.toUpperCase()} Uploaded Successfully.${generateAIQuiz ? ' AI Assessment Generated.' : ''}`);
  };

  // --- STUDENT TAB HANDLERS ---
  const handleSelectStudentCourse = (course: Course) => {
    setStudentSelectedCourse(course);
    setStudentViewLevel('ROSTER');
  };
  const handleBackToStudentCourses = () => {
    setStudentSelectedCourse(null);
    setStudentViewLevel('COURSE_SELECT');
  };
  const handleSelectStudent = (student: StudentSummary) => {
    setViewingStudent(student);
    setStudentViewLevel('DETAIL');
  };
  const handleBackToRoster = () => {
    setViewingStudent(null);
    setStudentViewLevel('ROSTER');
  };


  return (
    <div className="w-full h-full relative p-6 pt-24 overflow-hidden flex flex-col">
      
      {/* === HIGH RISK ALERT TICKER === */}
      <div className="absolute top-0 left-0 w-full bg-red-900/40 border-b border-red-500/50 backdrop-blur-md z-40 overflow-hidden whitespace-nowrap py-1">
         <div className="inline-block animate-marquee pl-full">
            <span className="text-red-400 font-mono text-xs font-bold flex items-center">
               <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></span>
               CRITICAL ALERT: {highRiskStudents.length} STUDENTS IDENTIFIED AS HIGH RISK // INTERVENTION REQUIRED // 
               {highRiskStudents.map(s => ` [${s.name} - GPA: ${s.gpa}] `)}
            </span>
         </div>
      </div>

      {/* === TOP CENTER: FACULTY STATS === */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 flex space-x-4 mt-2">
         <div className="bg-black/60 border border-cyber-cyan backdrop-blur-md px-6 py-2 rounded shadow-[0_0_15px_rgba(6,182,212,0.3)] text-center min-w-[150px]">
            <div className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-widest mb-1">Class Performance</div>
            <div className="text-2xl font-display font-bold text-cyber-cyan">{FACULTY_STATS.classPerformance}%</div>
         </div>
         <div 
           onClick={() => setShowAttendanceModal(true)}
           className="bg-black/60 border border-cyber-purple backdrop-blur-md px-6 py-2 rounded shadow-[0_0_15px_rgba(147,51,234,0.3)] text-center min-w-[150px] cursor-pointer hover:bg-cyber-purple/10 transition-colors"
         >
            <div className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-widest mb-1">Total Attendance</div>
            <div className="text-2xl font-display font-bold text-cyber-purple">{FACULTY_STATS.totalAttendance}%</div>
            <div className="text-[8px] text-gray-400 uppercase tracking-widest">Click for Breakdown</div>
         </div>
         {/* Risk Alert Card */}
         <div 
            onClick={() => setShowRiskModal(true)}
            className="bg-red-900/40 border border-red-500 backdrop-blur-md px-6 py-2 rounded shadow-[0_0_15px_rgba(239,68,68,0.3)] text-center min-w-[150px] cursor-pointer hover:bg-red-900/60 transition-colors animate-pulse"
         >
            <div className="text-[10px] text-red-300 font-mono font-bold uppercase tracking-widest mb-1">Risk Alerts</div>
            <div className="text-2xl font-display font-bold text-red-500">{highRiskStudents.length}</div>
            <div className="text-[8px] text-red-400 uppercase tracking-widest">Action Required</div>
         </div>
      </div>

      {/* === TOP RIGHT: LOGOUT === */}
      <div className="absolute top-8 right-6 z-30 mt-2">
        <button 
            onClick={onLogout}
            className="flex items-center px-4 py-2 bg-red-900/20 border border-red-800 text-red-500 hover:bg-red-900/40 rounded transition-all font-mono text-xs font-bold tracking-widest"
        >
            <CyberIcon name="power" className="w-4 h-4 mr-2" />
            SECURE LOGOUT
        </button>
      </div>

      <div className="flex h-full gap-6">
        
        {/* === LEFT SIDEBAR NAVIGATION === */}
        <div className="w-64 flex-shrink-0 flex flex-col z-20 space-y-4 pt-4">
            {/* User Profile Mini */}
            <div 
                className="bg-black/60 border border-gray-700 p-4 rounded flex items-center space-x-3 mb-4 backdrop-blur-sm cursor-pointer hover:border-cyber-yellow transition-colors"
                onClick={() => setShowProfileModal(true)}
            >
                <img src={user.avatar} className="w-12 h-12 rounded border border-cyber-yellow object-cover" alt="Prof" />
                <div>
                    <div className="text-sm font-bold text-white font-display">PROF. DURBA</div>
                    <div className="text-[10px] text-cyber-yellow font-mono">FACULTY ADMIN</div>
                </div>
            </div>

            {/* Nav Items */}
            <div className="space-y-2">
                {['STUDENT', 'COURSE', 'ADMIN', 'NOTIFICATION'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => { setActiveTab(tab as any); }}
                        className={`w-full text-left px-4 py-3 rounded border font-mono text-xs font-bold tracking-widest transition-all flex items-center
                        ${activeTab === tab 
                            ? 'bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan shadow-neon-cyan' 
                            : 'bg-black/40 border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300'}`}
                    >
                        <span className={`w-2 h-2 rounded-full mr-3 ${activeTab === tab ? 'bg-cyber-cyan animate-pulse' : 'bg-gray-700'}`}></span>
                        {tab} MANAGEMENT
                    </button>
                ))}
            </div>

            {/* Notification Panel (Mini) */}
            <div className="flex-1 bg-black/40 border border-gray-800 rounded p-4 overflow-y-auto mt-4 backdrop-blur-sm custom-scrollbar">
                <div className="text-[10px] text-gray-500 font-bold uppercase border-b border-gray-700 pb-2 mb-2">System Logs</div>
                <div className="space-y-3">
                    {FACULTY_NOTIFICATIONS.map(notif => (
                        <div key={notif.id} className="text-xs border-l-2 border-gray-600 pl-2 py-1">
                            <div className={`font-bold ${notif.type === 'alert' ? 'text-red-400' : notif.type === 'system' ? 'text-cyber-purple' : 'text-cyber-cyan'}`}>
                                {notif.type.toUpperCase()}
                            </div>
                            <div className="text-gray-300 mb-1 leading-tight">{notif.text}</div>
                            <div className="text-[9px] text-gray-600 font-mono">{notif.time}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* === CENTER MAIN CONTENT === */}
        <div className="flex-1 z-20 overflow-hidden flex flex-col relative pt-4">
            
            {/* ---------------------------------------------------------------------------------- */}
            {/* COURSE MANAGEMENT TAB */}
            {/* ---------------------------------------------------------------------------------- */}
            {activeTab === 'COURSE' && (
                <>
                    {!selectedCourse && (
                        <div className="h-full overflow-y-auto custom-scrollbar">
                            <h2 className="text-2xl font-display font-bold text-white mb-6 border-b border-gray-700 pb-2">
                                ACTIVE COURSE STREAMS
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* ADD COURSE BUTTON */}
                                <div 
                                    onClick={() => setShowAddCourseModal(true)}
                                    className="group bg-black/40 border-2 border-dashed border-gray-700 hover:border-cyber-cyan hover:bg-cyber-cyan/5 rounded-lg p-0 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center h-[250px]"
                                >
                                    <div className="w-16 h-16 rounded-full border border-gray-600 group-hover:border-cyber-cyan flex items-center justify-center mb-4 transition-all group-hover:scale-110 shadow-neon-cyan">
                                        <span className="text-4xl text-gray-500 group-hover:text-cyber-cyan font-light">+</span>
                                    </div>
                                    <div className="text-sm font-bold text-gray-400 group-hover:text-cyber-cyan font-display tracking-widest uppercase">INITIALIZE NEW STREAM</div>
                                </div>

                                {localCourses.map(course => (
                                    <div 
                                        key={course.id}
                                        onClick={() => handleCourseClick(course)}
                                        className="group bg-black/60 border border-gray-700 hover:border-cyber-yellow hover:shadow-[0_0_20px_rgba(234,179,8,0.2)] rounded-lg p-0 overflow-hidden cursor-pointer transition-all duration-300 h-[250px] flex flex-col"
                                    >
                                        <div className="h-40 relative flex-shrink-0">
                                            <img src={course.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt={course.title} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                                            <div className="absolute bottom-4 left-4">
                                                <div className="text-cyber-yellow font-mono text-xs font-bold mb-1">{course.code}</div>
                                                <div className="text-xl font-display font-bold text-white">{course.title}</div>
                                            </div>
                                        </div>
                                        <div className="p-4 flex justify-between items-center bg-gray-900/50 flex-1">
                                            <div className="text-xs text-gray-400 font-mono">
                                                {course.units.length} UNITS UPLOADED
                                            </div>
                                            <span className="text-cyber-yellow text-xs font-bold flex items-center">
                                                MANAGE CONTENT <CyberIcon name="arrow-left" className="w-4 h-4 ml-2 rotate-180" />
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {selectedCourse && (
                        <div className="h-full flex flex-col animate-fade-in">
                             <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-4">
                                <div className="flex items-center">
                                    <button onClick={handleBackToCourses} className="mr-4 text-gray-500 hover:text-white transition-colors">
                                        <CyberIcon name="arrow-left" className="w-6 h-6" />
                                    </button>
                                    <div>
                                        <h2 className="text-2xl font-display font-bold text-white uppercase">{selectedCourse.title}</h2>
                                        <div className="text-xs text-cyber-yellow font-mono">CONTENT MANAGEMENT SYSTEM // V.2.1</div>
                                    </div>
                                </div>
                                <div className="flex space-x-3">
                                     <CyberButton onClick={() => setShowGradebookModal(true)} variant="secondary" className="text-xs py-2">
                                         <CyberIcon name="list" className="w-4 h-4 mr-2" />
                                         View Gradebook
                                     </CyberButton>
                                     <CyberButton onClick={() => setShowUploadModal(true)} className="text-xs py-2 bg-cyber-yellow text-black hover:bg-white border-none">
                                        <CyberIcon name="upload" className="w-4 h-4 mr-2" />
                                        UPLOAD MATERIAL
                                     </CyberButton>
                                </div>
                             </div>

                             <div className="flex-1 overflow-y-auto custom-scrollbar">
                                 {selectedCourse.units.length === 0 ? (
                                     <div className="h-64 flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-800 rounded-lg">
                                         <CyberIcon name="file" className="w-12 h-12 mb-2 opacity-20" />
                                         <p>NO CONTENT MODULES FOUND</p>
                                         <p className="text-xs mt-2">Upload materials to begin this stream.</p>
                                     </div>
                                 ) : (
                                     <div className="space-y-4 max-w-4xl mx-auto">
                                         {selectedCourse.units.map((unit, idx) => (
                                             <CyberCard key={unit.id} className="mb-4 hover:border-gray-500 transition-colors">
                                                 <div className="flex items-start justify-between">
                                                     <div className="flex items-start space-x-4">
                                                         <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center text-gray-400">
                                                             <CyberIcon name={unit.title.includes('Assessment') ? 'robot' : 'file'} className="w-5 h-5" />
                                                         </div>
                                                         <div>
                                                             <div className="text-white font-bold text-sm mb-1">{unit.title}</div>
                                                             <div className="text-gray-400 text-xs mb-3">{unit.description}</div>
                                                             <div className="flex space-x-2">
                                                                 {unit.videoUrl && (
                                                                     <span className="text-[10px] bg-red-900/30 text-red-400 border border-red-900 px-2 py-0.5 rounded flex items-center">
                                                                         <CyberIcon name="video" className="w-3 h-3 mr-1"/> VIDEO ATTACHED
                                                                     </span>
                                                                 )}
                                                                 {unit.notes && !unit.title.includes('Assessment') && (
                                                                     <span className="text-[10px] bg-blue-900/30 text-blue-400 border border-blue-900 px-2 py-0.5 rounded flex items-center">
                                                                         <CyberIcon name="file" className="w-3 h-3 mr-1"/> NOTES: {unit.notes.length} CHARS
                                                                     </span>
                                                                 )}
                                                                 {unit.title.includes('Assessment') && (
                                                                     <span className="text-[10px] bg-cyber-purple/30 text-cyber-purple border border-cyber-purple px-2 py-0.5 rounded flex items-center animate-pulse">
                                                                         <CyberIcon name="robot" className="w-3 h-3 mr-1"/> AI GENERATED
                                                                     </span>
                                                                 )}
                                                             </div>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </CyberCard>
                                         ))}
                                     </div>
                                 )}
                             </div>
                        </div>
                    )}
                </>
            )}

            {/* ---------------------------------------------------------------------------------- */}
            {/* STUDENT MANAGEMENT TAB (3 LEVELS) */}
            {/* ---------------------------------------------------------------------------------- */}
            {activeTab === 'STUDENT' && (
                <>
                    {/* LEVEL 1: COURSE SELECTION */}
                    {studentViewLevel === 'COURSE_SELECT' && (
                        <div className="h-full overflow-y-auto custom-scrollbar animate-fade-in">
                            <h2 className="text-2xl font-display font-bold text-white mb-6 border-b border-gray-700 pb-2">
                                SELECT COURSE DATABASE
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {MOCK_COURSES.map(course => (
                                    <div 
                                        key={course.id}
                                        onClick={() => handleSelectStudentCourse(course)}
                                        className="group bg-black/60 border border-gray-700 hover:border-cyber-pink hover:shadow-neon-pink rounded-lg p-0 overflow-hidden cursor-pointer transition-all duration-300"
                                    >
                                        <div className="h-40 relative">
                                            <img src={course.thumbnail} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all" alt={course.title} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                                            <div className="absolute bottom-4 left-4">
                                                <div className="text-cyber-pink font-mono text-xs font-bold mb-1">{course.code}</div>
                                                <div className="text-xl font-display font-bold text-white">{course.title}</div>
                                            </div>
                                        </div>
                                        <div className="p-4 flex justify-between items-center bg-gray-900/50">
                                            <div className="text-xs text-gray-400 font-mono">
                                                ACCESS ROSTER
                                            </div>
                                            <span className="text-cyber-pink text-xs font-bold flex items-center">
                                                VIEW STUDENTS <CyberIcon name="arrow-left" className="w-4 h-4 ml-2 rotate-180" />
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* LEVEL 2: CLASS ROSTER */}
                    {studentViewLevel === 'ROSTER' && studentSelectedCourse && (
                         <div className="h-full flex flex-col animate-fade-in">
                            <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-4">
                                <div className="flex items-center">
                                    <button onClick={handleBackToStudentCourses} className="mr-4 text-gray-500 hover:text-white transition-colors">
                                        <CyberIcon name="arrow-left" className="w-6 h-6" />
                                    </button>
                                    <div>
                                        <h2 className="text-2xl font-display font-bold text-white uppercase">{studentSelectedCourse.title}</h2>
                                        <div className="text-xs text-cyber-pink font-mono">CLASS DASHBOARD // ROSTER VIEW</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                <div className="bg-black/40 border border-gray-800 rounded-lg overflow-hidden">
                                    <table className="w-full text-left text-sm text-gray-400">
                                        <thead className="bg-gray-900/50 text-xs font-mono font-bold text-gray-300 uppercase">
                                            <tr>
                                                <th className="px-6 py-4">Student</th>
                                                <th className="px-6 py-4">Roll No</th>
                                                <th className="px-6 py-4">Attendance</th>
                                                <th className="px-6 py-4">GPA</th>
                                                <th className="px-6 py-4">Risk Level</th>
                                                <th className="px-6 py-4">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-800">
                                            {MOCK_CLASS_ROSTER.map((student) => (
                                                <tr key={student.id} className="hover:bg-cyber-cyan/5 transition-colors group">
                                                    <td className="px-6 py-4 flex items-center space-x-3">
                                                        <img src={student.avatar} className="w-8 h-8 rounded border border-gray-600 group-hover:border-cyber-cyan" alt="avi"/>
                                                        <span className="font-bold text-gray-200">{student.name}</span>
                                                    </td>
                                                    <td className="px-6 py-4 font-mono">{student.rollNo}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center space-x-2">
                                                            <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                                                <div className="h-full bg-cyber-purple" style={{ width: `${student.attendance}%` }}></div>
                                                            </div>
                                                            <span className="text-xs">{student.attendance}%</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 font-bold text-white">{student.gpa}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                                                            student.riskLevel === 'High' ? 'border-red-500 text-red-500 bg-red-500/10' :
                                                            student.riskLevel === 'Medium' ? 'border-yellow-500 text-yellow-500 bg-yellow-500/10' :
                                                            'border-green-500 text-green-500 bg-green-500/10'
                                                        }`}>
                                                            {student.riskLevel}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button 
                                                            onClick={() => handleSelectStudent(student)}
                                                            className="text-xs text-cyber-cyan hover:text-white font-bold flex items-center"
                                                        >
                                                            VIEW DETAILS <CyberIcon name="arrow-left" className="w-3 h-3 ml-1 rotate-180" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                         </div>
                    )}

                    {/* LEVEL 3: INDIVIDUAL STUDENT DASHBOARD */}
                    {studentViewLevel === 'DETAIL' && viewingStudent && (
                        <div className="h-full flex flex-col animate-fade-in">
                            <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-4">
                                <div className="flex items-center">
                                    <button onClick={handleBackToRoster} className="mr-4 text-gray-500 hover:text-white transition-colors">
                                        <CyberIcon name="arrow-left" className="w-6 h-6" />
                                    </button>
                                    <div>
                                        <h2 className="text-2xl font-display font-bold text-white uppercase">{viewingStudent.name}</h2>
                                        <div className="text-xs text-cyber-cyan font-mono">INDIVIDUAL PERFORMANCE MATRIX</div>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <span className={`px-3 py-1 rounded text-xs font-bold uppercase border bg-black ${
                                        viewingStudent.riskLevel === 'High' ? 'border-red-500 text-red-500' : 'border-green-500 text-green-500'
                                    }`}>
                                        RISK STATUS: {viewingStudent.riskLevel}
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar pb-10">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Left Column: Student Profile & Activity */}
                                    <div className="col-span-1 space-y-6">
                                        <CyberCard className="flex flex-col items-center text-center p-6">
                                            <div className="relative mb-4">
                                                <img src={viewingStudent.avatar} className="w-32 h-32 rounded-lg border-2 border-cyber-cyan object-cover bg-gray-800" alt="profile"/>
                                                <div className="absolute bottom-0 right-0 bg-black border border-cyber-cyan text-cyber-cyan text-xs px-2 py-0.5 font-bold">
                                                    {viewingStudent.class}
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-1">{viewingStudent.name}</h3>
                                            <p className="text-sm text-gray-500 font-mono mb-4">{viewingStudent.email}</p>
                                            
                                            <div className="w-full grid grid-cols-2 gap-2 text-left bg-black/40 p-3 rounded border border-gray-800">
                                                <div>
                                                    <div className="text-[10px] text-gray-500 uppercase">Roll No</div>
                                                    <div className="text-sm font-bold text-gray-300">{viewingStudent.rollNo}</div>
                                                </div>
                                                <div>
                                                    <div className="text-[10px] text-gray-500 uppercase">Last Active</div>
                                                    <div className="text-sm font-bold text-cyber-yellow">{viewingStudent.lastActive}</div>
                                                </div>
                                            </div>
                                        </CyberCard>

                                        {/* Activity Log */}
                                        <CyberCard>
                                            <h4 className="text-sm font-bold text-cyber-cyan font-display mb-4">RECENT NEURAL ACTIVITY</h4>
                                            <div className="space-y-3 text-sm">
                                                <div className="flex justify-between items-center text-gray-300 border-b border-gray-800 pb-2">
                                                    <span>Completed "Unit 3: Inventory Mgmt"</span>
                                                    <span className="text-xs text-gray-500 font-mono">2h ago</span>
                                                </div>
                                                <div className="flex justify-between items-center text-gray-300 border-b border-gray-800 pb-2">
                                                    <span>Quiz Score: 85% in SCM Module 2</span>
                                                    <span className="text-xs text-gray-500 font-mono">1d ago</span>
                                                </div>
                                                <div className="flex justify-between items-center text-gray-300">
                                                    <span>Uploaded Assignment: Case_Study.pdf</span>
                                                    <span className="text-xs text-gray-500 font-mono">2d ago</span>
                                                </div>
                                            </div>
                                        </CyberCard>
                                    </div>
                                    
                                    {/* Right Column: Charts Grid */}
                                    <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* GPA Chart */}
                                        <CyberCard className="h-64 md:col-span-2">
                                            <h4 className="text-sm font-bold text-cyber-pink font-display mb-4 flex items-center">
                                                <CyberIcon name="chart" className="w-4 h-4 mr-2" /> ACADEMIC TRAJECTORY (GPA)
                                            </h4>
                                            <ResponsiveContainer width="100%" height="85%">
                                                <LineChart data={viewingStudent.marksHistory}>
                                                    <XAxis dataKey="sem" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                                                    <YAxis domain={[0, 10]} stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                                                    <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #ff00ff', fontSize: '12px' }} />
                                                    <Line type="monotone" dataKey="gpa" stroke="#ff00ff" strokeWidth={2} dot={{fill: '#ff00ff'}} activeDot={{r: 4, stroke: 'white'}} />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </CyberCard>

                                        {/* Skills Radar */}
                                        <CyberCard className="h-64">
                                            <h4 className="text-sm font-bold text-cyber-purple font-display mb-4 flex items-center">
                                                <CyberIcon name="user" className="w-4 h-4 mr-2" /> SKILLS ANALYSIS
                                            </h4>
                                            <ResponsiveContainer width="100%" height="85%">
                                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={MOCK_SKILLS_DATA}>
                                                    <PolarGrid stroke="#374151" />
                                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                                                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                                    <Radar name="Student" dataKey="A" stroke="#9333ea" strokeWidth={2} fill="#9333ea" fillOpacity={0.3} />
                                                    <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #9333ea' }} itemStyle={{ color: '#fff' }} />
                                                </RadarChart>
                                            </ResponsiveContainer>
                                        </CyberCard>

                                        {/* Study Distribution Pie */}
                                        <CyberCard className="h-64">
                                            <h4 className="text-sm font-bold text-cyber-cyan font-display mb-4 flex items-center">
                                                <CyberIcon name="file" className="w-4 h-4 mr-2" /> RESOURCE ALLOCATION
                                            </h4>
                                            <ResponsiveContainer width="100%" height="85%">
                                                <PieChart>
                                                    <Pie
                                                        data={MOCK_STUDY_DIST_DATA}
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={40}
                                                        outerRadius={60}
                                                        paddingAngle={5}
                                                        dataKey="value"
                                                    >
                                                        {MOCK_STUDY_DIST_DATA.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #06b6d4' }} />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </CyberCard>

                                        {/* Attendance Bar */}
                                        <CyberCard className="h-64 md:col-span-2">
                                            <h4 className="text-sm font-bold text-cyber-yellow font-display mb-4 flex items-center">
                                                <CyberIcon name="calendar" className="w-4 h-4 mr-2" /> WEEKLY ATTENDANCE
                                            </h4>
                                            <ResponsiveContainer width="100%" height="85%">
                                                <BarChart data={MOCK_ATTENDANCE_HISTORY}>
                                                    <XAxis dataKey="day" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                                                    <Tooltip 
                                                        contentStyle={{ backgroundColor: '#000', border: '1px solid #eab308', color: '#fff' }}
                                                        cursor={{fill: 'rgba(234, 179, 8, 0.1)'}}
                                                    />
                                                    <Bar dataKey="hours" fill="#eab308" radius={[2, 2, 0, 0]} barSize={30} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </CyberCard>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* ---------------------------------------------------------------------------------- */}
            {/* ADMIN MANAGEMENT TAB */}
            {/* ---------------------------------------------------------------------------------- */}
            {activeTab === 'ADMIN' && (
                <div className="h-full overflow-y-auto custom-scrollbar animate-fade-in space-y-6">
                    <h2 className="text-2xl font-display font-bold text-white mb-4 border-b border-gray-700 pb-2">
                        SYSTEM ADMINISTRATION
                    </h2>
                    
                    <div className="grid grid-cols-3 gap-6">
                         {/* System Health */}
                         <CyberCard className="col-span-1">
                             <h3 className="text-lg font-bold text-cyber-purple mb-4">SERVER INTEGRITY</h3>
                             <div className="space-y-4">
                                 <div>
                                     <div className="flex justify-between text-xs text-gray-400 mb-1">
                                         <span>CPU Load</span>
                                         <span>34%</span>
                                     </div>
                                     <div className="w-full h-1 bg-gray-800 rounded-full">
                                         <div className="h-full bg-cyber-purple w-[34%]"></div>
                                     </div>
                                 </div>
                                 <div>
                                     <div className="flex justify-between text-xs text-gray-400 mb-1">
                                         <span>Memory Usage</span>
                                         <span>62%</span>
                                     </div>
                                     <div className="w-full h-1 bg-gray-800 rounded-full">
                                         <div className="h-full bg-cyber-purple w-[62%]"></div>
                                     </div>
                                 </div>
                                 <div>
                                     <div className="flex justify-between text-xs text-gray-400 mb-1">
                                         <span>Network Bandwidth</span>
                                         <span>12%</span>
                                     </div>
                                     <div className="w-full h-1 bg-gray-800 rounded-full">
                                         <div className="h-full bg-cyber-purple w-[12%]"></div>
                                     </div>
                                 </div>
                             </div>
                         </CyberCard>

                         {/* Quick Actions */}
                         <CyberCard className="col-span-2">
                             <h3 className="text-lg font-bold text-cyber-cyan mb-4">ADMIN PROTOCOLS</h3>
                             <div className="grid grid-cols-2 gap-4">
                                 <CyberButton variant="ghost" className="justify-center border-red-900/50 text-red-500 hover:bg-red-900/20">
                                     FLUSH CACHE
                                 </CyberButton>
                                 <CyberButton variant="ghost" className="justify-center">
                                     SYNC GOOGLE CLASSROOM
                                 </CyberButton>
                                 <CyberButton variant="ghost" className="justify-center">
                                     MANAGE FACULTY KEYS
                                 </CyberButton>
                                 <CyberButton variant="ghost" className="justify-center">
                                     EXPORT SYSTEM LOGS
                                 </CyberButton>
                             </div>
                         </CyberCard>
                    </div>

                    <CyberCard>
                        <h3 className="text-lg font-bold text-white mb-4">RECENT AUDIT LOGS</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs text-gray-400">
                                <thead className="text-gray-500 uppercase font-mono">
                                    <tr>
                                        <th className="pb-2">Action</th>
                                        <th className="pb-2">Admin</th>
                                        <th className="pb-2 text-right">Time</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {MOCK_ADMIN_LOGS.map(log => (
                                        <tr key={log.id}>
                                            <td className="py-2 text-gray-300">{log.action}</td>
                                            <td className="py-2 text-cyber-yellow">{log.admin}</td>
                                            <td className="py-2 text-right font-mono">{log.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CyberCard>
                </div>
            )}

            {/* ---------------------------------------------------------------------------------- */}
            {/* NOTIFICATION MANAGEMENT TAB */}
            {/* ---------------------------------------------------------------------------------- */}
            {activeTab === 'NOTIFICATION' && (
                <div className="h-full overflow-y-auto custom-scrollbar animate-fade-in space-y-6">
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-4">
                        <h2 className="text-2xl font-display font-bold text-white">
                            NOTIFICATION CENTER
                        </h2>
                        <CyberButton className="text-xs py-1">
                            <CyberIcon name="send" className="w-3 h-3 mr-2" /> SEND BROADCAST
                        </CyberButton>
                    </div>

                    <div className="space-y-4 max-w-4xl">
                        {[...FACULTY_NOTIFICATIONS, ...FACULTY_NOTIFICATIONS].map((notif, idx) => (
                             <div key={idx} className="bg-black/60 border border-gray-700 p-4 rounded flex items-start space-x-4 hover:border-cyber-cyan transition-colors">
                                 <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                                     notif.type === 'alert' ? 'bg-red-500 animate-pulse' : 
                                     notif.type === 'system' ? 'bg-cyber-purple' : 'bg-cyber-cyan'
                                 }`}></div>
                                 <div className="flex-1">
                                     <div className="flex justify-between items-start mb-1">
                                         <span className={`text-xs font-bold uppercase tracking-wider ${
                                             notif.type === 'alert' ? 'text-red-400' : 
                                             notif.type === 'system' ? 'text-cyber-purple' : 'text-cyber-cyan'
                                         }`}>
                                             {notif.type}
                                         </span>
                                         <span className="text-[10px] text-gray-500 font-mono">{notif.time}</span>
                                     </div>
                                     <p className="text-gray-300 text-sm">{notif.text}</p>
                                     <div className="flex mt-2 space-x-4">
                                         <button className="text-[10px] text-gray-500 hover:text-white uppercase font-bold">Mark Read</button>
                                         <button className="text-[10px] text-gray-500 hover:text-white uppercase font-bold">Delete</button>
                                     </div>
                                 </div>
                             </div>
                        ))}
                    </div>
                </div>
            )}
            
        </div>
      </div>
      
      {/* === MODALS === */}
      
      {/* 1. Add Course Modal */}
      {showAddCourseModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
             <CyberCard className="w-full max-w-md">
                <h3 className="text-xl font-bold text-white mb-4">INITIALIZE NEW STREAM</h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-gray-500 block mb-1">COURSE TITLE</label>
                        <input 
                           type="text" 
                           className="w-full bg-black border border-gray-700 p-2 text-white text-sm"
                           value={newCourseName}
                           onChange={(e) => setNewCourseName(e.target.value)}
                           placeholder="e.g. Advanced Game Theory"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 block mb-1">COURSE ID</label>
                        <input 
                           type="text" 
                           className="w-full bg-black border border-gray-700 p-2 text-white text-sm"
                           value={newCourseId}
                           onChange={(e) => setNewCourseId(e.target.value)}
                           placeholder="e.g. MBA-GT-505"
                        />
                    </div>
                    <div className="flex space-x-3 mt-6">
                        <CyberButton onClick={handleCreateCourse} className="flex-1">CREATE</CyberButton>
                        <CyberButton variant="secondary" onClick={() => setShowAddCourseModal(false)} className="flex-1">CANCEL</CyberButton>
                    </div>
                </div>
             </CyberCard>
          </div>
      )}

      {/* 2. Upload Modal */}
      {showUploadModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
             <CyberCard className="w-full max-w-md">
                <h3 className="text-xl font-bold text-cyber-yellow mb-4">UPLOAD CONTENT MATERIAL</h3>
                <p className="text-xs text-gray-400 mb-6">Select content type to stream to the neural network.</p>
                
                {/* AI Toggle */}
                <div className="flex items-center justify-between bg-gray-900 border border-gray-700 p-3 rounded mb-4">
                    <span className="text-xs font-bold text-cyber-cyan flex items-center">
                        <CyberIcon name="robot" className="w-4 h-4 mr-2" /> GENERATE AI ASSESSMENT
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={generateAIQuiz} onChange={(e) => setGenerateAIQuiz(e.target.checked)} className="sr-only peer" />
                        <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-cyber-cyan rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyber-cyan"></div>
                    </label>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                    {['PDF DOCUMENT', 'VIDEO FEED', 'IMAGE ASSET'].map(type => (
                        <button 
                          key={type}
                          onClick={() => handleUploadContent(type)}
                          className="bg-gray-900 border border-gray-700 p-4 rounded hover:border-cyber-yellow hover:text-cyber-yellow text-xs font-bold transition-all flex flex-col items-center justify-center h-24"
                        >
                            <CyberIcon name={type.includes('VIDEO') ? 'video' : type.includes('IMAGE') ? 'image' : 'file'} className="w-6 h-6 mb-2" />
                            <span className="text-center">{type}</span>
                        </button>
                    ))}
                </div>
                <CyberButton variant="secondary" onClick={() => setShowUploadModal(false)} className="w-full">CANCEL UPLOAD</CyberButton>
             </CyberCard>
          </div>
      )}

      {/* 3. Gradebook Modal */}
      {showGradebookModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-8">
             <CyberCard className="w-full max-w-4xl h-[80vh] flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">CLASS GRADEBOOK: {selectedCourse?.code}</h3>
                    <button onClick={() => setShowGradebookModal(false)} className="text-gray-500 hover:text-white">
                        <CyberIcon name="close" className="w-6 h-6"/>
                    </button>
                </div>
                <div className="flex-1 overflow-auto custom-scrollbar bg-black/40 border border-gray-800 rounded">
                    <table className="w-full text-left text-sm text-gray-300">
                        <thead className="bg-gray-900 sticky top-0 font-bold font-mono text-xs uppercase">
                            <tr>
                                <th className="p-4 border-b border-gray-700">Student</th>
                                <th className="p-4 border-b border-gray-700 text-center">Unit 1</th>
                                <th className="p-4 border-b border-gray-700 text-center">Unit 2</th>
                                <th className="p-4 border-b border-gray-700 text-center">Unit 3</th>
                                <th className="p-4 border-b border-gray-700 text-center text-cyber-cyan">Total %</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {MOCK_CLASS_ROSTER.map(student => (
                                <tr key={student.id} className="hover:bg-white/5">
                                    <td className="p-4 font-bold">{student.name}</td>
                                    <td className="p-4 text-center">{(student.gpa * 10 + Math.random()*10).toFixed(0)}</td>
                                    <td className="p-4 text-center">{(student.gpa * 10 - Math.random()*5).toFixed(0)}</td>
                                    <td className="p-4 text-center">{(student.gpa * 10 + Math.random()*5).toFixed(0)}</td>
                                    <td className="p-4 text-center font-bold text-cyber-cyan">{(student.gpa * 9.5).toFixed(1)}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
             </CyberCard>
          </div>
      )}

      {/* 4. Attendance Breakdown Modal */}
      {showAttendanceModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
             <CyberCard className="w-full max-w-lg">
                <h3 className="text-xl font-bold text-cyber-purple mb-4">ATTENDANCE BREAKDOWN</h3>
                <div className="space-y-4">
                    {MOCK_COURSES.map(course => (
                        <div key={course.id} className="bg-gray-900 p-4 rounded border border-gray-700 flex justify-between items-center">
                            <div>
                                <div className="text-white font-bold">{course.title}</div>
                                <div className="text-xs text-gray-500 font-mono">{course.code}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-xl font-bold text-cyber-purple">{(85 + Math.random() * 10).toFixed(1)}%</div>
                                <div className="text-[10px] text-gray-400 uppercase">Avg. Attendance</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6">
                    <CyberButton onClick={() => setShowAttendanceModal(false)} className="w-full">CLOSE REPORT</CyberButton>
                </div>
             </CyberCard>
          </div>
      )}

      {/* 5. Faculty Profile Modal */}
      {showProfileModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
              <CyberCard className="w-full max-w-lg">
                  <div className="flex items-center space-x-4 border-b border-gray-700 pb-4 mb-4">
                      <img src={user.avatar} className="w-20 h-20 rounded-lg border-2 border-cyber-yellow object-cover" alt="Profile" />
                      <div>
                          <h3 className="text-2xl font-display font-bold text-white uppercase">{user.name}</h3>
                          <div className="text-cyber-yellow font-mono text-xs font-bold">SENIOR FACULTY ADMIN</div>
                          <div className="text-gray-500 font-mono text-xs mt-1">ID: FAC-7749-X</div>
                      </div>
                  </div>
                  
                  <div className="space-y-4 text-sm text-gray-300">
                      <div>
                          <h4 className="text-xs text-gray-500 font-bold uppercase mb-1">DEPARTMENT</h4>
                          <p className="font-bold">Operations & Analytics</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                           <div>
                               <h4 className="text-xs text-gray-500 font-bold uppercase mb-1">EXPERIENCE</h4>
                               <p className="font-mono text-cyber-cyan">15+ YEARS</p>
                           </div>
                           <div>
                               <h4 className="text-xs text-gray-500 font-bold uppercase mb-1">CURRENT LOAD</h4>
                               <p className="font-mono text-cyber-pink">3 COURSES</p>
                           </div>
                      </div>
                      <div>
                          <h4 className="text-xs text-gray-500 font-bold uppercase mb-1">RESEARCH AREAS</h4>
                          <div className="flex flex-wrap gap-2">
                              <span className="bg-gray-800 border border-gray-600 px-2 py-0.5 rounded text-[10px]">Supply Chain AI</span>
                              <span className="bg-gray-800 border border-gray-600 px-2 py-0.5 rounded text-[10px]">Game Theory</span>
                              <span className="bg-gray-800 border border-gray-600 px-2 py-0.5 rounded text-[10px]">Blockchain Logistics</span>
                          </div>
                      </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                      <CyberButton onClick={() => setShowProfileModal(false)}>CLOSE PROFILE</CyberButton>
                  </div>
              </CyberCard>
          </div>
      )}

      {/* 6. High Risk Alert Modal */}
      {showRiskModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
             <CyberCard className="w-full max-w-2xl">
                <h3 className="text-xl font-bold text-red-500 mb-4 flex items-center">
                    <CyberIcon name="shield" className="w-6 h-6 mr-2" /> AT-RISK STUDENT REPORT
                </h3>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {highRiskStudents.length === 0 ? (
                        <p className="text-green-500">No students currently flagged as high risk.</p>
                    ) : (
                        <table className="w-full text-left text-sm text-gray-400">
                            <thead className="bg-red-900/20 text-red-300 font-mono text-xs uppercase">
                                <tr>
                                    <th className="p-3">Student</th>
                                    <th className="p-3">GPA</th>
                                    <th className="p-3">Attendance</th>
                                    <th className="p-3">Contact</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-red-900/30">
                                {highRiskStudents.map(s => (
                                    <tr key={s.id} className="hover:bg-red-900/10">
                                        <td className="p-3 font-bold text-white flex items-center">
                                            <img src={s.avatar} className="w-6 h-6 rounded mr-2"/> {s.name}
                                        </td>
                                        <td className="p-3 font-mono text-red-400">{s.gpa}</td>
                                        <td className="p-3 font-mono">{s.attendance}%</td>
                                        <td className="p-3">
                                            <button className="text-[10px] border border-red-500 text-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white transition-colors">
                                                MESSAGE
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="mt-6 flex justify-end">
                    <CyberButton onClick={() => setShowRiskModal(false)}>ACKNOWLEDGE</CyberButton>
                </div>
             </CyberCard>
          </div>
      )}

    </div>
  );
};
