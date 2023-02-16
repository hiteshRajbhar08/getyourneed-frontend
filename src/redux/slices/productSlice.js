import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    product: {},
    createdProduct: {},
    createdProductSuccess: false,
    updatedProduct: {},
    updatedProductSuccess: false,
    deleteProductSuccess: false,
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
    setupdatedProduct: (state, action) => {
      state.updatedProduct = action.payload;
      state.updatedProductSuccess = true;
      state.loading = false;
    },
    setCreatedProductReset: (state, action) => {
      state.createdProduct = {};
      state.createdProductSuccess = false;
      state.loading = false;
    },
    setDeleteProductSuccess: (state, action) => {
      state.deleteProductSuccess = true;
      state.loading = false;
    },
    setUpdatedProductReset: (state, action) => {
      state.updatedProduct = {};
      state.updatedProductSuccess = false;
      state.loading = false;
    },
    setDeleteProductReset: (state, action) => {
      state.deleteProductSuccess = false;
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
