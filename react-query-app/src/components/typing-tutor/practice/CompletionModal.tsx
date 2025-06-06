import React, { useEffect } from 'react';
import { CONFETTI_COLORS, ANIMATION_DURATIONS, CONFETTI_PARTICLE_COUNT } from '../../../constants';
import { formatTime } from '../../../utils/timeUtils';
import { useSessionSaver } from '../../../hooks/common/useSessionSaver';
import type { CompletionModalProps, ConfettiParticleProps, StatCardProps, StatsGridProps } from '../../../types';
import type { SessionDTO } from '../../../types/api';

/**
 * Component for individual confetti particles
 */
const ConfettiParticle: React.FC<ConfettiParticleProps> = ({ index }) => {
  const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
  const animationDelay = `${Math.random() * ANIMATION_DURATIONS.CONFETTI_FALL}s`;
  const rotation = `${Math.random() * 360}deg`;
  const leftPosition = `${Math.random() * 100}%`;

  return (
    <div
      key={index}
      className="absolute w-2 h-2 opacity-80"
      style={{
        left: leftPosition,
        backgroundColor: color,
        animation: `confetti-fall ${ANIMATION_DURATIONS.CONFETTI_FALL}s linear forwards`,
        animationDelay: animationDelay,
        transform: `rotate(${rotation})`
      }}
    />
  );
};

/**
 * Component for rendering confetti animation
 */
const ConfettiAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(CONFETTI_PARTICLE_COUNT)].map((_, i) => (
        <ConfettiParticle key={i} index={i} />
      ))}
    </div>
  );
};

/**
 * Component for individual stat cards in the modal
 */
const StatCard: React.FC<StatCardProps> = ({ value, label, gradientFrom, gradientTo: _gradientTo }) => {
  return (
    <div className={`bg-gradient-to-br from-${gradientFrom}-50 to-${gradientFrom}-100 rounded-2xl p-4`}>
      <div className={`text-2xl font-bold text-${gradientFrom}-600`}>{value}</div>
      <div className={`text-sm text-${gradientFrom}-500`}>{label}</div>
    </div>
  );
};

/**
 * Component for rendering the statistics grid
 */
const StatsGrid: React.FC<StatsGridProps> = ({ finalStats }) => {
  const statsConfig = [
    {
      id: 'wpm',
      value: finalStats.wpm,
      label: 'WPM',
      gradientColor: 'blue'
    },
    {
      id: 'accuracy',
      value: `${finalStats.accuracy}%`,
      label: 'Accuracy',
      gradientColor: 'purple'
    },
    {
      id: 'time',
      value: formatTime(finalStats.time),
      label: 'Time',
      gradientColor: 'green'
    },
    {
      id: 'words',
      value: finalStats.totalWords,
      label: 'Words',
      gradientColor: 'orange'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      {statsConfig.map((stat) => (
        <StatCard
          key={stat.id}
          value={stat.value}
          label={stat.label}
          gradientFrom={stat.gradientColor}
          gradientTo={stat.gradientColor}
        />
      ))}
    </div>
  );
};

/**
 * Modal styles component
 */
const ModalStyles: React.FC = () => {
  return (
    <style>{`
      @keyframes confetti-fall {
        0% {
          transform: translateY(-100vh) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
      
      @keyframes pulse-once {
        0% {
          transform: scale(0.8);
          opacity: 0;
        }
        50% {
          transform: scale(1.05);
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      
      @keyframes bounce-once {
        0%, 20%, 53%, 80%, 100% {
          transform: translate3d(0,0,0);
        }
        40%, 43% {
          transform: translate3d(0,-15px,0);
        }
        70% {
          transform: translate3d(0,-7px,0);
        }
        90% {
          transform: translate3d(0,-2px,0);
        }
      }
      
      .animate-pulse-once {
        animation: pulse-once 0.6s ease-out;
      }
      
      .animate-bounce-once {
        animation: bounce-once 1s ease-out;
      }
    `}</style>
  );
};

/**
 * CompletionModal component for displaying final statistics
 */
const CompletionModal: React.FC<CompletionModalProps> = ({ 
  isVisible, 
  finalStats, 
  onRestart, 
  sampleText = '',
  sampleTextId,
  userInput = '',
  difficulty 
}) => {
  const { saveSession } = useSessionSaver();

  useEffect(() => {
    if (isVisible && finalStats && sampleText) {
      // Save the session when modal becomes visible
      const sessionData: SessionDTO = {
        text: sampleText,
        userInput: userInput,
        wpm: finalStats.wpm,
        accuracy: finalStats.accuracy,
        duration: Math.round(finalStats.time / 1000), // Convert milliseconds to seconds
        totalCharacters: finalStats.totalKeyPresses,
        correctCharacters: finalStats.correctKeyPresses,
        incorrectCharacters: finalStats.totalKeyPresses - finalStats.correctKeyPresses,
        sessionType: 'practice',
        difficulty: (difficulty || 'intermediate') as SessionDTO['difficulty'],
      };
      
      saveSession(sessionData);
    }
  }, [isVisible, finalStats, sampleText, userInput, sampleTextId, difficulty, saveSession]);

  if (!isVisible || !finalStats) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <ConfettiAnimation />
      
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 max-w-md w-full mx-4 transform animate-pulse-once relative z-10">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce-once">🎉</div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Congratulations!
          </h2>
          <p className="text-gray-600 mb-8">You've completed the typing test!</p>
          
          <StatsGrid finalStats={finalStats} />
          
          <button
            onClick={onRestart}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 
                       text-white font-bold py-3 px-8 rounded-xl shadow-lg 
                       transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl
                       focus:outline-none focus:ring-2 focus:ring-green-300/50 active:scale-95 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </button>
        </div>
      </div>
      
      <ModalStyles />
    </div>
  );
};

export default CompletionModal; 