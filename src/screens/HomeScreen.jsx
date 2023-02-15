import data from '../data';

const HomeScreen = () => {
  return (
    <div>
      <div className="row center">
        {data.products.map((product) => (
          <div key={product._id} className="card">
            <a href={`/product/${product._id}`}>
              <img className="medium" src={product.image} alt="product" />
            </a>
            <div className="card-body">
              <a href={`/product/${product._id}`}>
                <h2>{product.name}</h2>
              </a>
              <div className="rating">
                <span>
                  <i className="fa fa-star"></i>
                </span>
                <span>
                  <i className="fa fa-star"></i>
                </span>
                <span>
                  <i className="fa fa-star"></i>
                </span>
                <span>
                  <i className="fa fa-star"></i>
                </span>
                <span>
                  <i className="fa fa-star-half-o"></i>
                </span>
              </div>
              <div className="price">${product.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
