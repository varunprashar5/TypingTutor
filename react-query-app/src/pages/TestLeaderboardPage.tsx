import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PageTransition } from '../components/common';

const TestLeaderboardPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testLeaderboard = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/leaderboard', {
        params: {
          period: 'daily',
          category: 'overall'
        }
      });
      setData(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch leaderboard');
      console.error('Leaderboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testLeaderboard();
  }, []);

  return (
    <PageTransition className="p-8">
      <h1 className="text-2xl font-bold mb-4">Leaderboard Test</h1>
      
      {loading && <p>Loading...</p>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      )}
      
      {data && (
        <div className="bg-gray-100 p-4 rounded">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
      
      <button
        onClick={testLeaderboard}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Refresh Leaderboard
      </button>
    </PageTransition>
  );
};

export default TestLeaderboardPage;