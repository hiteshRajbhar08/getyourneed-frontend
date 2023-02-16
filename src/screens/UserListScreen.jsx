import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { userActions } from '../redux/slices/userSlice';
import { deleteUser, listUsers } from '../redux/actions/userAction';

const UserListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    listUsers: users,
    loading,
    error,
    deleteUserSuccess,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (deleteUserSuccess) {
      dispatch(userActions.setDeleteReset());
    }
    dispatch(listUsers());
  }, [dispatch, deleteUserSuccess]);

  const deleteHandler = (userId) => {
    dispatch(deleteUser(userId));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Users</h1>
      {error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>IS SELLER</th>
              <th>IS ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isSeller ? 'YES' : ' NO'}</td>
                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => navigate(`/user/${user._id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserListScreen;
