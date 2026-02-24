function Topbar() {
  return (
    <div className="ml-64 bg-white border-b border-gray-200 p-5 flex justify-between items-center shadow-sm">

      <h2 className="text-xl font-semibold text-gray-800">
        Welcome back 👋
      </h2>

      <div className="flex items-center gap-4">

        <div className="w-9 h-9 bg-blue-100 border border-blue-400 rounded-full flex items-center justify-center text-blue-600 font-semibold">
          K
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition">
          Logout
        </button>

      </div>

    </div>
  );
}

export default Topbar;