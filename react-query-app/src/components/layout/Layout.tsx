import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  isMuted,
  onToggleMute
}) => {
  const location = useLocation();
  const isTypingTutorPage = ['/practice', '/game', '/statistics', '/history', '/leaderboard'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex flex-col">
      <NavBar 
        {...(isTypingTutorPage && typeof isMuted === 'boolean' && onToggleMute ? {
          isMuted,
          onToggleMute,
          showModeSelector: true
        } : {
          showModeSelector: false
        })}
      />
      <div className={`flex-1 ${isTypingTutorPage ? "" : "pt-24"}`}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;