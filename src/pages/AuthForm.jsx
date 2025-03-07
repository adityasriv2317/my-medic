import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-green-900">
      {/* Back Button */}
      <Link to="/" className="absolute top-6 left-16 bg-green-900 rounded-md border p-2 text-white flex items-center space-x-2 hover:opacity-80 transition">
        <ArrowLeft size={24} />
        <span>Back</span>
      </Link>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex w-[900px] h-[450px] shadow-2xl rounded-lg overflow-hidden"
      >
        {/* Left Side (Image & Text) */}
        <div className="w-1/2 bg-gradient-to-br from-green-500 to-green-700 text-white flex flex-col justify-center items-center p-10">
          <h2 className="text-3xl font-bold mb-2">{isLogin ? "Welcome Back!" : "Join Us Today!"}</h2>
          <p className="text-lg">{isLogin ? "Login to continue" : "Sign up and get started"}</p>
        </div>
        
        {/* Right Side (Auth Form) */}
        <div className="w-1/2 bg-white p-10">
          <h2 className="text-2xl font-bold mb-6">{isLogin ? "Login" : "Sign Up"}</h2>
          <form>
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg" required />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input type="email" className="w-full px-4 py-2 border rounded-lg" required />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Password</label>
              <input type="password" className="w-full px-4 py-2 border rounded-lg" required />
            </div>
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          <p className="mt-4 text-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"} 
            <button 
              className="text-green-600 font-bold ml-1 hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
