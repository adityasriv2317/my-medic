import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WebProvider } from "./Data/WebContext";
import Home from "./pages/Home";
import AuthForm from "./pages/AuthForm";
import Medics from "./pages/Medics";
import Appointment from "./pages/Appointment";
import Payment from "./pages/Payment";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <WebProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/medics" element={<Medics />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
        <ToastContainer />
      </Router>
    </WebProvider>
  );
};

export default App;
