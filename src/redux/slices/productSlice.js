import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'comment',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = true;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

const productReducer = productSlice.reducer;
const productActions = productSlice.actions;

export { productReducer, productActions };
