import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceorderScreen from './screens/PlaceorderScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import Toast from './utils/Toast';

const App = () => {
  return (
    <Router>
      <div className="grid-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/shipping" element={<ShippingAddressScreen />} />
            <Route path="/payment" element={<PaymentMethodScreen />} />
            <Route path="/placeorder" element={<PlaceorderScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfileScreen />
                </PrivateRoute>
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
