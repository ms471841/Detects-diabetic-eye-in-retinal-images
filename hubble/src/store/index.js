import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import { PredictionReducer } from './reducers/predictionReducer';
// ==============================|| REDUX - MAIN STORE ||============================== //

// export const server = 'https://code-backend.onrender.com';
export const server = 'http://localhost:4000';
export const serverPython = 'http://localhost:5000';

export default configureStore({
  reducer: {
    user: userReducer,
    prediction: PredictionReducer,
  },
});
