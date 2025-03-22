import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";
import hero from "../assets/hero.jpg";
import ScrollToTopButton from "../components/ScrollToTopButton";
import Filler from "../components/Filler";
import Footer from "../components/Footer";
const Home = () => {
  useEffect(() => {
    document.title = "Home - MediConnect";
  }, []);

  return (
    <section className="relative min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Hero Section */}
      <div className="relative w-full h-screen flex">
        {/* Left Side - Content with Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
        <div className="absolute inset-0 flex items-center justify-center px-10 md:px-20 z-20">
          <motion.div
            className="text-white max-w-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-6xl font-bold [text-shadow:0px_0px_2px_black] leading-tight">
              Your Health, <span className="text-green-400">Our Priority</span>
            </h1>
            <p className="mt-4 text-lg text-gray-100 [text-shadow:0px_0px_2px_black]">
              Get expert medical recommendations and instant checkups at your
              fingertips.
            </p>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg transition hover:bg-green-600"
              >
                <Link to="/instant-checkup">Get Instant Checkup</Link>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg transition hover:bg-gray-800"
              >
                <Link to="/video-call">Book a Video Call</Link>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Image */}
        <motion.img
          src={hero}
          alt="Medical Consultation"
          className="w-full h-screen object-cover"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        />
      </div>

      <Filler />
      <Footer />
      <Chatbot />
      <ScrollToTopButton />
    </section>
  );
};

export default Home;
