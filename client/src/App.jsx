import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/common/Navigation';
import HomePage from './HomePage';
import Footer from './components/common/Footer';
import BlogList from './components/blog/BlogList';
import Blog from './components/blog/Blog';
import Team from './Team';
import { AuthProvider } from './components/auth/AuthContext';
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import Courses from './components/courses/Courses';
import CourseDetails from './components/courses/CourseDetails';
import MyCourses from './components/courses/MyCourses';
import CourseContent from './components/courses/CourseContent';
import CoursePlayer from './components/courses/CoursePlayer';
import Success from './components/auth/Success';
import Cancel from './components/auth/Cancel';


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
           <Route path="/blogs" element={<PrivateRoute element={<BlogList />} />} />
           <Route path="/blog/:blogId" element={<PrivateRoute element={<Blog />} />} />
           <Route path="/team" element={<Team />} />
           <Route path="/register" element={<Register onLogin={handleLogin} />} /> 
           <Route path="/login" element={<Login onLogin={handleLogin} />} />
           <Route path="/courses" element={<Courses />} />
           <Route path="/course-details/:id" element={<CourseDetails />} />
           <Route path="/my-courses" element={<PrivateRoute element={<MyCourses />} />} />
           <Route path="/start-course/:id" element={<PrivateRoute element={<CourseContent />} />} />
           <Route path="/course-player/:courseId" element={<PrivateRoute element={<CoursePlayer />} />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />

          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
