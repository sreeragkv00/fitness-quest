import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userAPI, workoutAPI, questAPI } from '../api/client';
import { FaFire, FaTrophy, FaDumbbell, FaChartLine } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const user = useSelector(state => state.auth.user);
  const [stats, setStats] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, workoutsRes, questsRes] = await Promise.all([
          userAPI.getStats(),
          workoutAPI.getAll({ limit: 5 }),
          questAPI.getDaily()
        ]);
        
        setStats(statsRes.data.data);
        setWorkouts(workoutsRes.data.data);
        setQuests(questsRes.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Welcome back, {user?.username}! 👋</h1>
          <p className="text-gray-600 mt-2">Keep grinding and level up your fitness game</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Level */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Current Level</p>
                <p className="text-3xl font-bold text-purple-600">{stats?.level}</p>
              </div>
              <FaTrophy className="text-4xl text-yellow-400" />
            </div>
          </div>

          {/* Streak */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Current Streak</p>
                <p className="text-3xl font-bold text-red-600">{stats?.streak}</p>
              </div>
              <FaFire className="text-4xl text-red-500" />
            </div>
          </div>

          {/* Total Workouts */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Workouts</p>
                <p className="text-3xl font-bold text-blue-600">{stats?.totalWorkouts}</p>
              </div>
              <FaDumbbell className="text-4xl text-blue-500" />
            </div>
          </div>

          {/* Total Minutes */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Minutes</p>
                <p className="text-3xl font-bold text-green-600">{stats?.totalMinutes}</p>
              </div>
              <FaChartLine className="text-4xl text-green-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Daily Quests */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📋 Daily Quests</h2>
            <div className="space-y-3">
              {quests.map(quest => (
                <div key={quest._id} className="border-l-4 border-purple-600 bg-purple-50 p-4 rounded">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900">{quest.title}</h3>
                      <p className="text-sm text-gray-600">
                        {quest.objective.target} {quest.objective.type}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        quest.difficulty === 'easy' ? 'bg-green-200 text-green-800' :
                        quest.difficulty === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-red-200 text-red-800'
                      }`}>
                        {quest.difficulty.toUpperCase()}
                      </span>
                      <p className="text-lg font-bold text-purple-600 mt-1">+{quest.reward.xp} XP</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Workouts */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">💪 Recent Workouts</h2>
            <div className="space-y-3">
              {workouts.slice(0, 5).map(workout => (
                <div key={workout._id} className="border-b pb-3">
                  <p className="font-semibold text-gray-900">{workout.name}</p>
                  <p className="text-sm text-gray-600">{workout.duration} min</p>
                  <p className="text-sm font-semibold text-blue-600">+{workout.xpEarned} XP</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
