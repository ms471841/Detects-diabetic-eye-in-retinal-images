import { createReducer } from '@reduxjs/toolkit';

export const userReducer = createReducer(
  { user: {} },
  {
    createAccountRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    createAccountSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.message = action.payload;
    },
    createAccountFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload.message;
    },
    loginRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      state.message = action.payload.message;
    },
    loginFail: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
      state.message = action.payload;
    },
    logoutFail: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.error = action.payload;
    },
    profileRequest: (state) => {
      state.loading = true;
    },
    profileSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      // state.message = action.payload;
    },
    profileFail: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
    allUserRequest: (state) => {
      state.loading = true;
    },
    allUserSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    allUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    changeRoleRequest: (state) => {
      state.loading = true;
    },
    changeRoleSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    changeRoleFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    UpdateProfileRequest: (state) => {
      state.loading = true;
    },
    UpdateProfileSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    UpdateProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);
