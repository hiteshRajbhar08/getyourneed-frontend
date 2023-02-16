import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { detailsOrder } from '../redux/actions/orderAction';
import Loader from '../components/Loader';
import Message from '../components/Message';

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const dispatch = useDispatch();

  const { order, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);

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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
