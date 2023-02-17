import { Link, useNavigate, useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { createReview, detailsProduct } from '../redux/actions/productAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { productActions } from '../redux/slices/productSlice';
import { toast } from 'react-toastify';

const ProductScreen = () => {
  const [qty, setQty] = useState(1);

  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    product,
    error,
    loading,
    createdProductReviewSuccess: success,
  } = useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.user);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (success) {
      setRating(0);
      setComment('');
      dispatch(productActions.setCreatedProductReviewSuccessReset());
    }
    dispatch(detailsProduct(id));
  }, [dispatch, id, success]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (comment && rating) {
      dispatch(createReview(id, { rating, comment, name: userInfo.name }));
    } else {
      toast.warn('Please enter comment and rating');
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Link className="btn-link" to="/">
        <button className="btn-home">Back to Home</button>
      </Link>
      {error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="row top">
            <div className="col-2">
              <img className="large" src={product.image} alt={product.name} />
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </li>
                <li>Pirce : ${product.price}</li>
                <li>
                  Description:
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">${product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Add to Cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h2 id="reviews">Reviews</h2>
            {product?.reviews?.length === 0 && (
              <Message>There is no review</Message>
            )}
            <ul>
              {product?.reviews?.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Write a customer review</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">Rating</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excelent</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Comment</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Submit
                      </button>
                    </div>
                    <div></div>
                  </form>
                ) : (
                  <Message>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </Message>
                )}
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
