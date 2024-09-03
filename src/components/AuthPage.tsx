import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import Links from '../pages/Links';

export const AuthPage: React.FC = () => {
  const [username, setUsername] = useState<string>('user13');
  const [password, setPassword] = useState<string>('password');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.isAuthenticated) {
      navigate('/data-table');
    }
  }, [state.isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/login', {
        username,
        password,
      });
      console.log(response.data)
      login(response.data.data.token);
      navigate('/data-table');
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
          {error && <p className="error">{error}</p>}
          <button className='login' type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>

          <Links />
      </form>
      <aside>
        <img src='https://pryaniky.com/wp-content/themes/roystat_v6.15/img/svg/logo-face.svg' loading='lazy'/>
      </aside>
    </div>
  );
};
