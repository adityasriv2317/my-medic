import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WebContext } from "../data/WebContext";
import { Menu, X, LogOut, User, UserPlus, Home, Search, Pill, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logout, loading } = useContext(WebContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Find a Doctor", icon: Search, path: "/findadoctor" },
    { name: "Medicines", icon: Pill, path: "/medicines" },
    { name: "Appointments", icon: Calendar, path: "/appointments" },
  ];

  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] md:w-[90%] bg-gradient-to-r from-green-800 to-green-700 text-white shadow-xl py-3 px-4 sm:px-6 rounded-2xl z-50 backdrop-blur-sm border border-white/10"
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 sm:space-x-3 hover:bg-white/10 transition-colors pr-3 rounded-r-full rounded-l-full group">
          <div className="w-8 sm:w-10 h-8 sm:h-10 bg-white/10 group-hover:bg-white/20 rounded-full transition-colors flex items-center justify-center">
            <img src="/ico.png" alt="MediConnect" className="object-cover" />
          </div>
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
            MediConnect
          </span>
        </Link>

        {/* Desktop & Tablet Navigation */}
        <ul className="hidden md:flex space-x-4 lg:space-x-4 text-base lg:text-lg">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="relative px-3 py-2 transition duration-300 hover:bg-white/10 rounded-lg group flex items-center space-x-2"
              >
                <item.icon size={18} className="opacity-80" />
                <span>{item.name}</span>
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Account Section (Desktop & Tablet) */}
        <div className="hidden md:flex items-center space-x-3">
          {loading ? (
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-xl">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200" />
            </div>
          ) : user ? (
            <div className="relative">
              <motion.button
                onClick={() => setShowDropdown(!showDropdown)}
                className="bg-white/10 text-white px-4 py-2 rounded-xl font-medium hover:bg-white/20 transition-colors flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-6 h-6 rounded-full"
                />
                <span>{user.name}</span>
              </motion.button>
              
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-xl rounded-xl border border-gray-100"
                  >
                    <div className="p-3 border-b border-gray-100">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-b-xl flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/auth?type=login">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-2 text-sm bg-white text-green-800 rounded-xl hover:bg-gray-100 transition-colors font-medium shadow-lg flex items-center space-x-2"
                >
                  <User size={16} />
                  <span>Login</span>
                </motion.button>
              </Link>
              <Link to="/auth?type=signup">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-2 text-sm bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-colors font-medium border border-white/30 flex items-center space-x-2"
                >
                  <UserPlus size={16} />
                  <span>Sign up</span>
                </motion.button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-white bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden mt-4"
          >
            <ul className="flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-white/10 rounded-xl transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon size={18} className="opacity-80" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
              
              {/* Mobile Auth Section */}
              {loading ? (
                <li className="px-4 py-3 flex justify-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200" />
                  </div>
                </li>
              ) : user ? (
                <li className="pt-3 mt-2 border-t border-white/10">
                  <div className="px-4 py-2 bg-white/5 rounded-xl flex items-center space-x-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-300">{user.email}</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full mt-2 text-red-500 px-4 py-2 rounded-xl font-medium hover:bg-white/10 transition-colors flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.01 }}
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </motion.button>
                </li>
              ) : (
                <li className="pt-3 mt-2 border-t border-white/10 space-y-2">
                  <Link 
                    to="/auth?type=login" 
                    onClick={() => setIsOpen(false)} 
                    className="block"
                  >
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      className="w-full bg-white text-green-800 px-4 py-2 rounded-xl font-medium hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center space-x-2"
                    >
                      <User size={18} />
                      <span>Login</span>
                    </motion.button>
                  </Link>
                  <Link 
                    to="/auth?type=signup" 
                    onClick={() => setIsOpen(false)} 
                    className="block"
                  >
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      className="w-full bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-xl hover:bg-white/20 transition-colors border border-white/30 flex items-center justify-center space-x-2"
                    >
                      <UserPlus size={18} />
                      <span>Sign up</span>
                    </motion.button>
                  </Link>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;