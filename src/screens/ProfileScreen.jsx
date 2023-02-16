import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser } from '../redux/actions/userAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../redux/slices/userSlice';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);
  const {
    userDetails: user,
    loading,
    error,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.name) {
      dispatch(userActions.setUserUpdateReset());
      dispatch(getUserDetails(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo, navigate, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Password and confirm password are not match');
    }
    const userData = {
      userId: user._id,
      name,
      email,
      password,
    };

    dispatch(updateUser(userData));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1 style={{ textDecoration: 'underline', textAlign: 'center' }}>
            User Profile
          </h1>
        </div>
        {error && <Message variant="danger">{error}</Message>}
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
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword">confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Enter confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileScreen;
