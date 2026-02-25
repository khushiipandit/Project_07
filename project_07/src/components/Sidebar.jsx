import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ setActiveSection }) {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    // Clear all data from localStorage
    localStorage.clear();
    // Navigate to login
    navigate("/");
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const baseStyle =
    "block w-full text-left px-4 py-3 rounded-lg transform transition-all duration-200 bg-white/10 border border-gray-300 text-gray-800 hover:border-blue-400 hover:bg-blue-500/10 hover:text-blue-700 hover:scale-105 hover:shadow-md";

  return (
    <div className="w-64 bg-gradient-to-b from-blue-200 via-blue-100 to-indigo-200 text-gray-800 p-6 border-r border-gray-300">

      <h1 
        className="text-2xl font-bold text-blue-700 mb-12 tracking-wide cursor-pointer hover:text-blue-800 transition-colors"
        onClick={handleLogoClick}
      >
        PROJECT_07
      </h1>

      <nav className="space-y-4 text-sm">

        {/* Overview */}
        <button
          onClick={() => setActiveSection("overview")}
          className={baseStyle}
        >
          Overview
        </button>

        {/* Tasks */}
        <button
          onClick={() => setActiveSection("tasks")}
          className={baseStyle}
        >
          Tasks
        </button>

        {/* Profile */}
        <button
          onClick={() => setActiveSection("profile")}
          className={baseStyle}
        >
          Profile
        </button>

        {/* Logout */}
        <div className="relative">
          <button
            onClick={handleLogoutClick}
            className={baseStyle}
          >
            Logout
          </button>
          {showLogoutConfirm && (
            <div className="mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-3">
              <p className="text-sm text-gray-700 mb-3">Are you sure you want to log out?</p>
              <div className="flex gap-2">
                <button
                  onClick={confirmLogout}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                  Yes, Logout
                </button>
                <button
                  onClick={cancelLogout}
                  className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

      </nav>
    </div>
  );
}

export default Sidebar;