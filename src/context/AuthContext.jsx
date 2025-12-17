import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage on mount
    const storedUser = localStorage.getItem('ecommerce_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const fakeUser = {
            id: '1',
            name: 'John Doe',
            email: email,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          };
          setUser(fakeUser);
          localStorage.setItem('ecommerce_user', JSON.stringify(fakeUser));
          resolve(fakeUser);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  };

  const register = async (name, email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          const fakeUser = {
            id: Math.random().toString(36).substr(2, 9),
            name: name,
            email: email,
            avatar: `https://ui-avatars.com/api/?name=${name}&background=random`
          };
          setUser(fakeUser);
          localStorage.setItem('ecommerce_user', JSON.stringify(fakeUser));
          resolve(fakeUser);
        } else {
          reject(new Error('Registration failed'));
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecommerce_user');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
