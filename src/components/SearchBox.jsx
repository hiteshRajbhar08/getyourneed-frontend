import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="search">
        <input
          type="text"
          name="q"
          id="q"
          onChange={(e) => setKeyword(e.target.value)}
        ></input>
        <button className="primary" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
