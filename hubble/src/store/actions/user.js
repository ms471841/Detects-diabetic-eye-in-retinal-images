import axios from 'axios';
import { server } from '../index';

export const CreateUser = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
      withCredentials: true,
    };

    dispatch({ type: 'createAccountRequest' });

    const { data } = await axios.post(`${server}/register`, formData, config);

    dispatch({ type: 'createAccountSuccess', payload: data.user });
  } catch (error) {
    dispatch({ type: 'createAccountFail', payload: error.response.data.message });
  }
};

export const Login = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
      withCredentials: true,
    };

    dispatch({ type: 'loginRequest' });

    const { data } = await axios.post(`${server}/loginuser`, formData, config);

    dispatch({ type: 'loginSuccess', payload: data.user });
  } catch (error) {
    dispatch({ type: 'loginFail', payload: error.response.data.message });
  }
};

export const Logout = () => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };

    dispatch({ type: 'logoutRequest' });

    const { data } = await axios.get(`${server}/logoutuser`, config);

    dispatch({ type: 'logoutSuccess', payload: data.message });
  } catch (error) {
    dispatch({ type: 'logoutFail', payload: error.message });
  }
};

export const getProfile = () => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };

    dispatch({ type: 'profileRequest' });

    const { data } = await axios.get(`${server}/getuserprofile`, config);

    dispatch({ type: 'profileSuccess', payload: data.user });
  } catch (error) {
    dispatch({ type: 'profileFail', payload: error.response.data.message });
  }
};
export const UpdateProfile = (id, formData) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'UpdateProfileRequest' });

    const { data } = await axios.put(`${server}/user/updateprofile/${id}`, formData, config);
    console.log(data);
    dispatch({ type: 'UpdateProfileSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'UpdateProfileFail', payload: error.response.data.message });
  }
};
