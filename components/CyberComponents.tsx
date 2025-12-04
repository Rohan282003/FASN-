
import React from 'react';

// --- ICONS ---
export const CyberIcon: React.FC<{ name: string; className?: string }> = ({ name, className = "w-6 h-6" }) => {
  const icons: Record<string, React.ReactNode> = {
    chart: <path d="M3 3v18h18 M18 17V9 M13 17V5 M8 17v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>,
    list: <path d="M9 6h12M9 12h12M9 18h12M5 6v.01M5 12v.01M5 18v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>,
    calendar: <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>,
    cart: <circle cx="9" cy="21" r="1" fill="currentColor"/><circle cx="20" cy="21" r="1" fill="currentColor"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>,
    chat: <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>,
    play: <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/>,
    user: <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>,
    settings: <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2" fill="none"/>,
    power: <path d="M18.36 6.64a9 9 0 1 1-12.73 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/><line x1="12" y1="2" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
    robot: <rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M12 7v4" stroke="currentColor" strokeWidth="2"/><line x1="8" y1="16" x2="8" y2="16" stroke="currentColor" strokeWidth="2"/><line x1="16" y1="16" x2="16" y2="16" stroke="currentColor" strokeWidth="2"/>,
    stats: <path d="M12 20V10" stroke="currentColor" strokeWidth="2"/><path d="M18 20V4" stroke="currentColor" strokeWidth="2"/><path d="M6 20v-4" stroke="currentColor" strokeWidth="2"/>,
    book: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2" fill="none"/>,
    file: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" fill="none"/><polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" fill="none"/>,
    check: <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="2" fill="none"/>,
    close: <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2"/><line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2"/>,
    lock: <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" fill="none"/>,
    unlock: <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M7 11V7a5 5 0 0 1 9.9-1" stroke="currentColor" strokeWidth="2" fill="none"/>,
    video: <polygon points="23 7 16 12 23 17 23 7" stroke="currentColor" strokeWidth="2" fill="none"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>,
    'arrow-left': <line x1="19" y1="12" x2="5" y2="12" stroke="currentColor" strokeWidth="2"/><polyline points="12 19 5 12 12 5" stroke="currentColor" strokeWidth="2" fill="none"/>,
    send: <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" strokeWidth="2"/><polygon points="22 2 15 22 11 13 2 9 22 2" stroke="currentColor" strokeWidth="2" fill="none"/>,
    'arrow-up': <line x1="12" y1="19" x2="12" y2="5" stroke="currentColor" strokeWidth="2"/><polyline points="5 12 12 5 19 12" stroke="currentColor" strokeWidth="2" fill="none"/>,
    'arrow-down': <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2"/><polyline points="19 12 12 19 5 12" stroke="currentColor" strokeWidth="2" fill="none"/>,
    mic: <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" strokeWidth="2" fill="none"/><line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/><line x1="8" y1="23" x2="16" y2="23" stroke="currentColor" strokeWidth="2"/>,
    paperclip: <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    image: <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><polyline points="21 15 16 10 5 21" stroke="currentColor" strokeWidth="2" fill="none"/>,
    volume: <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="2" fill="none"/>,
    bell: <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" fill="none"/>,
    eye: <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" fill="none"/>,
    upload: <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" fill="none"/><polyline points="17 8 12 3 7 8" stroke="currentColor" strokeWidth="2" fill="none"/><line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="2"/>,
    shorts: <path d="M17.77 10.32l-1.2-.5L18 9.06a3.74 3.74 0 0 0-3.5-5.33 3.91 3.91 0 0 0-2 1l-6 3.45a3.74 3.74 0 0 0 .91 6.88l1.2.5-1.45.76a3.74 3.74 0 0 0 3.5 5.33 3.81 3.81 0 0 0 2-1l6-3.44a3.74 3.74 0 0 0-.89-6.89zM8.5 13.91l6-3.44-6-3.44z" fill="currentColor"/>
  };

  return <svg viewBox="0 0 24 24" className={className}>{icons[name] || null}</svg>;
};


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
}

