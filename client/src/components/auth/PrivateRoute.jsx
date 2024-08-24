import React, { useEffect, useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const [redirect, setRedirect] = useState(false);
  const alertShown = useRef(false); // Ref to track if alert has been shown

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token && !alertShown.current) {
      alert('Please log in to access the Courses page.');
      alertShown.current = true; // Mark alert as shown
      setRedirect(true);
    }
  }, [token]);

  if (redirect) {
    return <Navigate to="/register" />;
  }

  return element;
};

export default PrivateRoute;
