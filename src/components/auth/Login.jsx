import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // Add admin-only validation
      if (!formData.email.includes('admin')) {
        setError('This login is for administrators only.');
        return;
      }

      await login(formData.email, formData.password);
    } catch (error) {
      setError(error || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Admin Login Only</h2>
        <p className="login-subtitle">This area is restricted to administrators only.</p>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label>Admin Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter admin email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit" className="login-btn">Login as Admin</button>
        <button type="button" className="back-btn" onClick={() => navigate('/')}>
          Back to Main Site
        </button>
      </form>
    </div>
  );
};

export default Login; 