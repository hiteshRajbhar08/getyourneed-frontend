import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <>
      <header className="row">
        <div>
          <Link
            to="/"
            style={{ textDecoration: 'underline' }}
            className="brand"
          >
            getyourneed.
          </Link>
        </div>
        <div>
          <Link to="/cart">
            Cart
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </Link>
          <Link to="/signin">Sign In</Link>
        </div>
      </header>
    </>
  );
};

export default Header;
