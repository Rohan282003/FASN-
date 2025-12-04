
import React, { useState } from 'react';
import { User, Course, ViewState } from '../types';
import { CyberIcon, CyberSquareButton, CyberIconButton, CyberButton } from './CyberComponents';
import { MOCK_COURSES, PENDING_TASKS, ATTENDANCE_DATA, STORE_ITEMS, TOP_AGENTS, AVATAR_VARIANTS } from '../constants';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, LineChart, Line, YAxis } from 'recharts';

interface DashboardProps {
  user: User;
  onSelectCourse: (course: Course) => void;
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
  onUpdateUser: (user: User) => void;
}

type ModalType = 'COMPLETION' | 'TASKS' | 'ATTENDANCE' | 'STORE' | 'PROFILE' | 'INVITE' | 'SETTINGS' | 'MEETING' | null;

export const Dashboard: React.FC<DashboardProps> = ({ user, onSelectCourse, onNavigate, onLogout, onUpdateUser }) => {
  
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [chatInput, setChatInput] = useState('');
  const [inviteId, setInviteId] = useState('');
  const [invitePass, setInvitePass] = useState('');

  // Meeting State
  const [meetingReason, setMeetingReason] = useState('');
  const [selectedFacultyId, setSelectedFacultyId] = useState('');

  // Local Chat State
  const [chatMessages, setChatMessages] = useState([
    { user: 'Neo_X', msg: 'Anyone finished the SCM module?', time: '10:42' },
    { user: 'Trinity_MBA', msg: 'Yeah, the drone routing algo is tough.', time: '10:43' },
    { user: 'SYSTEM', msg: 'New Material: Uploaded "Adv_Game_Theory.pdf" to Store.', time: '10:44', type: 'system' },
    { user: 'Cipher', msg: 'LFG! Marketing Analytics raid starting.', time: '10:45' },
    { user: 'SYSTEM', msg: 'Study Alert: Quiz on "Neural Marketing" starts in 10m.', time: '10:45', type: 'system' },
    { user: 'Rohan', msg: 'Joining in 5 mins.', time: '10:46' },
  ]);

  const handleSendMessage = () => {
    if(!chatInput.trim()) return;
    const newMsg = {
        user: user.name,
        msg: chatInput,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    setChatMessages(prev => [...prev, newMsg]);
    setChatInput('');
  };

  const handleRequestMeeting = () => {
    if (!selectedFacultyId || !meetingReason) {
        alert("Please select a faculty node and specify a reason protocol.");
        return;
    }
    alert(`UPLINK ESTABLISHED.\nRequest transmitted to Faculty ID: ${selectedFacultyId}.\nReason: ${meetingReason}`);
    setActiveModal(null);
    setMeetingReason('');
    setSelectedFacultyId('');
  };

  const renderModalContent = () => {
    switch(activeModal) {
      case 'COMPLETION':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-display text-cyber-cyan border-b border-gray-700 pb-2">Mission Completion 🏁</h3>
            <div className="space-y-4">
              {MOCK_COURSES.map(course => (
                <div key={course.id} className="bg-black/40 p-3 border border-gray-700 shadow-sm hover:border-cyber-cyan/50">
                  <div className="flex justify-between text-sm text-gray-300 mb-1">
                    <span>{course.title}</span>
                    <span className="font-mono text-cyber-cyan font-bold">{course.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyber-cyan shadow-neon-cyan" style={{ width: `${course.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'TASKS':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-display text-cyber-pink border-b border-gray-700 pb-2">Pending Protocols 📋</h3>
            <div className="space-y-3">
              {PENDING_TASKS.map(task => (
                <div key={task.id} className="flex items-center justify-between bg-black/40 p-3 border border-gray-700 border-l-4 border-l-cyber-pink shadow-sm">
                  <div>
                    <div className="text-gray-200 text-sm font-bold">{task.title}</div>
                    <div className="text-[10px] text-gray-500 font-mono">DUE: {task.due}</div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 border font-bold ${task.priority === 'High' ? 'text-red-400 border-red-500' : 'text-yellow-600 border-yellow-500'}`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'ATTENDANCE':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-display text-cyber-purple border-b border-gray-700 pb-2">Neural Link Uptime 🕒</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ATTENDANCE_DATA}>
                  <XAxis dataKey="day" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #bc13fe', color: '#fff' }}
                    labelStyle={{ color: '#bc13fe' }}
                  />
                  <Bar dataKey="hours" fill="#bc13fe" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center text-xs font-mono text-gray-500">
              TOTAL UPTIME: <span className="text-cyber-purple font-bold">23.6 HOURS</span> (THIS WEEK)
            </div>
          </div>
        );
      case 'STORE':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-display text-cyber-yellow border-b border-gray-700 pb-2">Knowledge Store 🛍️</h3>
            <div className="grid grid-cols-2 gap-3">
              {STORE_ITEMS.map(item => (
                <div key={item.id} className="bg-black/40 p-3 border border-gray-700 hover:border-cyber-yellow transition-colors group cursor-pointer shadow-sm">
                  <div className="text-[10px] text-yellow-600 font-mono mb-1 font-bold">{item.type.toUpperCase()}</div>
                  <div className="text-gray-200 text-xs font-bold leading-tight mb-2 group-hover:text-cyber-yellow transition-colors">{item.title}</div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[10px] text-gray-500">{item.price}</span>
                    <CyberIcon name="cart" className="w-3 h-3 text-gray-400 group-hover:text-yellow-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'SETTINGS':
        return (
            <div className="space-y-6">
               <h3 className="text-xl font-display text-cyber-cyan border-b border-gray-700 pb-2">System Configuration ⚙️</h3>
               
               <div className="space-y-4">
                  {/* Audio */}
                  <div className="bg-black/40 p-3 border border-gray-700 rounded">
                     <div className="flex items-center mb-2">
                        <CyberIcon name="volume" className="w-4 h-4 text-cyber-cyan mr-2" />
                        <span className="text-sm font-bold text-gray-200">AUDIO PROTOCOLS</span>
                     </div>
                     <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs text-gray-400">
                           <span>Master Volume</span>
                           <input type="range" className="w-32 accent-cyber-cyan h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-400">
                           <span>Voice Interface</span>
                           <div className="w-8 h-4 bg-cyber-cyan/20 border border-cyber-cyan rounded-full relative cursor-pointer">
                              <div className="absolute right-0.5 top-0.5 w-2.5 h-2.5 bg-cyber-cyan rounded-full"></div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Notifications */}
                  <div className="bg-black/40 p-3 border border-gray-700 rounded">
                     <div className="flex items-center mb-2">
                        <CyberIcon name="bell" className="w-4 h-4 text-cyber-pink mr-2" />
                        <span className="text-sm font-bold text-gray-200">ALERTS</span>
                     </div>
                     <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
                        <span>Push Notifications</span>
                         <div className="w-8 h-4 bg-cyber-pink/20 border border-cyber-pink rounded-full relative cursor-pointer">
                              <div className="absolute right-0.5 top-0.5 w-2.5 h-2.5 bg-cyber-pink rounded-full"></div>
                         </div>
                     </div>
                      <div className="flex justify-between items-center text-xs text-gray-400">
                        <span>Email Summaries</span>
                         <div className="w-8 h-4 bg-gray-800 border border-gray-600 rounded-full relative cursor-pointer">
                              <div className="absolute left-0.5 top-0.5 w-2.5 h-2.5 bg-gray-500 rounded-full"></div>
                         </div>
                     </div>
                  </div>

                  {/* Account */}
                  <div className="bg-black/40 p-3 border border-gray-700 rounded">
                     <div className="flex items-center mb-2">
                        <CyberIcon name="shield" className="w-4 h-4 text-cyber-purple mr-2" />
                        <span className="text-sm font-bold text-gray-200">PRIVACY & SECURITY</span>
                     </div>
                     <div className="flex justify-between items-center text-xs text-gray-400">
                        <span>Two-Factor Auth</span>
                        <span className="text-green-500 font-bold">ENABLED</span>
                     </div>
                     <div className="mt-2">
                        <CyberButton variant="ghost" className="w-full text-[10px] py-1">Manage Keys</CyberButton>
                     </div>
                  </div>

                  <div className="text-center">
                      <p className="text-[10px] text-gray-600 font-mono">APP VER: 2.4.0 (BETA)</p>
                  </div>
               </div>
            </div>
        );
      case 'INVITE':
        return (
          <div className="space-y-6">
             <h3 className="text-xl font-display text-cyber-cyan border-b border-gray-700 pb-2">Decrypt New Module 🔓</h3>
             <div className="space-y-4">
               <div>
                 <label className="text-xs font-mono text-gray-500 block mb-1">MODULE ID</label>
                 <input 
                   type="text" 
                   value={inviteId}
                   onChange={e => setInviteId(e.target.value)}
                   className="w-full bg-black/60 border border-gray-700 text-gray-200 px-3 py-2 font-mono text-sm focus:border-cyber-cyan focus:outline-none focus:ring-1 focus:ring-cyber-cyan"
                   placeholder="MBA-XXX-0000"
                 />
               </div>
               <div>
                 <label className="text-xs font-mono text-gray-500 block mb-1">ACCESS KEY (PASSWORD)</label>
                 <input 
                   type="password" 
                   value={invitePass}
                   onChange={e => setInvitePass(e.target.value)}
                   className="w-full bg-black/60 border border-gray-700 text-gray-200 px-3 py-2 font-mono text-sm focus:border-cyber-cyan focus:outline-none focus:ring-1 focus:ring-cyber-cyan"
                   placeholder="••••••••"
                 />
               </div>
               <CyberButton className="w-full" onClick={() => { alert('Access Denied. Invalid Key.'); setActiveModal(null); }}>
                  INITIATE HANDSHAKE
               </CyberButton>
             </div>
          </div>
        );
      case 'MEETING':
        return (
            <div className="space-y-6">
               <h3 className="text-xl font-display text-cyber-pink border-b border-gray-700 pb-2">Schedule Neural Uplink 🤝</h3>
               <div className="space-y-4">
                   <div>
                       <label className="text-xs font-mono text-gray-500 block mb-1">TARGET FACULTY NODE</label>
                       <select 
                         value={selectedFacultyId}
                         onChange={(e) => setSelectedFacultyId(e.target.value)}
                         className="w-full bg-black/60 border border-gray-700 text-gray-200 px-3 py-2 font-mono text-sm focus:border-cyber-pink focus:outline-none"
                       >
                           <option value="">-- SELECT FACULTY --</option>
                           <option value="f1">Prof. Krishna Durba (SCM/MKT)</option>
                           <option value="f2">Dr. Sarah Connor (AI Ethics)</option>
                           <option value="f3">Prof. Alan Turing (Computation)</option>
                       </select>
                   </div>
                   <div>
                       <label className="text-xs font-mono text-gray-500 block mb-1">TRANSMISSION REASON</label>
                       <textarea 
                         value={meetingReason}
                         onChange={(e) => setMeetingReason(e.target.value)}
                         className="w-full bg-black/60 border border-gray-700 text-gray-200 px-3 py-2 font-mono text-sm h-24 resize-none focus:border-cyber-pink focus:outline-none"
                         placeholder="Requesting guidance on..."
                       />
                   </div>
                   <div className="flex space-x-3">
                       <CyberButton variant="secondary" onClick={() => setActiveModal(null)} className="flex-1">CANCEL</CyberButton>
                       <CyberButton onClick={handleRequestMeeting} className="flex-1 bg-cyber-pink text-black hover:bg-white border-none">TRANSMIT REQUEST</CyberButton>
                   </div>
               </div>
            </div>
        );
      case 'PROFILE':
        return (
          <div className="space-y-6">
             <div className="flex items-center space-x-4 border-b border-gray-700 pb-4">
                <img src={user.avatar} className="w-20 h-20 rounded-lg border-2 border-cyber-cyan object-cover bg-top bg-gray-800" alt="Profile" />
                <div>
                  <h3 className="text-2xl font-display font-bold text-gray-100 uppercase">{user.name}</h3>
                  <div className="text-cyber-cyan font-mono text-xs font-bold">{user.class}</div>
                  <div className="text-gray-500 font-mono text-xs mt-1">REG NO: {user.regNo}</div>
                  <div className="text-gray-500 font-mono text-xs">SEMESTER: {user.semester}</div>
                </div>
             </div>
             
             <div className="space-y-2">
               <h4 className="text-sm font-bold text-cyber-pink font-display flex items-center">
                 <CyberIcon name="chart" className="w-4 h-4 mr-2" /> ACADEMIC PERFORMANCE (GPA)
               </h4>
               <div className="h-40 w-full bg-black/40 border border-gray-700 p-2 rounded shadow-inner">
                 <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={user.marksHistory}>
                      <XAxis dataKey="sem" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis domain={[0, 10]} stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #ff00ff', fontSize: '12px' }} />
                      <Line type="monotone" dataKey="gpa" stroke="#ff00ff" strokeWidth={2} dot={{fill: '#ff00ff'}} activeDot={{r: 4, stroke: 'white'}} />
                   </LineChart>
                 </ResponsiveContainer>
               </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 p-2 border border-gray-700 text-center shadow-sm">
                   <div className="text-xs text-gray-500 font-mono">CURRENT CGPA</div>
                   <div className="text-xl text-gray-100 font-bold font-display">8.15</div>
                </div>
                <div className="bg-black/40 p-2 border border-gray-700 text-center shadow-sm">
                   <div className="text-xs text-gray-500 font-mono">CREDITS EARNED</div>
                   <div className="text-xl text-yellow-600 font-bold font-display">86/120</div>
                </div>
             </div>
             
             {/* AVATAR CUSTOMIZATION */}
             <div className="mt-4 border-t border-gray-700 pt-4">
                <h4 className="text-sm font-bold text-cyber-cyan font-display mb-2 flex items-center">
                  <CyberIcon name="user" className="w-4 h-4 mr-2" /> NEURAL SKIN SELECTION
                </h4>
                <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-thin">
                  {AVATAR_VARIANTS.map(variant => (
                    <button
                      key={variant.id}
                      onClick={() => onUpdateUser({...user, avatar: variant.url})}
                      className={`relative w-16 h-16 rounded-lg border-2 overflow-hidden transition-all flex-shrink-0 group ${user.avatar === variant.url ? 'border-cyber-cyan shadow-neon-cyan scale-105' : 'border-gray-700 opacity-60 hover:opacity-100'}`}
                      title={variant.name}
                    >
                      <img src={variant.url} className="w-full h-full object-cover bg-gray-800" alt={variant.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center">
                        <span className="text-[8px] text-white font-mono uppercase tracking-tighter mb-1 opacity-0 group-hover:opacity-100 transition-opacity">{variant.name.split(' ')[0]}</span>
                      </div>
                    </button>
                  ))}
                </div>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full relative">
      
      {/* === TOP LEFT: PLAYER PROFILE & LEADERBOARD === */}
      <div className="absolute top-6 left-6 z-30 flex flex-col space-y-4">
        {/* Profile Card */}
        <div 
            className="flex items-start space-x-4 animate-fade-in-down cursor-pointer group hover:scale-105 transition-transform"
            onClick={() => setActiveModal('PROFILE')}
            role="button"
            title="View Player Profile"
        >
            <div className="relative">
                <img src={user.avatar} className="w-16 h-16 rounded border-2 border-cyber-cyan shadow-neon-cyan object-cover bg-black/60 bg-top group-hover:ring-2 ring-cyber-pink transition-all" alt="Profile"/>
                <div className="absolute -bottom-2 -right-2 bg-black border border-cyber-cyan text-cyber-cyan text-[10px] font-bold px-1.5 py-0.5 shadow-sm">
                {user.level}
                </div>
            </div>
            <div className="bg-black/60 backdrop-blur-sm p-3 rounded-r-lg border-l-4 border-cyber-cyan shadow-sm">
                <div className="flex items-center space-x-2">
                <h2 className="text-xl font-display font-bold text-gray-100 uppercase tracking-wider group-hover:text-cyber-cyan transition-colors">{user.name}</h2>
                <span className="bg-cyber-purple/10 text-cyber-purple border border-cyber-purple/30 text-[9px] px-1 rounded uppercase font-bold">
                    {user.role}
                </span>
                </div>
                <div className="w-40 h-1.5 bg-gray-700 mt-1 border border-gray-600 relative skew-x-[-10deg] overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-cyber-yellow" style={{width: '65%'}}></div>
                </div>
                <div className="text-[10px] text-yellow-600 font-mono mt-1 tracking-widest flex items-center font-bold">
                XP: {user.xp} / 10000 
                </div>
            </div>
        </div>

        {/* High Level Students (Leaderboard) */}
        <div className="bg-black/60 backdrop-blur-sm border border-gray-700 p-3 rounded w-64 shadow-lg animate-fade-in-up">
            <div className="text-[10px] font-display font-bold text-cyber-purple mb-2 tracking-widest border-b border-gray-600 pb-1">
                TOP AGENTS (HIGH LEVEL) 🏆
            </div>
            <div className="space-y-2">
                {TOP_AGENTS.map((agent) => (
                    <div key={agent.rank} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="text-xs font-mono font-bold text-gray-400">#{agent.rank}</span>
                            <img src={agent.avatar} className="w-6 h-6 rounded-full border border-gray-600 bg-gray-800" alt={agent.name}/>
                            <span className="text-xs font-bold text-gray-200">{agent.name}</span>
                        </div>
                        <span className="text-[10px] bg-gray-800 text-gray-400 px-1 rounded font-mono">LVL {agent.level}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* === TOP RIGHT: SYSTEM & CURRENCY === */}
      <div className="absolute top-6 right-6 z-30 flex flex-col items-end space-y-2 animate-fade-in-down">
         <div className="flex space-x-2">
            <CyberIconButton 
              icon="settings" 
              className="border-gray-700 text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan shadow-sm bg-black/60"
              onClick={() => setActiveModal('SETTINGS')}
            />
            <CyberIconButton icon="power" className="border-red-900 text-red-500 hover:text-red-400 hover:border-red-500 bg-black/60" onClick={onLogout} />
         </div>
         <div className="flex items-center space-x-2 bg-black/60 px-3 py-1 border-l-4 border-cyber-yellow shadow-sm">
            <span className="text-yellow-500 font-bold font-display">¢</span>
            <span className="text-gray-200 font-mono font-bold">8,540 CR</span>
         </div>
      </div>

      {/* === TOP CENTER: LOBBY MENU === */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex space-x-4">
         <CyberSquareButton 
           icon={<CyberIcon name="chart" className="w-6 h-6"/>}
           label="Completion" 
           value="78%" 
           onClick={() => setActiveModal('COMPLETION')}
           className={activeModal === 'COMPLETION' ? 'bg-cyber-cyan/20 border-cyber-cyan' : ''}
         />
         <CyberSquareButton 
           icon={<CyberIcon name="list" className="w-6 h-6"/>}
           label="Tasks" 
           value="03" 
           className={`border-cyber-pink/50 text-cyber-pink ${activeModal === 'TASKS' ? 'bg-cyber-pink/20 border-cyber-pink' : ''}`}
           onClick={() => setActiveModal('TASKS')}
         />
         <CyberSquareButton 
           icon={<CyberIcon name="calendar" className="w-6 h-6"/>}
           label="Attendance" 
           value="92%" 
           className={`border-cyber-purple/50 text-cyber-purple ${activeModal === 'ATTENDANCE' ? 'bg-cyber-purple/20 border-cyber-purple' : ''}`}
           onClick={() => setActiveModal('ATTENDANCE')}
         />
         <CyberSquareButton 
           icon={<CyberIcon name="cart" className="w-6 h-6"/>}
           label="Store" 
           value="OPEN" 
           className={`border-cyber-yellow/50 text-yellow-600 ${activeModal === 'STORE' ? 'bg-cyber-yellow/20 border-cyber-yellow' : ''}`}
           onClick={() => setActiveModal('STORE')}
         />
      </div>

      {/* === CENTER: AVATAR DISPLAY === */}
      <div className="absolute inset-0 z-0 flex items-end justify-center pointer-events-none">
         {/* Floor Glow */}
         <div className="absolute bottom-[5%] w-[500px] h-[100px] bg-cyber-cyan/20 blur-[60px] rounded-full animate-pulse-slow"></div>
         {/* Character */}
         <img 
           src={user.avatar} 
           alt="Avatar" 
           className="h-[75vh] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500"
           style={{ 
               maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
               WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)'
             }}
         />
      </div>

      {/* === MODAL OVERLAY === */}
      {activeModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
           <div className="relative w-full max-w-lg bg-black border border-gray-700 shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-lg overflow-hidden flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-gray-900/50">
                 <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyber-cyan rounded-full animate-pulse"></div>
                    <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">{activeModal} PROTOCOL</span>
                 </div>
                 <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-white transition-colors">
                    <CyberIcon name="close" className="w-5 h-5" />
                 </button>
              </div>
              
              {/* Modal Body */}
              <div className="p-6 overflow-y-auto custom-scrollbar">
                 {renderModalContent()}
              </div>

              {/* Modal Footer (Decorative) */}
              <div className="h-2 w-full bg-gray-900 border-t border-gray-800 flex items-center justify-between px-2">
                 <div className="w-1/3 h-0.5 bg-gray-800"></div>
                 <div className="w-1/3 h-0.5 bg-gray-800"></div>
              </div>
           </div>
        </div>
      )}
      
      {/* === LEFT SIDE (MID): SCHEDULE MEETING BUTTON === */}
      <div className="absolute top-1/2 -translate-y-1/2 left-6 z-20 flex flex-col space-y-4 w-64">
           {/* Space holder or future features. Currently just the button */}
           <div 
             onClick={() => setActiveModal('MEETING')}
             className="group relative bg-black/60 border border-gray-700 p-4 hover:bg-gray-900/80 hover:border-cyber-pink transition-all cursor-pointer backdrop-blur-sm overflow-hidden rounded flex items-center space-x-3 shadow-lg"
           >
              <div className="w-10 h-10 bg-cyber-pink/10 border border-cyber-pink rounded flex items-center justify-center text-cyber-pink group-hover:scale-110 transition-transform">
                  <CyberIcon name="calendar" className="w-5 h-5" />
              </div>
              <div>
                  <div className="text-xs font-bold text-gray-200 group-hover:text-cyber-pink font-display uppercase tracking-wide">
                      SCHEDULE LINK
                  </div>
                  <div className="text-[9px] text-gray-500 font-mono mt-0.5">
                      Request Faculty Uplink
                  </div>
              </div>
           </div>
      </div>


      {/* === BOTTOM LEFT: GLOBAL CHAT === */}
      <div className="absolute bottom-6 left-6 z-30 w-[400px] h-[200px] flex flex-col pointer-events-none">
          {/* Chat Window */}
          <div className="flex-1 bg-black/40 backdrop-blur-md border border-gray-700 p-3 flex flex-col pointer-events-auto rounded-t-lg shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-1 opacity-50 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                  </div>
              </div>
              
              <div className="text-[10px] text-cyber-cyan font-mono font-bold mb-2 flex items-center border-b border-gray-800 pb-1">
                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                 CHRIST COMMUNITY CHANNEL 💬
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 mb-2 pr-1">
                  {chatMessages.map((msg, idx) => (
                      <div key={idx} className={`text-xs ${msg.type === 'system' ? 'text-green-400 font-mono' : 'text-gray-300'}`}>
                          <span className="text-gray-600 font-mono text-[10px] mr-2">[{msg.time}]</span>
                          <span className={`font-bold mr-1 ${msg.user === user.name ? 'text-cyber-cyan' : msg.type === 'system' ? 'text-green-500' : 'text-cyber-pink'}`}>
                              {msg.user}:
                          </span>
                          <span className={msg.type === 'system' ? 'italic' : ''}>{msg.msg}</span>
                      </div>
                  ))}
              </div>

              <div className="flex mt-1 pt-2 border-t border-gray-800">
                  <input 
                      type="text" 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 bg-transparent border-none text-xs text-white focus:ring-0 placeholder-gray-600 font-mono"
                      placeholder="BROADCAST MESSAGE..."
                  />
                  <button onClick={handleSendMessage} className="text-cyber-cyan hover:text-white">
                      <CyberIcon name="send" className="w-3 h-3" />
                  </button>
              </div>
          </div>
          {/* Decorative Bottom Bar */}
          <div className="h-1 bg-cyber-cyan w-full shadow-neon-cyan opacity-50"></div>
      </div>

      {/* === BOTTOM RIGHT: START BUTTON & QUICK NAV === */}
      <div className="absolute bottom-6 right-6 z-30 flex items-end space-x-4">
           {/* Quick Nav Icons */}
           <div className="flex flex-col space-y-2 mr-24">
              {/* Stats Button */}
              <button 
                 onClick={() => onNavigate(ViewState.ANALYTICS)}
                 className="w-14 h-14 bg-black/60 border border-gray-600 hover:border-cyber-pink hover:bg-cyber-pink/10 rounded flex items-center justify-center transition-all group relative backdrop-blur-sm shadow-[0_0_15px_rgba(217,70,239,0.3)]"
              >
                 <CyberIcon name="stats" className="w-6 h-6 text-gray-400 group-hover:text-cyber-pink transition-colors" />
                 <span className="absolute -top-8 bg-black border border-cyber-pink text-cyber-pink text-[9px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold tracking-widest">
                    STATS HQ 📊
                 </span>
                 {/* Decorative corners */}
                 <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-gray-500 group-hover:border-cyber-pink"></div>
                 <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-gray-500 group-hover:border-cyber-pink"></div>
              </button>
           </div>
      </div>

      {/* === RIGHT SIDE: SQUAD / COURSES (Moved from Left) === */}
      <div className="absolute top-1/2 -translate-y-1/2 right-6 z-20 flex flex-col space-y-4 w-64">
         <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1 font-bold text-right">
            Assigned Missions 🚀
         </div>
         {MOCK_COURSES.map((course) => (
             <div 
               key={course.id}
               onClick={() => onSelectCourse(course)}
               className="group relative bg-black/60 border border-gray-700 p-3 hover:bg-gray-900/80 hover:border-cyber-cyan transition-all cursor-pointer backdrop-blur-sm overflow-hidden"
             >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-cyber-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex items-center space-x-3 relative z-10">
                    <div className="w-10 h-10 border border-gray-600 rounded overflow-hidden relative group-hover:border-cyber-cyan">
                        <img 
                          src={course.thumbnail} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 opacity-70" 
                          alt="Thumb"
                        />
                    </div>
                    <div className="flex-1">
                        <div className="text-xs font-bold text-gray-300 group-hover:text-cyber-cyan font-display uppercase tracking-wide">
                            {course.title}
                        </div>
                        <div className="text-[9px] text-gray-500 font-mono mt-0.5">
                            {course.code}
                        </div>
                    </div>
                </div>
                
                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-gray-800 w-full">
                    <div className="h-full bg-cyber-cyan shadow-[0_0_5px_rgba(6,182,212,0.8)]" style={{width: `${course.progress}%`}}></div>
                </div>
             </div>
         ))}
         
         {/* Invite Slot */}
         <div 
           onClick={() => setActiveModal('INVITE')}
           className="border border-dashed border-gray-700 bg-black/20 p-3 flex items-center justify-center text-gray-500 hover:text-cyber-cyan hover:border-cyber-cyan cursor-pointer transition-colors backdrop-blur-sm"
         >
             <span className="text-xs font-mono uppercase tracking-widest flex items-center font-bold">
                 <span className="text-lg mr-2">+</span> Decrypt Module
             </span>
         </div>
      </div>

    </div>
  );
};
