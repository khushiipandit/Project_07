function Topbar({ setActiveSection }) {
  return (
    <div className="bg-gradient-to-r from-blue-200 to-indigo-200 border-b border-gray-200 p-5 flex justify-between items-center shadow-sm">

      <h2 className="text-xl font-semibold text-gray-800">
        Welcome back 👋
      </h2>

      <div className="flex items-center gap-4">

        <button
          onClick={() => setActiveSection("profile")}
          className="w-9 h-9 bg-blue-100 border border-blue-400 rounded-full flex items-center justify-center text-blue-600 font-semibold hover:bg-blue-200 transition cursor-pointer"
        >
          K
        </button>

      </div>

    </div>
  );
}

export default Topbar;