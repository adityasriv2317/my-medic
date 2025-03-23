import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { WebContext } from "../Data/WebContext";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  Phone,
  Mail,
  IndianRupee,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import ToastBox from "../components/ToastBox";

// Mock data for doctors (replace with actual API data later)
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    specialization: "Cardiologist",
    rating: 4.9,
    experience: "12 years",
    location: "Mumbai, Maharashtra",
    availability: "Available Today",
    image:
      "https://ui-avatars.com/api/?name=Priya+Sharma&background=0D9488&color=fff",
    phone: "+91 98765 43210",
    email: "priya.sharma@mymedic.com",
    description:
      "Specialized in cardiovascular diseases with expertise in preventive cardiology.",
    price: "₹1,500",
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    specialization: "Neurologist",
    rating: 4.8,
    experience: "15 years",
    location: "Delhi, NCR",
    availability: "Next Available: Tomorrow",
    image:
      "https://ui-avatars.com/api/?name=Rajesh+Kumar&background=0D9488&color=fff",
    phone: "+91 98765 43211",
    email: "rajesh.kumar@mymedic.com",
    description:
      "Expert in treating neurological disorders with focus on stroke management.",
    price: "₹2,000",
  },
  {
    id: 3,
    name: "Dr. Anjali Patel",
    specialization: "Pediatrician",
    rating: 4.9,
    experience: "10 years",
    location: "Bangalore, Karnataka",
    availability: "Available Today",
    image:
      "https://ui-avatars.com/api/?name=Anjali+Patel&background=0D9488&color=fff",
    phone: "+91 98765 43212",
    email: "anjali.patel@mymedic.com",
    description:
      "Dedicated to providing comprehensive care for children with special focus on nutrition.",
    price: "₹1,200",
  },
  {
    id: 4,
    name: "Dr. Amit Singh",
    specialization: "Dermatologist",
    rating: 4.7,
    experience: "8 years",
    location: "Chennai, Tamil Nadu",
    availability: "Available Today",
    image:
      "https://ui-avatars.com/api/?name=Amit+Singh&background=0D9488&color=fff",
    phone: "+91 98765 43213",
    email: "amit.singh@mymedic.com",
    description:
      "Specialized in treating skin conditions and cosmetic procedures with modern techniques.",
    price: "₹1,800",
  },
  {
    id: 5,
    name: "Dr. Meera Reddy",
    specialization: "Orthopedist",
    rating: 4.8,
    experience: "14 years",
    location: "Hyderabad, Telangana",
    availability: "Next Available: Tomorrow",
    image:
      "https://ui-avatars.com/api/?name=Meera+Reddy&background=0D9488&color=fff",
    phone: "+91 98765 43214",
    email: "meera.reddy@mymedic.com",
    description:
      "Expert in bone and joint health, specializing in sports medicine and joint replacements.",
    price: "₹2,500",
  },
  {
    id: 6,
    name: "Dr. Vikram Malhotra",
    specialization: "Ophthalmologist",
    rating: 4.9,
    experience: "16 years",
    location: "Pune, Maharashtra",
    availability: "Available Today",
    image:
      "https://ui-avatars.com/api/?name=Vikram+Malhotra&background=0D9488&color=fff",
    phone: "+91 98765 43215",
    email: "vikram.malhotra@mymedic.com",
    description:
      "Specialized in advanced eye care procedures and vision correction surgeries.",
    price: "₹2,200",
  },
  {
    id: 7,
    name: "Dr. Neha Gupta",
    specialization: "Psychiatrist",
    rating: 4.8,
    experience: "11 years",
    location: "Kolkata, West Bengal",
    availability: "Available Today",
    image:
      "https://ui-avatars.com/api/?name=Neha+Gupta&background=0D9488&color=fff",
    phone: "+91 98765 43216",
    email: "neha.gupta@mymedic.com",
    description:
      "Expert in mental health with focus on anxiety and depression management.",
    price: "₹1,800",
  },
  {
    id: 8,
    name: "Dr. Arun Verma",
    specialization: "Cardiologist",
    rating: 4.9,
    experience: "18 years",
    location: "Ahmedabad, Gujarat",
    availability: "Next Available: Tomorrow",
    image:
      "https://ui-avatars.com/api/?name=Arun+Verma&background=0D9488&color=fff",
    phone: "+91 98765 43217",
    email: "arun.verma@mymedic.com",
    description:
      "Specialized in interventional cardiology and heart disease prevention.",
    price: "₹2,300",
  },
  {
    id: 9,
    name: "Dr. Suman Iyer",
    specialization: "Pediatrician",
    rating: 4.9,
    experience: "13 years",
    location: "Jaipur, Rajasthan",
    availability: "Available Today",
    image:
      "https://ui-avatars.com/api/?name=Suman+Iyer&background=0D9488&color=fff",
    phone: "+91 98765 43218",
    email: "suman.iyer@mymedic.com",
    description:
      "Dedicated to providing comprehensive pediatric care with focus on child development.",
    price: "₹3,200",
  },
];

