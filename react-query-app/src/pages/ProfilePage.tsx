import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BackgroundPattern } from '../components/typing-tutor/common/BackgroundPattern';
import { PageTransition } from '../components/common';
import { API_BASE_URL } from '../constants';

interface UserStats {
  totalSessions: number;
  totalMinutes: number;
  averageWPM: number;
  averageAccuracy: number;
  bestWPM: number;
  currentStreak: number;
  longestStreak: number;
  lastSessionDate: string | null;
}

interface UserProfile {
  id: string;
  username: string;
  email: string;
  fullName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
  stats?: UserStats;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    fullName: '',
    bio: '',
    avatarUrl: ''
  });

  // Fallback profile data for demo purposes
  const fallbackProfile: UserProfile = {
    id: 'demo-user',
    username: 'demo_user',
    email: 'demo@example.com',
    fullName: 'Demo User',
    bio: 'This is a demo profile while the backend is not available.',
    avatarUrl: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    stats: {
      totalSessions: 0,
      totalMinutes: 0,
      averageWPM: 0,
      averageAccuracy: 0,
      bestWPM: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastSessionDate: null
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Add authorization header if token exists
      const token = localStorage.getItem('authToken');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      const response = await axios.get<UserProfile>(`${API_BASE_URL}/auth/profile`, { headers });
      setProfile(response.data);
      setEditForm({
        fullName: response.data.fullName || '',
        bio: response.data.bio || '',
        avatarUrl: response.data.avatarUrl || ''
      });
    } catch (err: any) {
      console.error('Profile fetch error:', err);
      
      if (err.response?.status === 401) {
        setError('Authentication failed. Please log in again.');
      } else if (err.code === 'ECONNREFUSED' || err.message?.includes('Network Error')) {
        setError('Backend server is not running. Using demo profile.');
        setProfile(fallbackProfile);
        setEditForm({
          fullName: fallbackProfile.fullName || '',
          bio: fallbackProfile.bio || '',
          avatarUrl: fallbackProfile.avatarUrl || ''
        });
      } else {
        setError(`Failed to load profile: ${err.response?.data?.message || err.message || 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setError(null);
      
      // Add authorization header if token exists
      const token = localStorage.getItem('authToken');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      // Prepare the data, converting empty strings to null for optional fields
      const profileData = {
        fullName: editForm.fullName.trim() || null,
        bio: editForm.bio.trim() || null,
        avatarUrl: editForm.avatarUrl.trim() || null,
      };
      
      const response = await axios.put<UserProfile>(`${API_BASE_URL}/auth/profile`, profileData, { headers });
      setProfile(response.data);
      setIsEditing(false);
    } catch (err: any) {
      console.error('Profile update error:', err);
      
      if (err.response?.status === 401) {
        setError('Authentication failed. Please log in again.');
      } else {
        setError(`Failed to update profile: ${err.response?.data?.message || err.message || 'Unknown error'}`);
      }
    }
  };

  const handleCancel = () => {
    setEditForm({
      fullName: profile?.fullName || '',
      bio: profile?.bio || '',
      avatarUrl: profile?.avatarUrl || ''
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center">
        <PageTransition>
          <div className="text-gray-700 text-xl">Loading profile...</div>
        </PageTransition>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center p-8">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 ring-1 ring-black/5 max-w-md w-full text-center">
          <div className="text-red-600 text-xl mb-4">⚠️ Profile Error</div>
          <div className="text-gray-600 mb-6">{error}</div>
          <button
            onClick={fetchProfile}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 relative -mt-4 px-8 pb-8">
      <BackgroundPattern />
      
      <PageTransition className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Error Banner */}
        {error && profile && (
          <div className="mb-6 bg-yellow-50/90 backdrop-blur-md border border-yellow-200 rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="text-yellow-600 text-xl">⚠️</div>
              <div className="text-yellow-800">{error}</div>
            </div>
          </div>
        )}
        
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 ring-1 ring-black/5">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-700 bg-clip-text text-transparent">
              Profile
            </h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-2">Username</label>
                <div className="text-gray-900 text-lg font-semibold">{profile?.username}</div>
              </div>

              <div>
                <label className="block text-gray-600 text-sm font-medium mb-2">Email</label>
                <div className="text-gray-900 text-lg">{profile?.email}</div>
              </div>

              <div>
                <label className="block text-gray-600 text-sm font-medium mb-2">Full Name (Optional)</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.fullName}
                    onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                    className="w-full px-4 py-2 bg-white/80 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name (optional)"
                  />
                ) : (
                  <div className="text-gray-900 text-lg">{profile?.fullName || 'Not set'}</div>
                )}
              </div>

              <div>
                <label className="block text-gray-600 text-sm font-medium mb-2">Avatar URL (Optional)</label>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      value={editForm.avatarUrl}
                      onChange={(e) => setEditForm({ ...editForm, avatarUrl: e.target.value })}
                      className="w-full px-4 py-2 bg-white/80 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/avatar.jpg (optional)"
                    />
                    <p className="text-gray-500 text-xs mt-1">Leave empty if you don't have an avatar URL</p>
                  </div>
                ) : (
                  <div className="text-gray-900 text-lg truncate">{profile?.avatarUrl || 'Not set'}</div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-medium mb-2">Bio (Optional)</label>
              {isEditing ? (
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="w-full h-32 px-4 py-2 bg-white/80 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Tell us about yourself (optional)"
                />
              ) : (
                <div className="text-gray-900 text-lg">{profile?.bio || 'No bio yet'}</div>
              )}
            </div>
          </div>

          {/* Statistics */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-700 bg-clip-text text-transparent mb-6">
              Typing Statistics
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 backdrop-blur-sm rounded-xl shadow-lg border border-white/40 p-4 ring-1 ring-black/5">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  {profile?.stats?.totalSessions || 0}
                </div>
                <div className="text-gray-600 text-sm mt-1 font-medium">Total Sessions</div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 backdrop-blur-sm rounded-xl shadow-lg border border-white/40 p-4 ring-1 ring-black/5">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  {profile?.stats?.averageWPM || 0}
                </div>
                <div className="text-gray-600 text-sm mt-1 font-medium">Average WPM</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 backdrop-blur-sm rounded-xl shadow-lg border border-white/40 p-4 ring-1 ring-black/5">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  {profile?.stats?.averageAccuracy || 0}%
                </div>
                <div className="text-gray-600 text-sm mt-1 font-medium">Average Accuracy</div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 backdrop-blur-sm rounded-xl shadow-lg border border-white/40 p-4 ring-1 ring-black/5">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                  {profile?.stats?.bestWPM || 0}
                </div>
                <div className="text-gray-600 text-sm mt-1 font-medium">Best WPM</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 backdrop-blur-sm rounded-xl shadow-lg border border-white/40 p-4 ring-1 ring-black/5">
                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                  {profile?.stats?.currentStreak || 0}
                </div>
                <div className="text-gray-600 text-sm mt-1 font-medium">Current Streak</div>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100 backdrop-blur-sm rounded-xl shadow-lg border border-white/40 p-4 ring-1 ring-black/5">
                <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent">
                  {profile?.stats?.longestStreak || 0}
                </div>
                <div className="text-gray-600 text-sm mt-1 font-medium">Longest Streak</div>
              </div>

              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 backdrop-blur-sm rounded-xl shadow-lg border border-white/40 p-4 ring-1 ring-black/5">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-800 bg-clip-text text-transparent">
                  {profile?.stats?.totalMinutes || 0}
                </div>
                <div className="text-gray-600 text-sm mt-1 font-medium">Total Minutes</div>
              </div>
            </div>
          </div>

          {/* Member Since */}
          <div className="mt-8 text-center text-gray-500">
            Member since {new Date(profile?.createdAt || '').toLocaleDateString()}
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default ProfilePage;