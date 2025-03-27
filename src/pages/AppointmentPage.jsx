import React, { useState, useContext, useEffect } from 'react';
import { WebContext } from '../Data/WebContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User, Phone, X, Check, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import ToastBox from '../components/ToastBox';

const AppointmentPage = () => {
  const { user, loading } = useContext(WebContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!loading && !user) {
      toast(<ToastBox message="Please login to view appointments" />);
      navigate('/auth?type=login');
      return;
    }

    // Mock API call to get appointments
    const fetchAppointments = () => {
      // Simulated appointments data
      const mockAppointments = [
        {
          id: 1,
          doctorName: "Dr. Sarah Johnson",
          specialty: "Cardiologist",
          date: "2024-02-15",
          time: "10:00 AM",
          location: "MediCare Hospital, Room 205",
          status: "Upcoming",
          notes: "Regular heart checkup"
        },
        {
          id: 2,
          doctorName: "Dr. Michael Chen",
          specialty: "Dermatologist",
          date: "2024-02-10",
          time: "2:30 PM",
          location: "Skin Care Clinic, Floor 3",
          status: "Completed",
          notes: "Skin consultation"
        },
        {
          id: 3,
          doctorName: "Dr. Emily Brown",
          specialty: "General Physician",
          date: "2024-02-20",
          time: "11:15 AM",
          location: "City Medical Center",
          status: "Cancelled",
          notes: "Annual health checkup"
        }
      ];

      setAppointments(mockAppointments);
    };

    fetchAppointments();
  }, [user, loading, navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Upcoming':
        return <Clock className="w-4 h-4" />;
      case 'Completed':
        return <Check className="w-4 h-4" />;
      case 'Cancelled':
        return <X className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
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
      
      <div className="pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">My Appointments</h1>
            <button
              onClick={() => navigate('/appointment')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Book New Appointment
            </button>
          </div>

          <div className="space-y-4">
            {appointments.map((appointment) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{appointment.doctorName}</h2>
                      <p className="text-gray-600">{appointment.specialty}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full flex items-center gap-1 ${getStatusColor(appointment.status)}`}>
                      {getStatusIcon(appointment.status)}
                      {appointment.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-5 h-5" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-5 h-5" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-5 h-5" />
                      <span>{appointment.location}</span>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="mt-4 text-gray-600">
                      <p className="text-sm">{appointment.notes}</p>
                    </div>
                  )}

                  {appointment.status === 'Upcoming' && (
                    <div className="mt-6 flex gap-3">
                      <button className="px-4 py-2 text-sm border border-green-600 text-green-600 rounded-lg hover:bg-green-50">
                        Reschedule
                      </button>
                      <button className="px-4 py-2 text-sm border border-red-600 text-red-600 rounded-lg hover:bg-red-50">
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {appointments.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No appointments found.</p>
                <button
                  onClick={() => navigate('/appointment')}
                  className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Book Your First Appointment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AppointmentPage;
