import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/common/Navigation';
import HomePage from './HomePage';
import Courses from './components/courses/Courses';
import Cancel from './components/auth/Cancel';
import Success from './components/auth/Success';
import CourseDetails from './components/courses/CourseDetails';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Team from './Team';
import Footer from './components/common/Footer';
import MyCourses from './components/courses/MyCourses';
import CourseContent from './components/courses/CourseContent';
import CoursePlayer from './components/courses/CoursePlayer';
import { AuthProvider } from './components/auth/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Blog from './components/blog/Blog';
import BlogList from './components/blog/BlogList';

import './App.css';
// import 'highlight.js/styles/atom-one-dark.css'; 
import 'highlight.js/styles/tokyo-night-dark.css'; // Example with Monokai theme




const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthProvider>
      <Router>
        <div>
          <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/success" element={<Success />} />
            <Route path="/register" element={<Register onLogin={handleLogin} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/team" element={<Team />} />
            <Route path="/course-details/:id" element={<CourseDetails />} />
            <Route path="/my-courses" element={<PrivateRoute element={<MyCourses />} />} />
            <Route path="/start-course/:id" element={<PrivateRoute element={<CourseContent />} />} />
            <Route path="/course-player/:courseId" element={<PrivateRoute element={<CoursePlayer />} />} />
            <Route path="/courses" element={<PrivateRoute element={<Courses />} />} />
            <Route path="/blogs" element={<PrivateRoute element={<BlogList />} />} />
            <Route path="/blog/:blogId" element={<PrivateRoute element={<Blog />} />} />

            {/* <Route path="/blog/:blogId" element={<Blog />} /> */}

          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
