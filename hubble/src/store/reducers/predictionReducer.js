import { createReducer } from '@reduxjs/toolkit';

export const PredictionReducer = createReducer(
  { predResult: null },
  {
    predictionRequest: (state) => {
      state.loading = true;
    },
    predictionSuccess: (state, action) => {
      state.loading = false;
      state.predResult = action.payload;
    },
    predictionFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    clearPrediction: (state) => {
      state.predResult = null;
    },

    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);
