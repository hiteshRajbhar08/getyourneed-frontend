import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './slices/cartSlice';
import { orderReducer } from './slices/orderSlice';
import { productReducer } from './slices/productSlice';
import { userReducer } from './slices/userSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
  },
});

export default store;
