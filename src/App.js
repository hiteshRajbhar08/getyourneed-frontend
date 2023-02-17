import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRoute from './components/AdminRoute';
import Footer from './components/Footer';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderListScreen from './screens/OrderListScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceorderScreen from './screens/PlaceorderScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';
import Toast from './utils/Toast';

const App = () => {
  return (
    <Router>
      <div className="grid-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/search/:keyword" element={<HomeScreen />} />
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/shipping" element={<ShippingAddressScreen />} />
            <Route path="/payment" element={<PaymentMethodScreen />} />
            <Route path="/placeorder" element={<PlaceorderScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />
            <Route path="/orderhistory" element={<OrderHistoryScreen />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfileScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/productlist"
              element={
                <AdminRoute>
                  <ProductListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/product/:id/edit"
              element={
                <AdminRoute>
                  <ProductEditScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/orderlist"
              element={
                <AdminRoute>
                  <OrderListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/userlist"
              element={
                <AdminRoute>
                  <UserListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/user/:id/edit"
              element={
                <AdminRoute>
                  <UserEditScreen />
                </AdminRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toast />
    </Router>
  );
};

export default App;