export const CyberButton: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "relative px-6 py-2 font-display uppercase tracking-widest transition-all duration-200 clip-path-slant group disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center";
  
  const variants = {
    primary: "bg-cyber-cyan text-black hover:bg-white hover:text-cyber-cyan hover:shadow-neon-cyan border border-transparent shadow-md",
    secondary: "bg-transparent border border-cyber-pink text-cyber-pink hover:bg-cyber-pink/10 hover:shadow-neon-pink",
    danger: "bg-red-900/50 text-red-200 border border-red-600 hover:bg-red-600 hover:text-white hover:shadow-[0_0_10px_rgba(220,38,38,0.5)]",
    ghost: "bg-black/50 border border-gray-600 text-gray-400 hover:border-cyber-cyan hover:text-cyber-cyan hover:bg-cyber-cyan/10"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-current opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current opacity-50"></div>
    </button>
  );
};

export const CyberIconButton: React.FC<ButtonProps & { icon: string; label?: string }> = ({ icon, label, className = '', ...props }) => {
  return (
    <button 
      className={`group relative flex flex-col items-center justify-center p-3 bg-black/60 backdrop-blur-sm border border-gray-700 hover:border-cyber-cyan hover:bg-cyber-cyan/10 transition-all duration-200 shadow-sm ${className}`}
      {...props}
    >
      <div className="text-gray-400 group-hover:text-cyber-cyan transition-colors">
        <CyberIcon name={icon} />
      </div>
      {label && <span className="text-[10px] uppercase mt-1 font-mono text-gray-500 group-hover:text-cyber-cyan font-bold">{label}</span>}
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-gray-600 group-hover:border-cyber-cyan"></div>
      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-gray-600 group-hover:border-cyber-cyan"></div>
    </button>
  );
}

export const CyberSquareButton: React.FC<ButtonProps & { icon?: React.ReactNode; label?: string; value?: string }> = ({ icon, label, value, className = '', ...props }) => {
  return (
    <button 
      className={`relative flex flex-col items-center justify-center w-28 h-20 bg-black/60 backdrop-blur-md border border-gray-700 hover:bg-cyber-cyan/20 hover:border-cyber-cyan hover:shadow-neon-cyan transition-all duration-300 skew-x-[-10deg] group shadow-lg ${className}`}
      {...props}
    >
      <div className="skew-x-[10deg] flex flex-col items-center">
        {icon && <div className="mb-1 text-cyber-cyan group-hover:scale-110 transition-transform group-hover:text-white">{icon}</div>}
        {value && <div className="text-lg font-display font-bold text-gray-200 leading-none group-hover:text-white">{value}</div>}
        {label && <div className="text-[9px] font-mono uppercase tracking-widest text-gray-500 mt-1 group-hover:text-cyber-cyan">{label}</div>}
      </div>
      
      {/* Tech decoration */}
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </button>
  );
}

export const CyberCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`relative bg-black/60 border border-gray-800 backdrop-blur-md p-6 shadow-xl ${className}`}>
      {children}
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-cyan"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyber-cyan"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyber-cyan"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-cyan"></div>
    </div>
  );
};

export const CyberBadge: React.FC<{ label: string; color?: 'cyan' | 'pink' | 'purple' }> = ({ label, color = 'cyan' }) => {
  const colors = {
    cyan: 'border-cyber-cyan text-cyber-cyan bg-cyber-cyan/10',
    pink: 'border-cyber-pink text-cyber-pink bg-cyber-pink/10',
    purple: 'border-cyber-purple text-cyber-purple bg-cyber-purple/10',
  };

  return (
    <span className={`px-2 py-0.5 text-xs font-mono border ${colors[color]} uppercase tracking-wider font-bold`}>
      {label}
    </span>
  );
};
