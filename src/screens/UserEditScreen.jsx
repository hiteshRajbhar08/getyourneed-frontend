import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, setToUpdateUser } from '../redux/actions/userAction';
import { userActions } from '../redux/slices/userSlice';

const UserEditScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id: userId } = useParams();

  const {
    loading,
    error,
    userDetails: user,
    updateUserSuccess,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (updateUserSuccess) {
      dispatch(userActions.setUserUpdateReset());
      navigate('/userlist');
    }
    if (!user.name) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, navigate, updateUserSuccess, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      _id: user._id,
      name,
      email,
      isAdmin,
    };

    dispatch(setToUpdateUser(userData));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit User {name}</h1>
        </div>
        {error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="isAdmin">Is Admin</label>
              <input
                id="isAdmin"
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></input>
            </div>
            <div>
              <button type="submit" className="primary">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default UserEditScreen;
