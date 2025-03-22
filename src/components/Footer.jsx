import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Find a Doctor", path: "/findadoctor" },
    { name: "Book Appointment", path: "/appointments" },
    { name: "Our Services", path: "/services" },
    { name: "Latest News", path: "/news" },
  ];

  const supportLinks = [
    { name: "Help Center", path: "/help" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Contact Us", path: "/contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com" },
    { icon: Twitter, href: "https://twitter.com" },
    { icon: Instagram, href: "https://instagram.com" },
    { icon: Linkedin, href: "https://linkedin.com" },
  ];

  const contactInfo = [
    {
      icon: Phone,
      text: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: Mail,
      text: "support@mediconnect.com",
      href: "mailto:support@mediconnect.com",
    },
    {
      icon: MapPin,
      text: "123 Healthcare Ave, Medical District, NY 10001",
      href: "https://maps.google.com",
    },
  ];

  return (
    <footer className="bg-gradient-to-b w-full from-gray-900 to-gray-950 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4 sm:space-y-6">
            <Link to="/" className="inline-flex items-center space-x-3 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 group-hover:bg-white/20 rounded-xl transition-colors flex items-center justify-center">
                <img
                  src="/ico.png"
                  alt="MediConnect"
                  className="w-6 h-6 sm:w-8 sm:h-8 object-cover"
                />
              </div>
              <span className="text-lg sm:text-xl font-bold text-white">MediConnect</span>
            </Link>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-md">
              Transforming healthcare through technology. We connect patients
              with the best healthcare professionals for a better, healthier
              future.
            </p>
            <div className="flex items-center space-x-3 sm:space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 sm:w-8 sm:h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="sm:pl-4 lg:pl-0">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-xs sm:text-sm hover:text-white transition-colors hover:underline decoration-green-500 underline-offset-4"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="sm:pl-4 lg:pl-0">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Support</h3>
            <ul className="space-y-2 sm:space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-xs sm:text-sm hover:text-white transition-colors hover:underline decoration-green-500 underline-offset-4"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:pl-4 lg:pl-0">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index}>
                  <a
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start space-x-2 sm:space-x-3 group"
                  >
                    <info.icon
                      size={16}
                      className="mt-0.5 text-gray-400 group-hover:text-white transition-colors sm:w-[18px] sm:h-[18px]"
                    />
                    <span className="text-xs sm:text-sm group-hover:text-white transition-colors">
                      {info.text}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-gray-800">
          <div className="max-w-2xl mx-auto text-center px-4">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6">
              Stay updated with the latest healthcare news and updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 md:gap-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-3 sm:px-4 py-2 sm:py-2.5 bg-white/5 border border-gray-800 not-md:rounded-xl md:rounded-l-xl focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-white placeholder-gray-500 text-xs sm:text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 sm:px-6 py-2 sm:py-2.5 bg-green-600 hover:bg-green-700 text-white not-md:rounded-xl md:rounded-r-xl font-medium transition-colors text-xs sm:text-sm"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4 sm:py-6">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
            © {new Date().getFullYear()} MediConnect. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-gray-400 flex items-center space-x-1 sm:space-x-2 sm:mr-14">
            <span>Made with</span>
            <Heart size={14} className="text-red-500 fill-current sm:w-4 sm:h-4" />
            <span>by Team HeisenBugs</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
