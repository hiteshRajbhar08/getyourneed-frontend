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

// register user
export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch(userActions.setLoading());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/register',
      { name, email, password },
      config
    );

    dispatch(userActions.register(data));
    toast.success('Register Successfull');
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

// get user details
export const getUserDetails = (userId) => async (dispatch, getState) => {
  try {
    dispatch(userActions.setLoading());

    const config = {
      headers: {
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${userId}`, config);

    dispatch(userActions.setUserDetails(data));
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

// update user
export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch(userActions.setLoading());

    const config = {
      headers: {
        Authorization: `Bearer ${getState().user.userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch(userActions.setUserUpdate(data));
    dispatch(userActions.login(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
    toast.success('User Updated Successfully');
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

// list users
export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch(userActions.setLoading());

    const config = {
      headers: {
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users`, config);

    dispatch(userActions.setListUsers(data));
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

// delete user
export const deleteUser = (userId) => async (dispatch, getState) => {
  try {
    dispatch(userActions.setLoading());

    const config = {
      headers: {
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/users/${userId}`, config);

    dispatch(userActions.setDeleteUser(data));
    toast.success(data.message);
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
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  toast.success('Logout Successfull');
  dispatch(userActions.logout());
};

// delete user
export const setToUpdateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch(userActions.setLoading());

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch(userActions.setAdminUserUpdate(data));
    toast.success('User update successfull');
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
