import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { saveShippingAddress } from '../redux/actions/cartAction';

const ShippingAddressScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin');
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (fullName.trim() === '') return toast.error('Fullname is required');
    if (address.trim() === '') return toast.error('address is required');
    if (city.trim() === '') return toast.error('city is required');
    if (postalCode.trim() === '') return toast.error('postalCode is required');
    if (country.trim() === '') return toast.error('country is required');

    const data = {
      fullName,
      address,
      city,
      postalCode,
      country,
    };
    dispatch(saveShippingAddress(data));

    navigate('/payment');
  };

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1 style={{ textDecoration: 'underline', textAlign: 'center' }}>
            Shipping Address
          </h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingAddressScreen;
