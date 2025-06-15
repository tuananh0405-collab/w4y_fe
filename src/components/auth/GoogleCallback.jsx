import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setCredentials } from '../../redux/features/authSlice';

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get user data from URL parameters
        const params = new URLSearchParams(location.search);
        const userData = params.get('user');

        if (!userData) {
          throw new Error('No user data received');
        }

        // Parse user data
        const parsedData = JSON.parse(decodeURIComponent(userData));
        
        // Store user data in Redux
        dispatch(setCredentials(parsedData));
        
        // Redirect to home page
        window.location.href = '/';
      } catch (error) {
        console.error('Error during Google callback:', error);
        navigate('/auth');
      }
    };

    handleCallback();
  }, [dispatch, navigate, location]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Processing Google Login...</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
};

export default GoogleCallback; 