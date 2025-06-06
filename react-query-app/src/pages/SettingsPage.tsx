import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BackgroundPattern } from '../components/typing-tutor/common/BackgroundPattern';
import { PageTransition } from '../components/common';
import { API_BASE_URL } from '../constants';

interface UserSettings {
  experienceLevel: string;
  preferredDifficulty: string;
  preferredKeyboardRow: string;
  soundEnabled: boolean;
  keyboardLayout: string;
  targetWPM: number;
  dailyGoalMinutes: number;
  theme: string;
}

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>({
    experienceLevel: 'beginner',
    preferredDifficulty: 'beginner',
    preferredKeyboardRow: 'all',
    soundEnabled: true,
    keyboardLayout: 'qwerty',
    targetWPM: 40,
    dailyGoalMinutes: 15,
    theme: 'light'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Add authorization header if token exists
      const token = localStorage.getItem('authToken');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      const response = await axios.get<UserSettings>(`${API_BASE_URL}/auth/settings`, { headers });
      setSettings(response.data);
    } catch (err: any) {
      console.error('Settings fetch error:', err);
      
      if (err.response?.status === 401) {
        setError('Authentication failed. Please log in again.');
      } else if (err.code === 'ECONNREFUSED' || err.message?.includes('Network Error')) {
        setError('Backend server is not running. Using default settings.');
      } else {
        setError(`Failed to load settings: ${err.response?.data?.message || err.message || 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSuccess(false);
      setError(null);
      
      // Add authorization header if token exists
      const token = localStorage.getItem('authToken');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      await axios.put(`${API_BASE_URL}/auth/settings`, settings, { headers });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error('Settings save error:', err);
      
      if (err.response?.status === 401) {
        setError('Authentication failed. Please log in again.');
      } else {
        setError(`Failed to save settings: ${err.response?.data?.message || err.message || 'Unknown error'}`);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof UserSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center">
        <PageTransition>
          <div className="text-gray-700 text-xl">Loading settings...</div>
        </PageTransition>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 relative -mt-4 px-8 pb-8">
      <BackgroundPattern />
      
      <PageTransition className="relative z-10 w-full max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 ring-1 ring-black/5">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-700 bg-clip-text text-transparent">
              Settings
            </h1>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div className="mb-4 p-4 bg-green-50/90 border border-green-200 rounded-lg text-green-800 shadow-lg">
              Settings saved successfully!
            </div>
          )}
          {error && (
            <div className="mb-4 p-4 bg-red-50/90 border border-red-200 rounded-lg text-red-800 shadow-lg">
              {error}
            </div>
          )}

          {/* Settings Sections */}
          <div className="space-y-8">
            {/* Experience & Difficulty */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 backdrop-blur-sm rounded-xl p-6 border border-white/40 shadow-lg ring-1 ring-black/5">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-700 bg-clip-text text-transparent mb-4">
                Experience & Difficulty
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-2">Experience Level</label>
                  <select
                    value={settings.experienceLevel}
                    onChange={(e) => handleChange('experienceLevel', e.target.value)}
                    className="w-full px-4 py-2 bg-white/80 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-2">Preferred Difficulty</label>
                  <select
                    value={settings.preferredDifficulty}
                    onChange={(e) => handleChange('preferredDifficulty', e.target.value)}
                    className="w-full px-4 py-2 bg-white/80 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-2">Preferred Keyboard Row</label>
                  <select
                    value={settings.preferredKeyboardRow}
                    onChange={(e) => handleChange('preferredKeyboardRow', e.target.value)}
                    className="w-full px-4 py-2 bg-white/80 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="home">Home Row</option>
                    <option value="upper">Upper Row</option>
                    <option value="lower">Lower Row</option>
                    <option value="all">All Rows</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Typing Goals */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 backdrop-blur-sm rounded-xl p-6 border border-white/40 shadow-lg ring-1 ring-black/5">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-700 bg-clip-text text-transparent mb-4">
                Typing Goals
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-2">Target WPM</label>
                  <input
                    type="number"
                    value={settings.targetWPM}
                    onChange={(e) => handleChange('targetWPM', parseInt(e.target.value) || 0)}
                    min="10"
                    max="200"
                    className="w-full px-4 py-2 bg-white/80 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-gray-500 text-xs mt-1">Your goal typing speed (10-200 WPM)</p>
                </div>

                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-2">Daily Practice Goal (minutes)</label>
                  <input
                    type="number"
                    value={settings.dailyGoalMinutes}
                    onChange={(e) => handleChange('dailyGoalMinutes', parseInt(e.target.value) || 0)}
                    min="5"
                    max="120"
                    className="w-full px-4 py-2 bg-white/80 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-gray-500 text-xs mt-1">Daily practice time goal (5-120 minutes)</p>
                </div>
              </div>
            </div>

            {/* App Preferences */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 backdrop-blur-sm rounded-xl p-6 border border-white/40 shadow-lg ring-1 ring-black/5">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-700 bg-clip-text text-transparent mb-4">
                App Preferences
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-2">Keyboard Layout</label>
                  <select
                    value={settings.keyboardLayout}
                    onChange={(e) => handleChange('keyboardLayout', e.target.value)}
                    className="w-full px-4 py-2 bg-white/80 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="qwerty">QWERTY</option>
                    <option value="dvorak">Dvorak</option>
                    <option value="colemak">Colemak</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-2">Theme</label>
                  <select
                    value={settings.theme}
                    onChange={(e) => handleChange('theme', e.target.value)}
                    className="w-full px-4 py-2 bg-white/80 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto (System)</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.soundEnabled}
                      onChange={(e) => handleChange('soundEnabled', e.target.checked)}
                      className="mr-3 w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="font-medium">Enable sound effects</span>
                  </label>
                  <p className="text-gray-500 text-xs mt-1 ml-8">Play sounds for keystrokes and achievements</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default SettingsPage;