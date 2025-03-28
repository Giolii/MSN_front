import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useConversation } from "./ConversationsContext";
// Create the context
export const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

const API_URL = import.meta.env.VITE_API_URL;

// Auth Provider component
export function AuthProvider({ children }) {
  const { setFilteredConversations, setConversationSelected } =
    useConversation();
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${API_URL}/auth/me`);
        setCurrentUser(response.data.user);
      } catch (error) {
        console.error("Token verification failed:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [token]);

  const login = async (email, password) => {
    try {
      setError("");
      setLoading(true);

      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      const { token, user } = response.data;

      localStorage.setItem("token", token);

      setToken(token);
      setCurrentUser(user);

      return user;
    } catch (error) {
      setError(error.response?.data?.error || "Failed to login");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    try {
      setError("");
      setLoading(true);

      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      setError(error.response?.data?.error || "Failed to register");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setCurrentUser(null);
    delete axios.defaults.headers.common["Authorization"];
    // Reset the states so when i logout and login to another user i dont see the last conversation saved on the states
    setFilteredConversations("");
    setConversationSelected("");
  };

  const value = {
    currentUser,
    setCurrentUser,
    token,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
