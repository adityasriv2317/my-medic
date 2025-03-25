import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { WebContext } from "../Data/WebContext";
import { motion } from "framer-motion";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Reciept from "./Reciept";
import {
  ArrowLeft,
  IndianRupee,
  Smartphone,
  Lock,
  CheckCircle2,
  Download,
  Home,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import ToastBox from "../components/ToastBox";

const Payment = () => {
  const { user, loading } = useContext(WebContext);
  const navigate = useNavigate();
  const location = useLocation();
  const hasShownToast = useRef(false);
  const appointmentData = location.state?.appointmentData;
  const doctor = location.state?.doctor;

  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [upiId, setUpiId] = useState("");
  const [amount] = useState(parseInt(doctor?.price.replace(/[^0-9]/g, "")) || 0);

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
          width: '100%',
          maxWidth: '100%',
          margin: '0 auto',
          '@media (min-width: 640px)': {
            width: 'auto',
            maxWidth: '400px',
            margin: '0',
          }
        }
      });
      navigate("/auth?type=login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!appointmentData || !doctor) {
      navigate("/medics");
    }
  }, [appointmentData, doctor, navigate]);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!upiId) {
      toast.error("Please enter a valid UPI ID");
      return;
    }

    setPaymentStatus("processing");
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus("success");
      toast.success("Payment successful!");
    }, 2000);
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

  if (!user || !appointmentData || !doctor) {
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
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate("/appointment", { state: { doctor, appointmentData } })}
            className="flex items-center text-green-600 hover:text-green-700 mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Appointment
          </button>

          <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-green-100">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Complete Your Payment
              </h1>
              <p className="text-gray-600">
                Pay securely using UPI
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Consultation Fee
                  </h3>
                  <p className="text-sm text-gray-600">
                    {doctor.name} - {doctor.specialization}
                  </p>
                </div>
                <div className="flex items-center text-2xl font-bold text-green-600">
                  {doctor.price}
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                  Appointment Date: {appointmentData.date}
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                  Appointment Time: {appointmentData.time}
                </div>
              </div>
            </div>

            {paymentStatus === "pending" && (
              <form onSubmit={handlePayment} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter UPI ID
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@upi"
                      required
                      className="w-full pl-4 pr-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Example: username@upi
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Lock className="w-4 h-4 mr-1" />
                    Secure Payment
                  </div>
                  <div className="flex items-center">
                    <Smartphone className="w-4 h-4 mr-1" />
                    UPI Payment
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-800 transition-colors duration-300 shadow-sm hover:shadow-md font-medium"
                >
                  Pay Now
                </button>
              </form>
            )}

            {paymentStatus === "processing" && (
              <div className="text-center py-8">
                <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Processing Payment
                </h3>
                <p className="text-gray-600">
                  Please wait while we process your payment...
                </p>
              </div>
            )}

            {paymentStatus === "success" && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Payment Successful!
                </h3>
                <p className="text-gray-600">
                  Your appointment has been confirmed.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 px-4">
                    {/* download reciept */}
                    <PDFDownloadLink
                      document={<Reciept recieptData={appointmentData} doctor={doctor} />}
                      fileName={`Receipt_${doctor.name}_${appointmentData.date}.pdf`}
                      className="flex items-center justify-center cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
                    >
                      {({ loading, error }) => (
                        <div className="flex items-center">
                          {loading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              <span>Generating PDF...</span>
                            </>
                          ) : error ? (
                            <>
                              <span className="text-white">Error generating PDF</span>
                              <button
                                onClick={() => window.location.reload()}
                                className="ml-2 text-white underline"
                              >
                                Try Again
                              </button>
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4 mr-2" />
                              <span>Download Receipt</span>
                            </>
                          )}
                        </div>
                      )}
                    </PDFDownloadLink>
                    {/* go to home page */}
                    <button 
                      onClick={() => navigate("/medics")}
                      className="flex items-center justify-center cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300">
                        <Home className="w-4 h-4 mr-2" />
                        Go to Home Page
                    </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Payment;
