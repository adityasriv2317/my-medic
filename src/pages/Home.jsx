import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const Home = () => {
  useEffect(() => {
    document.title = "Home - MediConnect";
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-10">
      <Navbar />
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0">
        {/* Left Side - Text Content */}
        <motion.div
          className="text-center md:text-left max-w-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-green-700 leading-tight">
            Your Health, <span className="text-gray-800">Our Priority</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Get expert medical recommendations and instant checkups at your
            fingertips.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md transition hover:bg-green-700"
            >
              <Link to="/instant-checkup">Get Instant Checkup</Link>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-md transition hover:bg-gray-900"
            >
              <Link to="/video-call">Book a Video Call</Link>
            </motion.button>
          </div>
        </motion.div>

        {/* Right Side - Image Placeholder */}
        <motion.div
          className="w-full md:w-1/2 h-72 bg-gray-200 rounded-lg flex items-center justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          {/* Replace this div with your image */}
          <p className="text-gray-500">[ Image Placeholder ]</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
