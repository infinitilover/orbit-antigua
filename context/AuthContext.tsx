
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { Business } from '@/types';

interface User {
  fullName: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  favorites: string[]; // Array of business IDs
  login: (userData: User) => void;
  logout: () => void;
  toggleFavorite: (businessId: string) => void;
  isFavorited: (businessId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for a logged-in user in session/local storage
    try {
      const storedUser = sessionStorage.getItem('orbitUser');
      const storedFavorites = sessionStorage.getItem('orbitFavorites');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
        console.error("Failed to parse session storage data", error)
    } finally {
        setIsLoading(false);
    }
  }, []);

  const login = useCallback((userData: User) => {
    setUser(userData);
    sessionStorage.setItem('orbitUser', JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setFavorites([]);
    sessionStorage.removeItem('orbitUser');
    sessionStorage.removeItem('orbitFavorites');
  }, []);

  const toggleFavorite = useCallback((businessId: string) => {
    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.includes(businessId)
        ? prevFavorites.filter(id => id !== businessId)
        : [...prevFavorites, businessId];
      sessionStorage.setItem('orbitFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const isFavorited = useCallback((businessId: string) => {
    return favorites.includes(businessId);
  }, [favorites]);

  const isAuthenticated = !!user;

  // Don't render children until we've checked for authentication
  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, favorites, login, logout, toggleFavorite, isFavorited }}>
      {children}
    </AuthContext.Provider>
  );
};
