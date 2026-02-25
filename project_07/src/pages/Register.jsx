import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover opacity-70"
      >
        <source src="/veg2.mp4" type="video/mp4" />
      </video>

      {/* LIGHT OVERLAY (lighter than login page) */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* REGISTER CARD - GLASS EFFECT */}
      <div className="relative z-10
                      bg-white/20
                      backdrop-blur-xl
                      border border-white/30
                      p-8
                      rounded-2xl
                      shadow-2xl
                      w-96">

        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Register
        </h2>

        <form className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full
                       bg-white/30
                       text-white
                       placeholder-white/70
                       border border-white/40
                       p-2
                       rounded-md
                       focus:outline-none
                       focus:ring-2
                       focus:ring-green-400"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full
                       bg-white/30
                       text-white
                       placeholder-white/70
                       border border-white/40
                       p-2
                       rounded-md
                       focus:outline-none
                       focus:ring-2
                       focus:ring-green-400"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full
                       bg-white/30
                       text-white
                       placeholder-white/70
                       border border-white/40
                       p-2
                       rounded-md
                       focus:outline-none
                       focus:ring-2
                       focus:ring-green-400"
          />

          <button
            type="submit"
            className="w-full
                       bg-green-500/90
                       text-white
                       py-2
                       rounded-md
                       hover:bg-green-600
                       transition
                       shadow-md">
            Register
          </button>

        </form>

        <p className="text-sm text-center mt-4 text-white/80">
          Already have an account?{" "}
          <Link to="/" className="text-green-300 font-semibold hover:underline">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;