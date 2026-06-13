import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaDumbbell, FaTrophy, FaUsers, FaApple, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">🏆 Fitness Quest</div>
          
          <div className="flex gap-6 items-center">
            <a href="/dashboard" className="flex items-center gap-2 hover:text-yellow-300 transition">
              <FaHome /> Dashboard
            </a>
            <a href="/workouts" className="flex items-center gap-2 hover:text-yellow-300 transition">
              <FaDumbbell /> Workouts
            </a>
            <a href="/achievements" className="flex items-center gap-2 hover:text-yellow-300 transition">
              <FaTrophy /> Achievements
            </a>
            <a href="/guilds" className="flex items-center gap-2 hover:text-yellow-300 transition">
              <FaUsers /> Guilds
            </a>
            <a href="/nutrition" className="flex items-center gap-2 hover:text-yellow-300 transition">
              <FaApple /> Nutrition
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
