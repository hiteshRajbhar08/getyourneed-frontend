const Header = () => {
  return (
    <>
      <header className="row">
        <div>
          <a
            style={{ textDecoration: 'underline' }}
            className="brand"
            href="index.html"
          >
            getyourneed.
          </a>
        </div>
        <div>
          <a href="cart.html">Cart</a>
          <a href="signin.html">Sign In</a>
        </div>
      </header>
    </>
  );
};

export default Header;
