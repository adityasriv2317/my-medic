import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WebContext } from "../Data/WebContext";
import {
  Menu,
  X,
  LogOut,
  User,
  UserPlus,
  Home,
  Search,
  UserPen,
  Pill,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logout, loading } = useContext(WebContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Find a Doctor", icon: Search, path: "/medics" },
    { name: "Medicines", icon: Pill, path: "/medicines" },
    { name: "Appointments", icon: Calendar, path: "/appointments" },
  ];

  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
    navigate("/");
  };

  return (
    // Update the nav container classes
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 sm:top-4 left-0 sm:left-1/2 transform sm:-translate-x-1/2 w-full sm:w-[95%] lg:w-[90%] bg-gradient-to-r from-green-800 to-green-700 text-white shadow-xl py-2 sm:py-3 px-3 sm:px-6 sm:rounded-2xl z-50 backdrop-blur-sm border-b sm:border border-white/10"
    >
      {/* Update the container spacing */}
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Update Logo responsiveness */}
        <Link
          to="/"
          className="flex items-center space-x-2 hover:bg-white/10 transition-colors px-2 sm:px-3 py-1 rounded-full group"
        >
          <div className="w-7 sm:w-8 md:w-10 h-7 sm:h-8 md:h-10 bg-white/10 group-hover:bg-white/20 rounded-full transition-colors flex items-center justify-center">
            <img src="/ico.png" alt="My Medic" className="w-5 sm:w-6 md:w-7" />
          </div>
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
            My Medic
          </span>
        </Link>

        {/* Update Desktop Navigation spacing */}
        <ul className="hidden md:flex space-x-2 lg:space-x-4 text-sm lg:text-base">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="relative px-2 lg:px-3 py-2 transition duration-300 hover:bg-white/10 rounded-lg group flex items-center space-x-1.5 lg:space-x-2"
              >
                <item.icon size={16} className="opacity-80" />
                <span>{item.name}</span>
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Update Account Section spacing */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
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
                className="bg-white/10 text-white px-3 lg:px-4 py-1.5 lg:py-2 rounded-xl font-medium hover:bg-white/20 transition-colors flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-5 sm:w-6 h-5 sm:h-6 rounded-full"
                />
                <span className="text-sm lg:text-base">{user.name}</span>
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
                    {/* profile page button */}
                    <motion.button className="w-full text-left px-4 py-3 text-sm text-green-700 hover:bg-green-50 transition-colors flex items-center space-x-2">
                      <UserPen size={16} />
                      <Link to="/profile">Profile</Link>
                    </motion.button>
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
                  className="px-3 lg:px-4 py-1.5 lg:py-2 text-sm bg-white text-green-800 rounded-xl hover:bg-gray-100 transition-colors font-medium shadow-lg flex items-center space-x-1.5"
                >
                  <User size={14} />
                  <span>Login</span>
                </motion.button>
              </Link>
              <Link to="/auth?type=signup">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-3 lg:px-4 py-1.5 lg:py-2 text-sm bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-colors font-medium border border-white/30 flex items-center space-x-1.5"
                >
                  <UserPlus size={14} />
                  <span>Sign up</span>
                </motion.button>
              </Link>
            </>
          )}
        </div>

        {/* Update Mobile Menu Button */}
        <motion.button
          className="md:hidden text-white bg-white/10 p-1.5 rounded-lg hover:bg-white/20 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      {/* Update Mobile Menu spacing */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden mt-2 mx-auto max-w-lg"
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
                  {/* profile page link */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-white/10 flex flex-row items-center gap-6 text-white px-6 py-3 my-2 rounded-lg hover:bg-white/20 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <UserPen size={18} />
                    <Link to="/profile" className="text-left">
                      Profile
                    </Link>
                  </motion.div>
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
