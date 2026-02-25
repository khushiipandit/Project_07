import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);

      alert("Login Successful 🚀");

      navigate("/dashboard");

    } catch(err) {
      alert("Login Failed ❌");
      console.log(err);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
      >
        <source src="/veg1.mp4" type="video/mp4" />
      </video>

      {/* LIGHT OVERLAY (same visibility as register page) */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* LOGIN CARD */}
      <div className="relative z-10
                      bg-white/20
                      backdrop-blur-xl
                      border border-white/30
                      p-8
                      rounded-2xl
                      shadow-2xl
                      w-96">

        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full
                       bg-white/30
                       text-white
                       placeholder-white/70
                       border border-white/40
                       p-2
                       rounded-md
                       focus:outline-none
                       focus:ring-2
                       focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full
                       bg-white/30
                       text-white
                       placeholder-white/70
                       border border-white/40
                       p-2
                       rounded-md
                       focus:outline-none
                       focus:ring-2
                       focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full
                       bg-blue-500/80
                       text-white
                       py-2
                       rounded-md
                       hover:bg-blue-600
                       transition
                       shadow-md">
            Login
          </button>

        </form>

        <p className="text-sm text-center mt-4 text-white/80">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-300 font-semibold hover:underline">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;