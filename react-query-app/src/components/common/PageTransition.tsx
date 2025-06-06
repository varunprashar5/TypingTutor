import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-in-up' | 'fade-in' | 'slide-in-bottom';
}

/**
 * PageTransition component that provides consistent fade-in animations for pages
 * Similar to the animations used in the Statistics Dashboard
 */
export const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className = '',
  delay = 0,
  animation = 'fade-in-up'
}) => {
  const delayClass = delay > 0 ? `delay-${delay}` : '';
  const animationClass = `animate-${animation}`;
  
  return (
    <div className={`${animationClass} ${delayClass} ${className}`}>
      {children}
    </div>
  );
};

export default PageTransition; 