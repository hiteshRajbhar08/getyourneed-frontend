import { createSlice } from '@reduxjs/toolkit';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: userInfoFromStorage,
    userDetails: {},
    loading: false,
    error: null,
    success: false,
    listUsers: [],
    deleteUserSuccess: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = true;
    },
    login: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
    },
    setListUsers: (state, action) => {
      state.listUsers = action.payload;
      state.loading = false;
    },
    setDeleteUser: (state, action) => {
      state.deleteUserSuccess = true;
      state.loading = false;
    },
    setDeleteReset: (state, action) => {
      state.deleteUserSuccess = false;
      state.loading = false;
    },
    register: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
      state.loading = false;
    },
    setUserUpdate: (state, action) => {
      state.success = true;
      state.loading = false;
    },
    setUserUpdateReset: (state, action) => {
      state.success = false;
    },
    logout: (state, action) => {
      state.userInfo = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

const userReducer = userSlice.reducer;
const userActions = userSlice.actions;

export { userReducer, userActions };
