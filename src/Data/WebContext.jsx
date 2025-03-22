import React, { createContext, useState, useEffect } from "react";
import { getUserFromCookies, setUserInCookies, removeUserFromCookies } from "./authUtils";

export const WebContext = createContext();

export const WebProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize user from cookies
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedUser = getUserFromCookies();
        if (savedUser) {
          setUser(savedUser);
        }
      } catch (err) {
        console.error("Error initializing auth:", err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock API call - replace with your actual API endpoint
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          if (credentials.email === "test@example.com" && credentials.password === "password") {
            resolve({
              user: {
                name: "Test User",
                email: credentials.email,
                role: "user",
                avatar: "https://ui-avatars.com/api/?name=Test+User&background=0D9488&color=fff",
              },
              token: "mock-jwt-token",
            });
          } else {
            throw new Error("Invalid credentials");
          }
        }, 1000);
      });

      const userData = {
        ...response.user,
        token: response.token,
      };

      setUser(userData);
      setUserInCookies(userData);
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
      // Mock API call - replace with your actual API endpoint
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (userData.email === "test@example.com") {
            reject(new Error("Email already exists"));
          } else {
            resolve({
              user: {
                name: userData.name,
                email: userData.email,
                role: "user",
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=0D9488&color=fff`,
              },
              token: "mock-jwt-token",
            });
          }
        }, 1000);
      });

      const newUser = {
        ...response.user,
        token: response.token,
      };

      setUser(newUser);
      setUserInCookies(newUser);
      return { success: true, user: newUser };
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
  };

  const updateUserProfile = (updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      setUserInCookies(updatedUser);
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
        isAuthenticated: checkAuth(),
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
