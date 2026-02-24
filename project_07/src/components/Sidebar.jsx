import React from "react";

function Sidebar({ setActiveSection }) {

  const handleLogout = () => {
    console.log("Logout clicked");
    // later:
    // clear token
    // navigate to login
  };

  const baseStyle =
    "block w-full text-left px-4 py-3 rounded-lg transform transition-all duration-200 bg-white/10 border border-transparent text-gray-800 hover:border-blue-400 hover:bg-blue-500/10 hover:text-blue-700 hover:scale-105 hover:shadow-md";

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-blue-200 via-blue-100 to-indigo-200 text-gray-800 p-6 fixed border-r border-gray-300">

      <h1 className="text-2xl font-bold text-blue-700 mb-12 tracking-wide">
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
        <button
          onClick={handleLogout}
          className={baseStyle}
        >
          Logout
        </button>

      </nav>
    </div>
  );
}

export default Sidebar;