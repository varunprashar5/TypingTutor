import React from 'react';
import Layout from '../components/layout/Layout';
import Leaderboard from '../components/leaderboard/Leaderboard';
import { PageTransition } from '../components/common';
import { useAudio } from '../hooks';

const LeaderboardPage: React.FC = () => {
  const { isMuted, toggleMute } = useAudio();

  return (
    <Layout
      isMuted={isMuted}
      onToggleMute={toggleMute}
    >
      <PageTransition>
        <Leaderboard />
      </PageTransition>
    </Layout>
  );
};

export default LeaderboardPage;