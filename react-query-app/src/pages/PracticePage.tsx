import React from 'react';
import Layout from '../components/layout/Layout';
import TypingTutor from '../components/typing-tutor/TypingTutor';
import { PageTransition } from '../components/common';
import { useAudio } from '../hooks';

const PracticePage: React.FC = () => {
  const { isMuted, toggleMute } = useAudio();

  return (
    <Layout
      isMuted={isMuted}
      onToggleMute={toggleMute}
    >
      <PageTransition>
        <TypingTutor 
          gameMode="practice"
        />
      </PageTransition>
    </Layout>
  );
};

export default PracticePage; 