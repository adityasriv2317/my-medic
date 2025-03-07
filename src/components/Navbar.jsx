import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { WebContext } from "../Data/WebContext";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useContext(WebContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] md:w-[90%] bg-green-800 text-white shadow-lg py-3 px-6 rounded-2xl z-50"
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full"></div>
          <Link to="/" className="text-xl md:text-2xl font-bold text-white">
            MediConnect
          </Link>
        </div>

        {/* Desktop & Tablet Navigation */}
        <ul className="hidden md:flex space-x-4 lg:space-x-6 text-base lg:text-lg">
          {[
            "Home",
            "Find a Doctor",
            "Medicines",
            "Appointments",
          ].map((item, index) => (
            <li key={index}>
              <Link
                to={`/${item.toLowerCase().replace(/\s+/g, "")}`}
                className="relative px-3 py-2 transition duration-300 hover:bg-white/20 rounded-md"
              >
                {item}
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Account Section (Desktop & Tablet) */}
        <div className="hidden md:block">
          {user ? (
            <motion.div className="group relative" whileHover={{ scale: 1.05 }}>
              <button className="bg-white text-green-800 px-4 py-2 rounded-lg">
                {user.name}
              </button>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <p className="p-2">{user.email}</p>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Logout
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/auth">
                <button className="bg-white hover:bg-gray-300 text-green-800 px-4 py-2 rounded-lg">
                  Login
                </button>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </motion.button>
      </div>

      {/* Mobile Navigation Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={
          isOpen ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }
        }
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`md:hidden overflow-hidden ${isOpen ? "mt-4" : ""}`}
      >
        <ul className="flex flex-col space-y-4 text-lg text-center">
          {[
            "Home",
            "Find a Doctor",
            "Medicines",
            "Appointments"
          ].map((item, index) => (
            <li key={index}>
              <Link
                to={`/${item.toLowerCase().replace(/\s+/g, "")}`}
                className="px-3 py-2 hover:bg-white/10 rounded-md transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            </li>
          ))}
          <li>
            {user ? (
              <motion.button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="bg-white text-green-800 px-4 py-2 rounded-lg w-full"
                whileHover={{ scale: 1.05 }}
              >
                Logout
              </motion.button>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <button className="bg-white text-green-800 px-4 py-2 rounded-lg w-full">
                    Login
                  </button>
                </Link>
              </motion.div>
            )}
          </li>
        </ul>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
