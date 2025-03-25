import React, { createContext, useState, useEffect } from "react";
import { getUserFromCookies, setUserInCookies, removeUserFromCookies } from "./authUtils";

export const WebContext = createContext();

export const WebProvider = ({ children }) => {
  // Initialize with proper null checks
  const [user, setUser] = useState(() => {
    try {
      const localUser = localStorage.getItem("user");
      return localUser && localUser !== "undefined" ? JSON.parse(localUser) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (!user) {
          const cookieUser = getUserFromCookies();
          if (cookieUser) {
            setUser(cookieUser);
            localStorage.setItem("user", JSON.stringify(cookieUser));
          }
        }
      } catch (err) {
        console.error("Error initializing auth:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      setUser(userData);
      setUserInCookies(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return { success: true, user: userData };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      setUser(userData);
      setUserInCookies(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return { success: true, user: userData };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    removeUserFromCookies();
    localStorage.removeItem("user");
  };

  const updateUserProfile = (updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      setUserInCookies(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const checkAuth = () => {
    return !!user?.token;
  };

  return (
    <WebContext.Provider 
      value={{ 
        user,
        loading,
        error,
        isAuthenticated: !!user,  // Simplified auth check
        login,
        signup,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </WebContext.Provider>
  );
};
