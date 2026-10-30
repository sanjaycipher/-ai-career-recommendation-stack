import React, { createContext, useContext, useState, useEffect } from 'react';
import { me, login as loginApi, register as registerApi } from '../api/auth.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        if (isMounted) {
          setUser(null);
          setLoading(false);
        }
        return;
      }

      try {
        const currentUser = await me();
        if (isMounted) {
          setUser(currentUser);
        }
      } catch (err) {
        if (isMounted) {
          localStorage.removeItem('auth_token');
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for 401 automatic session expiry from axios interceptor
    const handleLogoutEvent = () => {
      localStorage.removeItem('auth_token');
      setUser(null);
      setError(null);
    };

    window.addEventListener('auth:logout', handleLogoutEvent);

    return () => {
      isMounted = false;
      window.removeEventListener('auth:logout', handleLogoutEvent);
    };
  }, []);

  const login = async (emailOrObj, maybePassword) => {
    setError(null);
    try {
      const payload =
        typeof emailOrObj === 'object' && emailOrObj !== null
          ? emailOrObj
          : { email: emailOrObj, password: maybePassword };
      const data = await loginApi(payload);
      localStorage.setItem('auth_token', data.token);
      setUser(data.user);
      return data.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const register = async (nameOrObj, maybeEmail, maybePassword) => {
    setError(null);
    try {
      const payload =
        typeof nameOrObj === 'object' && nameOrObj !== null
          ? nameOrObj
          : { name: nameOrObj, email: maybeEmail, password: maybePassword };
      const data = await registerApi(payload);
      localStorage.setItem('auth_token', data.token);
      setUser(data.user);
      return data.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
    isAuthenticated: Boolean(user),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
