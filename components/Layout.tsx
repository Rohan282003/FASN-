
import React from 'react';
import { User, ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, currentView, onNavigate, onLogout }) => {
  return (
    <div className="relative w-screen h-screen bg-cyber-black text-cyber-text font-sans overflow-hidden">
      
      {/* Planar Neon Background */}
      <div className="absolute inset-0 z-0 bg-black">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,#000000_20%,#0f172a_100%)]"></div>
        
        {/* Neon Planes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-60" 
             style={{
               background: `
                 linear-gradient(135deg, transparent 0%, transparent 40%, rgba(6, 182, 212, 0.2) 40%, rgba(6, 182, 212, 0) 60%),
                 linear-gradient(225deg, transparent 0%, transparent 40%, rgba(34, 197, 94, 0.1) 40%, rgba(34, 197, 94, 0) 60%),
                 linear-gradient(0deg, transparent 0%, rgba(220, 38, 38, 0.05) 50%, transparent 100%)
               `,
               filter: 'contrast(1.2) brightness(1.2)'
             }}>
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-20" 
             style={{ 
               backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)', 
               backgroundSize: '40px 40px',
               perspective: '1000px',
               transform: 'scale(1.5) perspective(500px) rotateX(20deg)',
               transformOrigin: 'center 80%'
             }}>
        </div>
        
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/30 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-900/20 rounded-full blur-[100px]"></div>
      </div>

      {/* Main Content Area - Scrollable Container */}
      <main id="main-scroll-container" className="relative z-10 w-full h-full overflow-y-auto scroll-smooth">
        {children}
      </main>
    </div>
  );
};
