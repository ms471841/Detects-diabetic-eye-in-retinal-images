import React, { useEffect, useState } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';

import './splash.css';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../store/actions/user';

const SplashScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.user.user);
  useEffect(() => {
    dispatch(getProfile());

    setTimeout(() => {
      if (!loading) {
        if (isAuthenticated) {
          navigate('/dashboard');
        } else {
          navigate('/login');
        }
      }
    }, 3000);
  }, [navigate, dispatch, isAuthenticated, loading]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return <CircularProgress variant="determinate" value={progress} />;
};

export default SplashScreen;
