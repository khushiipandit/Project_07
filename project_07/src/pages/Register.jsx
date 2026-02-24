import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          Register
        </h2>

        <form className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-2 rounded-md"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded-md"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded-md"
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
          >
            Register
          </button>

        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;