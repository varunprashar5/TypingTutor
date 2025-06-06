import React from 'react';

export const GameStyles: React.FC = () => {
  return (
    <style>{`
      @keyframes burst {
        0% {
          transform: scale(1) translateZ(0);
          opacity: 1;
        }
        50% {
          transform: scale(1.4) translateZ(0);
          opacity: 0.8;
        }
        100% {
          transform: scale(1.8) translateZ(0);
          opacity: 0;
        }
      }
      
      @keyframes levelUpPulse {
        0% {
          transform: scale(0.8) translateX(-50%) translateY(-50%);
          opacity: 0;
        }
        50% {
          transform: scale(1.1) translateX(-50%) translateY(-50%);
          opacity: 1;
        }
        100% {
          transform: scale(1) translateX(-50%) translateY(-50%);
          opacity: 1;
        }
      }
      
      @keyframes dangerShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-2px); }
        75% { transform: translateX(2px); }
      }
      
      @keyframes dangerFlash {
        0%, 100% { background-color: rgba(239, 68, 68, 0.1); }
        50% { background-color: rgba(239, 68, 68, 0.3); }
      }
      
      @keyframes letterFloat {
        0% {
          transform: translateY(0px) rotate(0deg);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        50% {
          transform: translateY(-2px) rotate(1deg);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }
        100% {
          transform: translateY(0px) rotate(0deg);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
      }
      
      @keyframes scoreCountUp {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
      
      @keyframes successFlash {
        0% { 
          background-color: rgba(34, 197, 94, 0.2);
          border-color: rgba(34, 197, 94, 0.6);
        }
        100% { 
          background-color: transparent;
          border-color: rgba(34, 197, 94, 0.2);
        }
      }
    `}</style>
  );
}; 