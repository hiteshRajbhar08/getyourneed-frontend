import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/userAction';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(logoutUser());
  };

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
          {userInfo ? (
            <div className="dropdown">
              <Link style={{ textDecoration: 'underline' }} to="#">
                <i className="fa fa-user"></i> {userInfo.name}{' '}
                <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/profile">User Profile</Link>
                </li>
                <li>
                  <Link to="/orderhistory">Order History</Link>
                </li>
                <li>
                  <Link to="#signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
