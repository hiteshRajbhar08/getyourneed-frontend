import { useLocation, useParams } from 'react-router-dom';

const CartScreen = () => {
  const { id: productId } = useParams();
  const location = useLocation();

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

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
