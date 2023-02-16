import { Link, useNavigate, useParams } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { detailsOrder, payOrder } from '../redux/actions/orderAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
import axios from 'axios';
import { orderActions } from '../redux/slices/orderSlice';

const OrderScreen = () => {
  const [sdkReady, setSdkReady] = useState(false);

  const { id: orderId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { order, loading, error } = useSelector((state) => state.order);
  const {
    error: errorPay,
    success,
    loading: loadingPay,
  } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }

    const addPayPalScript = async () => {
      const { data } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order._id || success || (order && order._id !== orderId)) {
      dispatch(orderActions.setOrderPayReset());
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, navigate, order, sdkReady, userInfo, success]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  if (loading) {
    return <Loader />;
  }

  return error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1 style={{ textDecoration: 'underline', textAlign: 'center' }}>
        Order {order._id}
      </h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2
                  style={{ textDecoration: 'underline', textAlign: 'center' }}
                >
                  Shipping
                </h2>
                <p>
                  <strong>Name:</strong> {order?.shippingAddress?.fullName}
                  <br />
                  <strong>Address: </strong> {order?.shippingAddress?.address},
                  {order?.shippingAddress?.city},
                  {order?.shippingAddress?.postalCode},
                  {order?.shippingAddress?.country}
                </p>
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered at {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">Not Delivered</Message>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2
                  style={{ textDecoration: 'underline', textAlign: 'center' }}
                >
                  Payment
                </h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant="success">Paid at {order.paidAt}</Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2
                  style={{ textDecoration: 'underline', textAlign: 'center' }}
                >
                  Order Items
                </h2>
                <ul>
                  {order?.orderItems?.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2
                  style={{ textDecoration: 'underline', textAlign: 'center' }}
                >
                  Order Summary
                </h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${order.itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${order.shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${order.taxPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>${order.totalPrice}</strong>
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <Loader></Loader>
                  ) : (
                    <>
                      {errorPay && (
                        <Message variant="danger">{errorPay}</Message>
                      )}
                      {loadingPay && <Loader />}
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    </>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
