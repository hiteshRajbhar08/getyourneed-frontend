import { toast } from 'react-toastify';
import axios from 'axios';
import { userActions } from '../slices/userSlice';

// login user
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(userActions.setLoading());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch(userActions.login(data));
    toast.success('Login Successfull');
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch(
      userActions.setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'An unexpected error has occured. Please try again later.'
      )
    );
    toast.error(error.response.data.message);
  }
};

// logout user
export const logoutUser = () => async (dispatch) => {
  dispatch(userActions.logout());
  toast.success('Logout Successfull');
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
};