const specializations = [
  "All Specializations",
  "Cardiologist",
  "Neurologist",
  "Pediatrician",
  "Dermatologist",
  "Orthopedist",
  "Ophthalmologist",
  "Psychiatrist",
];

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "₹1,000 - ₹2,000", min: 1000, max: 2000 },
  { label: "₹2,000 - ₹3,000", min: 2000, max: 3000 },
  { label: "Over ₹3,000", min: 3000, max: Infinity },
];

const Medics = () => {
  const { user, loading } = useContext(WebContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState(
    "All Specializations"
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState("All Prices");
  const [filteredDoctors, setFilteredDoctors] = useState(mockDoctors);
  const hasShownToast = useRef(false);

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
    let filtered = mockDoctors;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.specialization
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    // Filter by specialization
    if (selectedSpecialization !== "All Specializations") {
      filtered = filtered.filter(
        (doctor) => doctor.specialization === selectedSpecialization
      );
    }

    // Filter by price range
    if (selectedPriceRange !== "All Prices") {
      const range = priceRanges.find((r) => r.label === selectedPriceRange);
      filtered = filtered.filter((doctor) => {
        const price = parseInt(doctor.price.replace(/[^0-9]/g, ""));
        return price >= range.min && price <= range.max;
      });
    }

    setFilteredDoctors(filtered);
  }, [searchQuery, selectedSpecialization, selectedPriceRange]);

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

  if (!user) {
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
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Find a Doctor
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Search for doctors by name, specialization, or location. Book
              appointments with the best healthcare professionals across India.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-green-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search doctors by name or specialization..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Filter
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500"
                    size={20}
                  />
                  <select
                    value={selectedSpecialization}
                    onChange={(e) => setSelectedSpecialization(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none text-gray-700 hover:bg-green-50"
                  >
                    {specializations.map((spec) => (
                      <option 
                        key={spec} 
                        value={spec}
                        className="hover:bg-green-500 hover:text-white"
                      >
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <IndianRupee
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500"
                    size={20}
                  />
                  <select
                    value={selectedPriceRange}
                    onChange={(e) => setSelectedPriceRange(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none text-gray-700 hover:bg-green-50"
                  >
                    {priceRanges.map((range) => (
                      <option className="hover:bg-green-500 hover:text-white" key={range.label} value={range.label}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-green-100"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full border-2 border-green-200"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {doctor.name}
                      </h3>
                      <p className="text-green-600 font-medium">
                        {doctor.specialization}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center mb-3">
                    <Star className="text-yellow-400" size={16} />
                    <span className="ml-1 text-sm text-gray-600 font-medium">
                      {doctor.rating}
                    </span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-600">
                      {doctor.experience}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin size={16} className="mr-2 text-green-500" />
                      {doctor.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock size={16} className="mr-2 text-green-500" />
                      {doctor.availability}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    {doctor.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-green-600">
                      {doctor.price}
                    </span>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-800 transition-colors duration-300 shadow-sm hover:shadow-md font-medium">
                      Book Appointment
                    </button>
                  </div>

                  <div className="mt-4 pt-4 border-t border-green-100">
                    <div className="flex items-center space-x-4">
                      <a
                        href={`tel:${doctor.phone}`}
                        className="text-gray-600 hover:text-green-600 transition-colors duration-300"
                        title="Call Doctor"
                      >
                        <Phone size={16} />
                      </a>
                      <a
                        href={`mailto:${doctor.email}`}
                        className="text-gray-600 hover:text-green-600 transition-colors duration-300"
                        title="Email Doctor"
                      >
                        <Mail size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No doctors found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Medics;
