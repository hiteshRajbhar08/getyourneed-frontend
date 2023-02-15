import Product from '../components/Product';
import { useEffect } from 'react';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/actions/productAction';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
