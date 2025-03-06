import React, { createContext, useState, useEffect } from "react";
import { getUserFromCookies, setUserInCookies, removeUserFromCookies } from "./authUtils";

export const WebContext = createContext();

export const WebProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = getUserFromCookies();
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setUserInCookies(userData);
  };

  const logout = () => {
    setUser(null);
    removeUserFromCookies();
  };

  return (
    <WebContext.Provider value={{ user, login, logout }}>
      {children}
    </WebContext.Provider>
  );
};
