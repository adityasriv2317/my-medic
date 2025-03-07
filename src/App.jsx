import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WebProvider } from "./Data/WebContext";
import Home from "./pages/Home";
import AuthForm from "./pages/AuthForm";

const App = () => {
  return (
    <WebProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/auth' element={<AuthForm />} />
        </Routes>
      </Router>
    </WebProvider>
  );
};

export default App;
