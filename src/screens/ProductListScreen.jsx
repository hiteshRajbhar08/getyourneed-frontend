import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProduct, listProducts } from '../redux/actions/productAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { productActions } from '../redux/slices/productSlice';

const ProductListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    products,
    loading,
    error,
    createdProductSuccess: success,
    createdProduct,
  } = useSelector((state) => state.product);

  useEffect(() => {
    if (success) {
      dispatch(productActions.setCreatedProductReset());
      navigate(`/product/${createdProduct._id}/edit`);
    }
    dispatch(listProducts());
  }, [dispatch, createdProduct, navigate, success]);

  const createHandler = () => {
    dispatch(createProduct());
  };
  const deleteHandler = () => {};

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="row">
        <h1 style={{ textDecoration: 'underline' }}>Products</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Create Product
        </button>
      </div>
      {error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() => navigate(`/product/${product._id}/edit`)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ProductListScreen;
