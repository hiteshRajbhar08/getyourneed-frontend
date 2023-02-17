import { productActions } from '../slices/productSlice';
import { toast } from 'react-toastify';
import axios from 'axios';

// fetch all products
export const listProducts =
  (keyword = '') =>
  async (dispatch) => {
    try {
      dispatch(productActions.setLoading());

      const { data } = await axios.get(`/api/products?keyword=${keyword}`);

      dispatch(productActions.setProducts(data));
    } catch (error) {
      dispatch(
        productActions.setError(
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

// fetch  productdetails
export const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch(productActions.setLoading());

    const { data } = await axios.get(`/api/products/${productId}`);

    dispatch(productActions.setProduct(data));
  } catch (error) {
    dispatch(
      productActions.setError(
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

//  create  product
export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch(productActions.setLoading());

    const config = {
      headers: {
        Authorization: `Bearer ${getState().user.userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(`/api/products`, {}, config);

    dispatch(productActions.setCreatedProduct(data.product));
    toast.success(data.message);
  } catch (error) {
    dispatch(
      productActions.setError(
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

//  create  review
export const createReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch(productActions.setLoading());

      const config = {
        headers: {
          Authorization: `Bearer ${getState().user.userInfo.token}`,
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `/api/products/${productId}/reviews`,
        review,
        config
      );

      dispatch(productActions.setCreatedProductReviewSuccess(data.product));
      toast.success(data.message);
    } catch (error) {
      dispatch(
        productActions.setError(
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

//  update  product
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch(productActions.setLoading());

    const config = {
      headers: {
        Authorization: `Bearer ${getState().user.userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch(productActions.setupdatedProduct(data.product));
    toast.success(data.message);
  } catch (error) {
    dispatch(
      productActions.setError(
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

//  delete  product
export const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    dispatch(productActions.setLoading());

    const config = {
      headers: {
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/products/${productId}`, config);

    dispatch(productActions.setDeleteProductSuccess(data));
    toast.success(data.message);
  } catch (error) {
    dispatch(
      productActions.setError(
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
