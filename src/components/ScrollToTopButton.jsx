import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpIcon } from "lucide-react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Check scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className={`fixed bottom-5 md:bottom-6.5 right-5 bg-green-600 text-white p-3 rounded-full shadow-lg transition-all ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <ArrowUpIcon className="h-4 w-4 md:h-6 md:w-6" />
    </motion.button>
  );
};

export default ScrollToTopButton;