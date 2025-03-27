import React, { useState, useContext, useEffect } from "react";
import { WebContext } from "../Data/WebContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Stethoscope, Send, AlertCircle, Loader2 } from "lucide-react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import ToastBox from "../components/ToastBox";
import WaveformLoader from "../components/Waveform";

const checkupApi = "https://mediconnect-pn3n.onrender.com/medical-chat";

const Checkup = () => {
  const { user, loading } = useContext(WebContext);
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [diagnosis, setDiagnosis] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      toast(<ToastBox message="Please login to access instant checkup" />);
      navigate("/auth?type=login");
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symptoms || !age || !gender) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);
    try {
      const message = `Please analyze the following patient information and provide a health assessment:
        Patient Age: ${age}
        Gender: ${gender}
        Symptoms: ${symptoms}
        ${medicalHistory ? `Medical History: ${medicalHistory}` : ""}
        
        Please provide:
        1. A summary of the potential health condition
        2. Severity assessment
        3. Recommendations for treatment and care
        4. Any warning signs to watch for.
        PLEASE PROVIDE YOUR RESPONSE AS AN OBJECT WITH FOLLOWING FEILDS :
        1. severity
        2. response
        3. recommendation`;

      const response = await axios.post(checkupApi, {
        message: message,
        region: "India",
      });

      // Parse the JSON string from the response
      const parsedResponse = JSON.parse(
        response.data.response.replace(/```json\n|\n```/g, "")
      );

      setDiagnosis({
        response: parsedResponse.response,
        severity: parsedResponse.severity,
        recommendation:
          typeof parsedResponse.recommendation === "object"
            ? `Treatment: ${parsedResponse.recommendation.treatment}\n\nCare: ${parsedResponse.recommendation.care}\n\nWarning Signs: ${parsedResponse.recommendation.warning_signs}`
            : parsedResponse.recommendation,
      });
    } catch (error) {
      toast.error("Failed to process your checkup. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce" />
          <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce delay-100" />
          <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce delay-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />

      <div className="pt-20 sm:pt-28 pb-8 sm:pb-16 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Section - Form */}
            <div className="w-full lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8"
              >
                <div className="flex items-center justify-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                </div>

                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">
                  Instant Health Checkup
                </h1>
                <p className="text-sm sm:text-base text-center text-gray-600 mb-6 sm:mb-8">
                  Describe your symptoms and get an instant AI-powered health
                  assessment
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Age*
                      </label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Gender*
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Describe your symptoms*
                    </label>
                    <textarea
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-24 sm:h-32"
                      placeholder="Please describe your symptoms in detail..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Medical History (Optional)
                    </label>
                    <textarea
                      value={medicalHistory}
                      onChange={(e) => setMedicalHistory(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-20 sm:h-24"
                      placeholder="Any existing conditions, allergies, or medications..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full py-2.5 sm:py-3 rounded-lg flex items-center justify-center space-x-2 text-sm sm:text-base ${
                      isProcessing
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    } text-white transition-colors`}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Get Assessment</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Right Section - Results */}
            <div className="w-full lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 h-full"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-blue-600" />
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4">
                  Assessment Results
                </h2>

                {!diagnosis && !isProcessing && (
                  <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
                    <Send className="w-12 h-12 mb-4" />
                    <p>Submit your symptoms to get an assessment</p>
                  </div>
                )}

                {isProcessing && (
                  <div className="flex flex-col items-center justify-center h-[400px]">
                    {/* <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" /> */}
                    <WaveformLoader />
                    <p className="text-gray-600">Analyzing your symptoms...</p>
                  </div>
                )}

                {diagnosis && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        Analysis
                      </h3>
                      <p className="text-gray-600 whitespace-pre-wrap">
                        {diagnosis.response}
                      </p>
                    </div>

                    {diagnosis.severity && (
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center">
                          <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
                          <h3 className="font-semibold text-gray-800">
                            Severity Level: {diagnosis.severity}
                          </h3>
                        </div>
                      </div>
                    )}

                    {diagnosis.recommendation && (
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h3 className="font-semibold text-gray-800 mb-2">
                          Recommendations
                        </h3>
                        <p className="text-gray-600 whitespace-pre-wrap">
                          {diagnosis.recommendation}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkup;
