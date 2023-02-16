import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    product: {},
    createdProduct: {},
    createdProductSuccess: false,
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
    setProduct: (state, action) => {
      state.product = action.payload;
      state.loading = false;
    },
    setCreatedProduct: (state, action) => {
      state.createdProduct = action.payload;
      state.createdProductSuccess = true;
      state.loading = false;
    },
    setCreatedProductReset: (state, action) => {
      state.createdProduct = {};
      state.createdProductSuccess = false;
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
