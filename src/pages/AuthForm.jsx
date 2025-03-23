import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { WebContext } from "../Data/WebContext";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup } = useContext(WebContext);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Set initial form type based on URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const formType = params.get("type");
    setIsLogin(formType !== "signup");
  }, [location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const authFunction = isLogin ? login : signup;
      const response = await authFunction(formData);

      if (response.success) {
        navigate("/");
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-800 to-green-900 flex items-center justify-center p-2 sm:p-4">
      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-3 py-1.5 sm:px-4 sm:py-2 text-white flex items-center space-x-2 hover:bg-white/20 transition-colors"
      >
        <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base font-medium">Back</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-[95%] sm:max-w-[85%] md:max-w-[900px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Side (Image & Text) - Hidden on very small screens */}
        <div className="hidden sm:flex w-full md:w-1/2 bg-gradient-to-br from-green-600 to-green-700 text-white p-6 sm:p-8 md:p-12 flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid grid-cols-3 gap-4">
              <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-white/10 rounded-2xl flex items-center justify-center mb-6 sm:mb-8">
                <span className="text-3xl sm:text-4xl md:text-5xl">🛡️</span>
              </div>
              <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-white/10 rounded-2xl flex items-center justify-center mb-6 sm:mb-8">
                <span className="text-3xl sm:text-4xl md:text-5xl">👨‍⚕️</span>
              </div>
              <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-white/10 rounded-2xl flex items-center justify-center mb-6 sm:mb-8">
                <span className="text-3xl sm:text-4xl md:text-5xl">💪</span>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              {isLogin ? "Welcome Back!" : "Join My Medic"}
            </h2>
            <p className="text-base sm:text-lg text-white/90">
              {isLogin
                ? "Access your healthcare dashboard and connect with professionals."
                : "Create an account to get started with personalized healthcare services."}
            </p>
          </motion.div>
        </div>

        {/* Right Side (Auth Form) */}
        <div className="w-full md:w-1/2 p-4 sm:p-8 md:p-12 bg-white">
          <motion.div
            key={isLogin ? "login" : "signup"}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Mobile-only welcome text */}
            <div className="sm:hidden text-center mb-6">
              <h1 className="text-xl font-bold text-gray-800">
                {isLogin ? "Welcome Back!" : "Join My Medic"}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {isLogin
                  ? "Sign in to your account"
                  : "Create your account today"}
              </p>
            </div>

            <h2 className="hidden sm:block text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8">
              {isLogin ? "Login to Your Account" : "Create Your Account"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors"
                    placeholder="Null Name"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-2.5 sm:p-3 rounded-lg bg-red-50 text-red-600 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2 sm:py-2.5 rounded-xl text-sm sm:text-base font-medium
                  ${
                    loading
                      ? "opacity-80 cursor-not-allowed"
                      : "hover:from-green-700 hover:to-green-800"
                  } 
                  transition-all duration-300 relative overflow-hidden`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-white animate-bounce" />
                    <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-white animate-bounce delay-100" />
                    <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-white animate-bounce delay-200" />
                  </div>
                ) : isLogin ? (
                  "Login"
                ) : (
                  "Create Account"
                )}
              </motion.button>
            </form>

            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-sm sm:text-base text-gray-600">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <button
                  onClick={toggleMode}
                  className="ml-2 text-green-600 font-medium hover:text-green-700 transition-colors"
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>
            </div>

            {/* Test Account Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-100"
            >
              <p className="text-xs sm:text-sm text-gray-500">
                <strong>Test Account:</strong> test@example.com / password
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
