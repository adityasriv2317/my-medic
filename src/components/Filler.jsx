import React from "react";
import { motion } from "framer-motion";
import { Shield, Clock, Users, Star, Activity, Heart, Brain, Stethoscope } from "lucide-react";

// Why Choose Us Section
export const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Shield,
      title: "Trusted Care",
      description: "Our platform ensures secure and reliable healthcare services with verified professionals."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Access medical assistance anytime with our round-the-clock customer support."
    },
    {
      icon: Users,
      title: "Expert Doctors",
      description: "Connect with experienced healthcare professionals across various specialties."
    },
    {
      icon: Star,
      title: "Quality Service",
      description: "We maintain high standards of healthcare delivery and patient satisfaction."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Choose MediConnect?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to providing the best healthcare experience through our platform.
            Here's what makes us different:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <reason.icon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {reason.title}
              </h3>
              <p className="text-gray-600 text-center">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Features Section
export const Features = () => {
  const features = [
    {
      icon: Activity,
      title: "Health Monitoring",
      description: "Track your vital signs and health metrics in real-time with our advanced monitoring system."
    },
    {
      icon: Heart,
      title: "Personalized Care",
      description: "Receive tailored healthcare recommendations based on your medical history and needs."
    },
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Benefit from intelligent health insights and early warning systems powered by AI."
    },
    {
      icon: Stethoscope,
      title: "Virtual Consultations",
      description: "Connect with healthcare providers through secure video consultations from anywhere."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience healthcare like never before with our innovative features
            designed to make your health journey seamless.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Statistics Section
export const Statistics = () => {
  const stats = [
    { value: "50k+", label: "Active Users" },
    { value: "200+", label: "Expert Doctors" },
    { value: "98%", label: "Success Rate" },
    { value: "24/7", label: "Support" }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-green-800 to-green-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-green-100">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient",
      image: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=0D9488&color=fff",
      content: "MediConnect has transformed how I manage my healthcare. The virtual consultations are so convenient!"
    },
    {
      name: "Dr. Michael Chen",
      role: "Cardiologist",
      image: "https://ui-avatars.com/api/?name=Michael+Chen&background=0D9488&color=fff",
      content: "As a healthcare provider, I appreciate how MediConnect streamlines patient care and communication."
    },
    {
      name: "Emily Rodriguez",
      role: "Patient",
      image: "https://ui-avatars.com/api/?name=Emily+Rodriguez&background=0D9488&color=fff",
      content: "The 24/7 support and easy access to my health records have been invaluable for managing my family's health."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our users have to say about their experience with MediConnect.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {testimonial.name}
                  </h3>
                  <p className="text-green-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Newsletter Section
export const Newsletter = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter for the latest health tips, updates, and exclusive offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 md:gap-0 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 not-md:rounded-xl md:rounded-l-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 flex-grow max-w-md"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-green-600 text-white md:rounded-r-xl not-md:rounded-xl hover:bg-green-700 transition-colors font-medium"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const Filler = () => {
  return (
    <section className="py-16 bg-white">
      <WhyChooseUs />
      <Features />
      <Statistics />
      <Testimonials />
      <Newsletter />
    </section>
  );
};

export default Filler;

