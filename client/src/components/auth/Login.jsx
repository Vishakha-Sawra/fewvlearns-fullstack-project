import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        login();
        navigate('/courses');
      } else {
        alert(data.message || 'Error logging in');
      }
    } catch (error) {
      alert('Error logging in');
    }
  };
  
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      // Handle case where there is no refresh token
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        return data.token;
      } else {
        // Handle refresh token expiration or invalidation
        console.error('Refresh token is invalid or expired');
      }
    } catch (error) {
      console.error('Error refreshing token', error);
    }
  };
  
  // Example usage when making authenticated requests:
  const makeAuthenticatedRequest = async (url, options) => {
    let token = localStorage.getItem('token');
    if (!token) {
      token = await refreshToken();
      if (!token) {
        // Handle case where token could not be refreshed
        return;
      }
    }
  
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    };
  
    const response = await fetch(url, options);
    if (response.status === 401) {
      // Token might be expired, try refreshing it
      token = await refreshToken();
      if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
        return fetch(url, options);
      }
    }
    return response;
  };
  

  return (
    <div className="flex items-center justify-center px-8 py-44">
      <form onSubmit={handleLogin} className="bg-[#001313] shadow-green-300 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl text-gray-100 mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-200 mb-2" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none text-gray-800 focus:ring-2 focus:ring-green-300"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-200 mb-2" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none text-gray-800 focus:ring-2 focus:ring-green-300"
          />
        </div>
        <button
          type="submit"
          className="w-full hover:bg-green-300 border border-green-300 text-white hover:text-gray-900 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
