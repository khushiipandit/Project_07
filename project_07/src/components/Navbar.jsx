import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-md">

      <h1 className="text-xl font-bold tracking-wide">
        PROJECT_07
      </h1>

      <div className="flex gap-8">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-400 font-semibold"
              : "hover:text-blue-400"
          }
        >
          Login
        </NavLink>

        <NavLink
          to="/register"
          className={({ isActive }) =>
            isActive
              ? "text-blue-400 font-semibold"
              : "hover:text-blue-400"
          }
        >
          Register
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "text-blue-400 font-semibold"
              : "hover:text-blue-400"
          }
        >
          Dashboard
        </NavLink>

      </div>
    </nav>
  );
}

export default Navbar;