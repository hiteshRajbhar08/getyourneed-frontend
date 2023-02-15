import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartAction';

const CartScreen = () => {
  const { id: productId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <div>
      <h1>CartScreen</h1>
      <p>
        ADD TO CART: productId: {productId} Qty: {qty}
      </p>
    </div>
  );
};

export default CartScreen;
