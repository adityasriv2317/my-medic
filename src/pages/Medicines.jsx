import React, { useState, useContext, useEffect } from 'react';
import { WebContext } from '../Data/WebContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Plus, Minus, X, Filter, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import ToastBox from '../components/ToastBox';

const Medicines = () => {
  const { user, loading } = useContext(WebContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    if (!loading && !user) {
      toast(<ToastBox message="Please login to access medicines" />);
      navigate('/auth?type=login');
    }
  }, [user, loading, navigate]);

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

  // Sample medicine data
  const medicines = [
    {
      id: 1,
      name: "Paracetamol",
      brand: "Crocin",
      category: "Pain Relief",
      price: 45.99,
      image: "https://via.placeholder.com/150",
      description: "Fever and pain relief medication",
      stock: 50
    },
    {
      id: 2,
      name: "Amoxicillin",
      brand: "Mox",
      category: "Antibiotics",
      price: 149.99,
      image: "https://via.placeholder.com/150",
      description: "Antibiotic for bacterial infections",
      stock: 30
    },
    // Add more medicines as needed
  ];

  const categories = ['All', 'Pain Relief', 'Antibiotics', 'Vitamins', 'First Aid'];

  const filteredMedicines = medicines.filter(medicine => 
    (selectedCategory === 'All' || medicine.category === selectedCategory) &&
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (medicine) => {
    if (!user) {
      toast(<ToastBox message="Please login to add items to cart" />);
      return;
    }
    
    const existingItem = cart.find(item => item.id === medicine.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === medicine.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
    toast.success('Added to cart!');
  };

  const updateQuantity = (id, change) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />
      
      <div className="pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search medicines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex space-x-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl transition-colors ${
                    selectedCategory === category
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Medicines Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMedicines.map(medicine => (
              <motion.div
                key={medicine.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <img src={medicine.image} alt={medicine.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{medicine.name}</h3>
                  <p className="text-sm text-gray-500">{medicine.brand}</p>
                  <p className="text-sm text-gray-600 mt-2">{medicine.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">₹{medicine.price}</span>
                    <button
                      onClick={() => addToCart(medicine)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
                    >
                      <Plus size={16} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowCart(true)}
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg"
      >
        <ShoppingCart />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
            {cart.length}
          </span>
        )}
      </motion.button>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-xl z-50"
          >
            <div className="p-4 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Shopping Cart</h2>
                <button onClick={() => setShowCart(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border-b">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.brand}</p>
                      <p className="text-green-600 font-semibold">₹{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Minus size={16} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold">₹{cartTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => {/* Handle checkout */}}
                  className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Medicines;
