import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role === 'admin') {
      setUser({ role });
      setIsAuthenticated(true);
    } else {
      // If not admin, clear any existing tokens
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      navigate('/login');
    }
  }, [navigate]);

  const login = (token, role) => {
    if (role !== 'admin') {
      throw new Error('Access denied. Admin only.');
    }
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setUser({ role });
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
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