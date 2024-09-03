import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { AuthProviderProps, AuthState } from '../types';

const AuthContext = createContext<{ state: AuthState, login: (token: string) => void, logout: () => void } | undefined>(undefined);

const authReducer = (state: AuthState, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      return { isAuthenticated: true, token: action.token };
    case 'LOGOUT':
      return { isAuthenticated: false, token: null };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
      isAuthenticated: false,
      token: null,
    });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch({ type: 'LOGIN', token });
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    dispatch({ type: 'LOGIN', token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};