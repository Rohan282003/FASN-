
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { CyberCard, CyberIcon } from './CyberComponents';

const dataPerformance = [
  { name: 'Stats', score: 85 },
  { name: 'Econ', score: 65 },
  { name: 'Strategy', score: 92 },
  { name: 'Mktg', score: 78 },
  { name: 'Ethics', score: 55 },
];

const dataSkills = [
  { subject: 'Quant', A: 120, fullMark: 150 },
  { subject: 'Verbal', A: 98, fullMark: 150 },
  { subject: 'Logic', A: 86, fullMark: 150 },
  { subject: 'Theory', A: 99, fullMark: 150 },
  { subject: 'Case', A: 85, fullMark: 150 },
  { subject: 'Pres', A: 65, fullMark: 150 },
];

const dataXP = [
  { day: 'Mon', xp: 4000 },
  { day: 'Tue', xp: 5200 },
  { day: 'Wed', xp: 4800 },
  { day: 'Thu', xp: 6100 },
  { day: 'Fri', xp: 5900 },
  { day: 'Sat', xp: 7200 },
  { day: 'Sun', xp: 8540 },
];

const dataStudyDist = [
  { name: 'Video', value: 400 },
  { name: 'Reading', value: 300 },
  { name: 'Quiz', value: 300 },
  { name: 'AI Tutor', value: 200 },
];

const COLORS = ['#00f3ff', '#bc13fe', '#ff00ff', '#fcee0a'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-cyber-black border border-cyber-cyan p-2 text-xs font-mono shadow-neon-cyan">
        <p className="text-white">{`${label ? label + ' : ' : ''}${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-6 pb-10">
      
      {/* HEADER LOGO */}
      <div className="flex items-center border-b border-gray-700 pb-4 mb-6 group">
        <div className="relative w-14 h-14 mr-5">
             <div className="absolute inset-0 bg-cyber-pink/20 rounded-lg transform rotate-6 group-hover:rotate-12 transition-transform"></div>
             <div className="absolute inset-0 border-2 border-cyber-pink rounded-lg transform -rotate-3 group-hover:-rotate-6 transition-transform shadow-neon-pink"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <CyberIcon name="stats" className="w-8 h-8 text-cyber-pink drop-shadow-[0_0_5px_rgba(217,70,239,0.8)]" />
             </div>
        </div>
        <div>
           <h2 className="text-4xl font-display font-black text-white uppercase tracking-wide relative">
             <span className="absolute -left-0.5 -top-0.5 text-cyber-pink opacity-50 blur-[1px]">STATS HQ</span>
             <span className="relative z-10">STATS <span className="text-cyber-pink">HQ</span></span>
           </h2>
           <p className="text-gray-400 text-xs font-mono tracking-wider">REAL-TIME PERFORMANCE VISUALIZATION</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart 1: Bar */}
        <CyberCard className="h-[350px]">
          <h3 className="text-lg font-bold text-cyber-cyan mb-4 font-display flex items-center">
            <CyberIcon name="chart" className="w-5 h-5 mr-2"/> Module Mastery
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={dataPerformance}>
              <XAxis dataKey="name" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255, 255, 255, 0.05)'}} />
              <Bar dataKey="score" fill="#00f3ff" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CyberCard>

        {/* Chart 2: Radar */}
        <CyberCard className="h-[350px]">
          <h3 className="text-lg font-bold text-cyber-pink mb-4 font-display flex items-center">
            <CyberIcon name="user" className="w-5 h-5 mr-2"/> Cognitive Profile
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataSkills}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
              <Radar
                name="Student"
                dataKey="A"
                stroke="#ff00ff"
                strokeWidth={2}
                fill="#ff00ff"
                fillOpacity={0.3}
              />
              <Legend wrapperStyle={{ color: '#fff', fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </CyberCard>

        {/* Chart 3: Line (XP History) */}
        <CyberCard className="h-[350px]">
           <h3 className="text-lg font-bold text-cyber-yellow mb-4 font-display flex items-center">
             <CyberIcon name="list" className="w-5 h-5 mr-2"/> XP Growth Trajectory
           </h3>
           <ResponsiveContainer width="100%" height="85%">
             <LineChart data={dataXP}>
               <XAxis dataKey="day" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false}/>
               <YAxis stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false}/>
               <Tooltip content={<CustomTooltip />} />
               <Line type="monotone" dataKey="xp" stroke="#fcee0a" strokeWidth={3} dot={{fill: '#fcee0a'}} />
             </LineChart>
           </ResponsiveContainer>
        </CyberCard>

        {/* Chart 4: Pie (Study Distribution) */}
        <CyberCard className="h-[350px]">
           <h3 className="text-lg font-bold text-cyber-purple mb-4 font-display flex items-center">
             <CyberIcon name="file" className="w-5 h-5 mr-2"/> Resource Allocation
           </h3>
           <ResponsiveContainer width="100%" height="85%">
             <PieChart>
               <Pie
                 data={dataStudyDist}
                 cx="50%"
                 cy="50%"
                 innerRadius={60}
                 outerRadius={80}
                 paddingAngle={5}
                 dataKey="value"
               >
                 {dataStudyDist.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                 ))}
               </Pie>
               <Tooltip content={<CustomTooltip />} />
               <Legend wrapperStyle={{ color: '#fff', fontSize: '12px' }}/>
             </PieChart>
           </ResponsiveContainer>
        </CyberCard>
      </div>

      <CyberCard>
        <h3 className="text-lg font-bold text-white mb-4 font-display border-b border-gray-700 pb-2">Recent Alerts</h3>
        <ul className="space-y-3 font-mono text-sm">
          <li className="flex items-center text-yellow-400">
            <span className="mr-3">⚠</span> Detected significant drop in Quantitative Engagement. Recommendation: Review Module 4.
          </li>
          <li className="flex items-center text-green-400">
            <span className="mr-3">✔</span> Mastery achieved in Corporate Ethics. Badge Unlocked: "The Saint".
          </li>
          <li className="flex items-center text-cyber-cyan">
            <span className="mr-3">ℹ</span> New assignment posted by Dr. Connor. Due: T-Minus 48 Hours.
          </li>
        </ul>
      </CyberCard>
    </div>
  );
};
