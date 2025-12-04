
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { FacultyDashboard } from './components/FacultyDashboard';
import { AITutor } from './components/AITutor';
import { Analytics } from './components/Analytics';
import { Quiz } from './components/Quiz';
import { CyberButton, CyberCard, CyberIcon } from './components/CyberComponents';
import { User, UserRole, ViewState, Course, QuizResult, Unit } from './types';
import { MOCK_STUDENT, MOCK_FACULTY } from './constants';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [quizMode, setQuizMode] = useState<boolean>(false);
  const [bootSequence, setBootSequence] = useState(0);
  const [isAIOpen, setIsAIOpen] = useState(false);
  
  // Login Inputs
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  // Simulating boot sequence for login screen
  useEffect(() => {
    if (!currentUser) {
      const interval = setInterval(() => {
        setBootSequence(prev => (prev < 100 ? prev + 2 : 100));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [currentUser]);

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView(ViewState.DASHBOARD);
    setBootSequence(0);
    setIsAIOpen(false);
    setLoginId('');
    setPassword('');
  };

  const handleUpdateUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
  };

  const handleStudentLogin = () => {
      // Validation removed for easy access
      setCurrentUser(MOCK_STUDENT);
  };

  const handleFacultyLogin = () => {
      // Validation removed for easy access
      setCurrentUser(MOCK_FACULTY);
  };

  // Scroll Helpers - Targeting the main container in Layout
  const handleScroll = (direction: 'up' | 'down') => {
    const container = document.getElementById('main-scroll-container');
    if (container) {
      container.scrollBy({ top: direction === 'up' ? -300 : 300, behavior: 'smooth' });
    }
  };

  const handleExportNotes = () => {
    if (!selectedUnit) return;
    const element = document.createElement("a");
    const file = new Blob([selectedUnit.notes], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${selectedUnit.title.replace(/\s+/g, '_')}_Notes.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Login Screen - Dark Theme
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-cyber-black overflow-hidden relative flex items-center justify-center font-mono text-cyber-text">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
             style={{ 
               backgroundImage: 'linear-gradient(0deg, transparent 24%, #06b6d4 25%, #06b6d4 26%, transparent 27%, transparent 74%, #06b6d4 75%, #06b6d4 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #06b6d4 25%, #06b6d4 26%, transparent 27%, transparent 74%, #06b6d4 75%, #06b6d4 76%, transparent 77%, transparent)',
               backgroundSize: '50px 50px',
               animation: 'pulse-fast 4s infinite linear'
             }}>
        </div>
        
        <div className="relative z-20 w-full max-w-lg p-1">
          {/* Main Login Window */}
          <div className="bg-black/80 border border-cyber-cyan shadow-neon-cyan backdrop-blur-xl p-8 relative overflow-hidden group rounded-lg">
            
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-2">
               <span className="text-[10px] text-cyber-cyan font-bold animate-pulse">SYSTEM_STATUS: ONLINE</span>
               <div className="flex space-x-1">
                 <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                 <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
               </div>
            </div>

            <div className="text-center mb-10">
              <h1 className="text-6xl font-display font-black text-white mb-2 tracking-tighter" style={{ textShadow: '2px 2px 0px rgba(6,182,212,0.8)' }}>
                FASN.SYS
              </h1>
              <p className="text-cyber-purple tracking-[0.5em] text-xs font-bold uppercase">Secure Neural Gateway v2.1</p>
            </div>

            {/* Boot Loader */}
            <div className="mb-8">
               <div className="flex justify-between text-[10px] text-gray-500 mb-1 font-mono uppercase">
                  <span>Establishing Handshake...</span>
                  <span>{bootSequence}%</span>
               </div>
               <div className="w-full h-1 bg-gray-800 overflow-hidden rounded-full">
                  <div className="h-full bg-cyber-cyan shadow-neon-cyan" style={{ width: `${bootSequence}%`, transition: 'width 0.1s linear' }}></div>
               </div>
            </div>

            {bootSequence === 100 ? (
               <div className="space-y-4 animate-fade-in-up">
                  
                  {/* Credentials Input */}
                  <div className="space-y-3 mb-6 bg-black/40 p-4 border border-gray-800 rounded">
                      <div className="group relative">
                        <label className="text-[10px] text-cyber-cyan font-mono tracking-widest uppercase mb-1 block">NEURAL IDENTITY (ID)</label>
                        <input 
                          type="text" 
                          value={loginId}
                          onChange={(e) => setLoginId(e.target.value)}
                          className="w-full bg-gray-900/50 border border-gray-700 text-cyber-text px-4 py-2 text-sm focus:border-cyber-cyan focus:outline-none focus:shadow-neon-cyan transition-all font-mono rounded"
                          placeholder="USR-2077-X"
                        />
                      </div>
                      <div className="group relative">
                        <label className="text-[10px] text-cyber-pink font-mono tracking-widest uppercase mb-1 block">ACCESS KEY</label>
                        <input 
                          type="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-gray-900/50 border border-gray-700 text-cyber-text px-4 py-2 text-sm focus:border-cyber-pink focus:outline-none focus:shadow-neon-pink transition-all font-mono rounded"
                          placeholder="••••••••"
                        />
                      </div>
                      {/* Hint for demo */}
                      <div className="text-[9px] text-gray-600 italic text-center">
                          Ready for Access. Credentials pre-verified for demo.
                      </div>
                  </div>

                  <button 
                    onClick={handleStudentLogin}
                    className="w-full group relative px-6 py-4 bg-cyber-cyan/10 border-2 border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-black transition-all duration-200 overflow-hidden shadow-neon-cyan rounded"
                  >
                    <span className="relative z-10 flex items-center justify-center font-display font-bold tracking-wider uppercase">
                      <CyberIcon name="user" className="w-4 h-4 mr-3" />
                      Initialize Student Protocol
                    </span>
                  </button>

                  <button 
                    onClick={handleFacultyLogin}
                    className="w-full group relative px-6 py-4 bg-transparent border-2 border-gray-700 text-gray-500 hover:border-cyber-pink hover:text-cyber-pink transition-all duration-200 rounded"
                  >
                    <span className="flex items-center justify-center font-mono text-xs uppercase tracking-widest font-bold">
                       Override: Faculty Access
                    </span>
                  </button>
               </div>
            ) : (
               <div className="h-24 flex items-center justify-center text-cyber-cyan font-mono text-xs animate-pulse">
                  DECRYPTING SECURE KEYS...
               </div>
            )}
            
            <div className="mt-8 pt-4 border-t border-gray-800 flex justify-between text-[8px] text-gray-600 font-mono uppercase">
               <span>ID: 8492-AE-39</span>
               <span>LOC: SERVER_ASIA_01</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    setSelectedCourse(null);
    setSelectedUnit(null);
    setQuizMode(false);
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setCurrentView(ViewState.COURSE_DETAIL);
  };

  const handleSelectUnit = (unit: Unit) => {
    setSelectedUnit(unit);
    setCurrentView(ViewState.UNIT_DETAIL);
  };

  const handleStartQuiz = () => {
    setQuizMode(true);
  };

  const handleQuizComplete = (result: QuizResult) => {
    if (selectedUnit) {
        selectedUnit.completed = true; 
    }
    alert(`Assessment Complete.\nScore: ${result.score}/${result.total}\nMastery: ${result.masteryLevel}\nXP Awarded: ${result.score * 100}`);
    setQuizMode(false);
    setCurrentView(ViewState.COURSE_DETAIL);
    setSelectedUnit(null);
  };

  const renderContent = () => {
    if (quizMode) {
      return (
        <Quiz 
          topic={selectedUnit ? selectedUnit.title : selectedCourse?.tags[0] || 'General'} 
          onComplete={handleQuizComplete} 
          onCancel={() => setQuizMode(false)}
        />
      );
    }

    switch (currentView) {
      case ViewState.DASHBOARD:
        // CONDITIONAL DASHBOARD RENDERING BASED ON ROLE
        if (currentUser?.role === UserRole.FACULTY) {
            return <FacultyDashboard user={currentUser} onLogout={handleLogout} />;
        }
        return (
          <Dashboard 
            user={currentUser} 
            onSelectCourse={handleSelectCourse} 
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            onUpdateUser={handleUpdateUser}
          />
        );
      
      case ViewState.AI_TUTOR:
          // In "Page Mode" if needed, but we use Widget mostly now
        return (
           <div className="h-full max-w-7xl mx-auto p-6 pt-20">
             <div className="flex items-center mb-6">
                <button 
                  onClick={() => setCurrentView(ViewState.DASHBOARD)} 
                  className="mr-4 group flex items-center justify-center px-4 py-2 border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-black transition-all bg-black/60 rounded-lg shadow-sm"
                >
                  <CyberIcon name="arrow-left" className="w-5 h-5 mr-2" />
                  <span className="font-bold">LOBBY</span>
                </button>
             </div>
             <AITutor user={currentUser} />
           </div>
        );
      
      case ViewState.ANALYTICS:
        return (
          <div className="h-full max-w-7xl mx-auto p-6 pt-20 pb-20">
             {/* Floating Scroll Buttons for Analytics */}
             <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-2 z-50">
               <button 
                 onClick={() => handleScroll('up')}
                 className="p-3 bg-black/80 border border-gray-600 rounded-full shadow-lg hover:bg-cyber-cyan hover:text-black transition-all text-white"
               >
                 <CyberIcon name="arrow-up" className="w-6 h-6" />
               </button>
               <button 
                 onClick={() => handleScroll('down')}
                 className="p-3 bg-black/80 border border-gray-600 rounded-full shadow-lg hover:bg-cyber-cyan hover:text-black transition-all text-white"
               >
                 <CyberIcon name="arrow-down" className="w-6 h-6" />
               </button>
             </div>

             <div className="flex items-center mb-6">
                <button 
                  onClick={() => setCurrentView(ViewState.DASHBOARD)} 
                  className="mr-4 group flex items-center justify-center px-4 py-2 border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-black transition-all bg-black/60 rounded-lg shadow-sm"
                >
                  <CyberIcon name="arrow-left" className="w-5 h-5 mr-2" />
                  <span className="font-bold">LOBBY</span>
                </button>
             </div>
             <Analytics />
          </div>
        );
      
      case ViewState.COURSE_DETAIL:
        if (!selectedCourse) return <Dashboard user={currentUser} onSelectCourse={handleSelectCourse} onNavigate={handleNavigate} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />;
        return (
          <div className="h-full max-w-7xl mx-auto p-6 pt-20 animate-fade-in pb-20">
             
             {/* Floating Scroll Buttons */}
             <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-2 z-50">
               <button 
                 onClick={() => handleScroll('up')}
                 className="p-3 bg-black/80 border border-gray-600 rounded-full shadow-lg hover:bg-cyber-cyan hover:text-black transition-all text-white"
               >
                 <CyberIcon name="arrow-up" className="w-6 h-6" />
               </button>
               <button 
                 onClick={() => handleScroll('down')}
                 className="p-3 bg-black/80 border border-gray-600 rounded-full shadow-lg hover:bg-cyber-cyan hover:text-black transition-all text-white"
               >
                 <CyberIcon name="arrow-down" className="w-6 h-6" />
               </button>
             </div>

             <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={() => setCurrentView(ViewState.DASHBOARD)}
                  className="flex items-center px-6 py-3 bg-black/60 border-2 border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-black font-mono text-sm uppercase tracking-widest transition-all rounded-lg shadow-md group font-bold"
                >
                  <CyberIcon name="arrow-left" className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Return to Lobby
                </button>
             </div>

             <div className="relative h-48 rounded-xl overflow-hidden border border-gray-700 shadow-xl group mb-8">
                <img src={selectedCourse.thumbnail} alt="Course" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full text-white">
                  <h1 className="text-4xl font-display font-bold uppercase tracking-wider drop-shadow-md text-white">{selectedCourse.title}</h1>
                  <p className="text-cyber-pink font-mono mt-2 flex items-center font-bold">
                    <span className="w-2 h-2 bg-cyber-pink rounded-full mr-2 animate-pulse"></span>
                    {selectedCourse.code} | INSTRUCTOR: {selectedCourse.instructor.toUpperCase()}
                  </p>
                </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* UNITS LIST */}
                  <CyberCard>
                    <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                       <h3 className="text-xl font-bold text-gray-100 font-display">LEARNING MODULES</h3>
                       <span className="text-[10px] text-cyber-cyan border border-cyber-cyan px-2 py-1 tracking-widest font-bold bg-cyber-cyan/10">5 UNITS LOADED</span>
                    </div>
                    <div className="space-y-3">
                      {selectedCourse.units && selectedCourse.units.map((unit, i) => (
                        <div 
                          key={unit.id} 
                          className={`flex items-center justify-between p-4 border transition-all cursor-pointer group rounded-lg ${
                            unit.completed ? 'bg-green-900/20 border-green-500/30' : 'bg-black/40 border-gray-700 hover:border-cyber-cyan hover:shadow-neon-cyan'
                          }`}
                          onClick={() => handleSelectUnit(unit)}
                        >
                          <div>
                              <div className="text-gray-500 font-mono text-xs mb-1 font-bold">UNIT 0{i+1}</div>
                              <div className="text-gray-200 font-bold text-sm group-hover:text-cyber-cyan">{unit.title}</div>
                              <div className="text-gray-400 text-xs mt-1 truncate max-w-md">{unit.description}</div>
                          </div>
                          <div className="flex items-center">
                             {unit.completed ? (
                               <CyberIcon name="check" className="w-6 h-6 text-green-500" />
                             ) : (
                               <CyberIcon name="play" className="w-5 h-5 text-gray-500 group-hover:text-cyber-cyan" />
                             )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CyberCard>
                </div>

                <div className="space-y-6">
                   <CyberCard className="text-center border-yellow-600/50 bg-yellow-900/10">
                      <h3 className="text-lg font-bold text-yellow-500 mb-4 font-display">COMBAT SIMULATION</h3>
                      <p className="text-xs text-gray-400 mb-6 font-mono">
                        Global adaptive assessment.
                      </p>
                      <CyberButton onClick={handleStartQuiz} className="w-full justify-center shadow-lg bg-yellow-600/80 text-white border-none hover:bg-yellow-500">
                        INITIALIZE GLOBAL QUIZ
                      </CyberButton>
                   </CyberCard>
                </div>
             </div>
          </div>
        );

      case ViewState.UNIT_DETAIL:
        if (!selectedUnit) return null;
        return (
            <div className="h-full max-w-7xl mx-auto p-6 pt-20 animate-fade-in flex flex-col pb-20">
                <div className="flex justify-between items-center mb-4">
                    <button 
                    onClick={() => {
                        if(!selectedUnit.completed) {
                            if(!window.confirm("WARNING: Assessment incomplete. Progress will not be saved. Abort?")) return;
                        }
                        setCurrentView(ViewState.COURSE_DETAIL);
                    }}
                    className="flex items-center px-4 py-2 border border-red-900 text-red-500 hover:bg-red-900 hover:text-white font-mono text-sm uppercase tracking-widest transition-all bg-black/60 rounded-lg shadow-sm font-bold"
                    >
                    <CyberIcon name="arrow-left" className="w-4 h-4 mr-2" />
                    ABORT / EXIT UNIT
                    </button>
                    <h2 className="text-xl font-display text-cyber-cyan font-bold">{selectedUnit.title}</h2>
                </div>

                {/* Main Content Area - Responsive Flex for Shorts Style */}
                <div className="flex flex-col lg:flex-row gap-6 flex-1">
                    
                    {/* VIDEO AREA - Vertical 'Shorts' Style Container */}
                    <div className="lg:w-[400px] flex-shrink-0 mx-auto lg:mx-0 w-full">
                        <div className="w-full aspect-[9/16] bg-black border-4 border-gray-800 shadow-2xl relative group rounded-2xl overflow-hidden ring-1 ring-cyber-cyan/30">
                            <div className="absolute top-4 right-4 z-10 text-xs bg-red-600 text-white px-2 py-1 rounded-full font-bold flex items-center shadow-lg">
                                <CyberIcon name="shorts" className="w-3 h-3 mr-1" />
                                LIVE SHORTS
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>
                            <iframe 
                                className="w-full h-full object-cover"
                                src={selectedUnit.videoUrl} 
                                title="Unit Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="text-center mt-2 text-xs text-gray-500 font-mono">
                            VERTICAL FEED ENABLED 🎥
                        </div>
                    </div>

                    {/* RIGHT COLUMN: NOTES & ACTION */}
                    <div className="flex-1 flex flex-col space-y-6">
                        {/* NOTES AREA */}
                        <CyberCard className="flex-1 flex flex-col">
                            <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                                <h3 className="text-lg font-bold text-gray-200 font-display flex items-center">
                                    <CyberIcon name="file" className="w-5 h-5 mr-2 text-cyber-pink"/> DECRYPTED NOTES 📝
                                </h3>
                                <button 
                                  onClick={handleExportNotes}
                                  className="text-xs flex items-center bg-gray-800 hover:bg-cyber-cyan hover:text-black text-gray-300 px-3 py-1.5 rounded transition-colors font-mono font-bold"
                                >
                                  <CyberIcon name="file" className="w-3 h-3 mr-1" />
                                  💾 EXPORT DATA
                                </button>
                            </div>
                            <div className="font-mono text-sm text-green-400 leading-relaxed overflow-y-auto h-full min-h-[200px] custom-scrollbar p-3 bg-black/50 rounded border border-gray-800 shadow-inner">
                                {selectedUnit.notes}
                                <br/><br/>
                                <p className="text-gray-500 italic">[End of file. Neural sync complete.]</p>
                            </div>
                        </CyberCard>

                        {/* ACTION AREA */}
                        <CyberCard className="border-yellow-600/50 bg-yellow-900/10">
                            <h4 className="text-yellow-500 font-display text-lg mb-2 font-bold flex items-center">
                                ASSESSMENT REQUIRED 📝
                            </h4>
                            <p className="text-xs text-gray-400 mb-6">Verification required to mark unit as complete and unlock next node.</p>
                            <CyberButton onClick={handleStartQuiz} className="w-full justify-center shadow-md bg-yellow-600 text-white border-none hover:bg-yellow-500">
                                <CyberIcon name="check" className="w-4 h-4 mr-2"/> TAKE ASSESSMENT
                            </CyberButton>
                        </CyberCard>
                    </div>
                </div>
            </div>
        );

      default:
        return <Dashboard user={currentUser} onSelectCourse={handleSelectCourse} onNavigate={handleNavigate} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />;
    }
  };

  return (
    <Layout 
      user={currentUser} 
      currentView={currentView} 
      onNavigate={handleNavigate}
      onLogout={handleLogout}
    >
      {renderContent()}

      {/* Persistent Floating AI Agent (Widget) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Chat Widget Pop-up */}
        <div className={`
             mb-4 w-80 sm:w-96 transition-all duration-300 origin-bottom-right shadow-[0_0_50px_rgba(6,182,212,0.4)]
             ${isAIOpen ? 'opacity-100 scale-100 translate-y-0 h-[500px]' : 'opacity-0 scale-90 translate-y-10 h-0 pointer-events-none overflow-hidden'}
        `}>
           <div className="h-full bg-black/90 backdrop-blur-xl border border-cyber-cyan/50 rounded-lg overflow-hidden flex flex-col shadow-2xl">
              <AITutor user={currentUser!} variant="widget" onClose={() => setIsAIOpen(false)} />
           </div>
        </div>

        {/* Floating Trigger Button */}
        {currentUser && (
           <button 
             onClick={() => setIsAIOpen(!isAIOpen)}
             className={`
               w-16 h-16 rounded-full flex items-center justify-center 
               border-2 shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all duration-300 group relative
               ${isAIOpen ? 'bg-cyber-cyan border-white rotate-90' : 'bg-black/80 border-cyber-cyan hover:scale-110 hover:shadow-[0_0_30px_rgba(217,70,239,0.8)]'}
             `}
           >
              {isAIOpen ? (
                  <CyberIcon name="close" className="w-8 h-8 text-black" />
              ) : (
                  <>
                     <div className="absolute inset-0 rounded-full border border-cyber-cyan animate-ping opacity-20"></div>
                     <span className="text-2xl mr-1">🤖</span>
                  </>
              )}
           </button>
        )}
      </div>
    </Layout>
  );
};

export default App;
