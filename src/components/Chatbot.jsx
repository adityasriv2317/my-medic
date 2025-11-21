import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaRobot, FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { WebContext } from "../Data/WebContext";

const botApi = "https://medibot-1-z9sn.onrender.com/medical-chat";

const Chatbot = () => {
  const { user } = useContext(WebContext);
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Handle scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    const chatContainer = document.getElementById("chat-messages");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(botApi, {
        message: message
      });
      console.log("Chatbot response:", response.data.response);

      const botMessage = {
        sender: "bot",
        text: response.data.response,
        expanded: false,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Error fetching response. Please try again.",
          expanded: false,
        },
      ]);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleExpand = (index) => {
    setMessages((prev) =>
      prev.map((msg, i) =>
        i === index ? { ...msg, expanded: !msg.expanded } : msg
      )
    );
  };

  // Calculate button position based on scroll
  const buttonPosition = scrollPosition > 300 ? "right-16 sm:right-20" : "right-4 sm:right-6";

  return (
    <div className={`fixed bottom-4 sm:bottom-6 ${buttonPosition} z-50 transition-all duration-300`}>
      {!chatOpen && (
        <motion.button
          onClick={() => setChatOpen(true)}
          className="bg-green-600 hover:bg-green-700 transition-all duration-300 text-white cursor-pointer p-3 sm:p-3.5 rounded-xl shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaRobot className="text-xl sm:text-2xl" />
        </motion.button>
      )}

      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          >
            <div className="bg-white w-full max-w-[95%] sm:max-w-[85%] md:max-w-lg h-[90vh] sm:h-[85vh] md:h-[80vh] rounded-xl shadow-2xl flex flex-col overflow-hidden">
              {/* Header */}
              <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 bg-gradient-to-r from-green-800 to-green-700">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <FaRobot className="text-white text-lg sm:text-xl" />
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-white">AI Assistant</h4>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  {!user && (
                    <>
                      <Link to="/auth?type=login" className="hidden sm:block">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-1.5 text-sm bg-white text-green-800 rounded-lg hover:bg-gray-100 transition-colors font-medium shadow-sm"
                        >
                          Login
                        </motion.button>
                      </Link>
                      <Link to="/auth?type=signup" className="hidden sm:block">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-1.5 text-sm bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors border border-white/30"
                        >
                          Sign up
                        </motion.button>
                      </Link>
                    </>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setChatOpen(false)}
                    className="text-white bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <FaTimes className="text-lg sm:text-xl" />
                  </motion.button>
                </div>
              </div>

              {/* Messages */}
              <div
                id="chat-messages"
                className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent bg-gray-50"
              >
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 rounded-xl shadow-sm ${
                        msg.sender === "user"
                          ? "bg-green-700 text-white"
                          : "bg-white text-gray-800 border-1.5 border-gray-100"
                      }`}
                    >
                      {msg.sender === "bot" && msg.text.length > 300 ? (
                        <div className="space-y-2">
                          <p className="text-sm sm:text-base leading-relaxed">
                            {msg.expanded ? msg.text : `${msg.text.slice(0, 300)}...`}
                          </p>
                          <button
                            onClick={() => toggleExpand(index)}
                            className="text-green-600 hover:text-green-700 text-xs sm:text-sm font-medium"
                          >
                            {msg.expanded ? "Show Less" : "Read More"}
                          </button>
                        </div>
                      ) : (
                        <p className="text-sm sm:text-base leading-relaxed">{msg.text}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <div className="flex items-center space-x-0.5 text-gray-400 bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100 max-w-[50%] sm:max-w-[60%]">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-current animate-bounce" />
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-current animate-bounce delay-100" />
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-current animate-bounce delay-200" />
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-3 sm:p-4 border-t border-gray-100 bg-white">
                <div className="relative bg-gray-50 rounded-xl shadow-sm border border-gray-200 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500/20 transition-all">
                  <textarea
                    rows="1"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 bg-transparent focus:outline-none resize-none text-sm sm:text-base text-gray-800 placeholder-gray-400"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-green-600 hover:text-green-700 p-1.5 sm:p-2 rounded-lg transition-colors"
                  >
                    <FaPaperPlane className="text-lg sm:text-xl" />
                  </motion.button>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-2 text-center">Press Enter to send, Shift + Enter for new line</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
