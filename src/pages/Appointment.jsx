import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { WebContext } from "../data/WebContext";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  IndianRupee,
  ArrowLeft,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import ToastBox from "../components/ToastBox";

const Appointment = () => {
  const { user, loading } = useContext(WebContext);
  const navigate = useNavigate();
  const location = useLocation();
  const hasShownToast = useRef(false);
  const doctor = location.state?.doctor;

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    date: "",
    time: "",
    reason: "",
    notes: "",
  });

  useEffect(() => {
    if (!loading && !user && !hasShownToast.current) {
      hasShownToast.current = true;
      toast(<ToastBox message="Please login to continue!" />, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,
        className: "sm:top-right",
        style: {
          width: "100%",
          maxWidth: "100%",
          margin: "0 auto",
          "@media (min-width: 640px)": {
            width: "auto",
            maxWidth: "400px",
            margin: "0",
          },
        },
      });
      navigate("/auth?type=login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!doctor) {
      navigate("/medics");
    }
  }, [doctor, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/payment", {
      state: {
        doctor,
        appointmentData: formData,
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-100" />
          <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-200" />
        </div>
      </div>
    );
  }

  if (!user || !doctor) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/medics")}
            className="flex items-center text-green-600 hover:text-green-700 mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Doctors
          </button>

          <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-green-100">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-16 h-16 rounded-full border-2 border-green-200"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Book Appointment with {doctor.name}
                </h1>
                <p className="text-green-600 font-medium">
                  {doctor.specialization}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={16} className="mr-2 text-green-500" />
                  {doctor.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock size={16} className="mr-2 text-green-500" />
                  {doctor.availability}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone size={16} className="mr-2 text-green-500" />
                  {doctor.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail size={16} className="mr-2 text-green-500" />
                  {doctor.email}
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Consultation Fee
                </h3>
                <div className="flex items-center justify-end text-4xl font-bold text-green-600">
                  {doctor.price}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border hover:bg-green-50 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3  border hover:bg-green-50 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3  border hover:bg-green-50 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3  border hover:bg-green-50 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3  border hover:bg-green-50 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select time</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Visit
                </label>
                <input
                  type="text"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-4 py-3  border hover:bg-green-50 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3  border hover:bg-green-50 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-center md:justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-800 transition-colors duration-300 shadow-sm hover:shadow-md font-medium"
                >
                  Continue with Payment &gt;
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Appointment;
