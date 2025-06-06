import React from 'react';
import Layout from '../components/layout/Layout';
import { StatsDashboard } from '../components/typing-tutor/common';
import { PageTransition } from '../components/common';
import { useAudio } from '../hooks';

const StatisticsPage: React.FC = () => {
  const { isMuted, toggleMute } = useAudio();

  return (
    <Layout
      isMuted={isMuted}
      onToggleMute={toggleMute}
    >
      <div className="min-h-full bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
        <PageTransition animation="slide-in-bottom" className="container mx-auto px-4 py-8 max-w-7xl">
          <StatsDashboard />
        </PageTransition>
      </div>
    </Layout>
  );
};

export default StatisticsPage; 