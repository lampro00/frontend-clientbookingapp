import "./featuredProperties.css";
import { Link } from "react-router-dom";
const FeaturedProperties = (datas) => {
  let hotels = 0;
  let Apartments = 0,
    Resorts,
    Villas,
    Cabins;

  let ratinghotel = datas.datas.sort((m1, m2) => m2.rating - m1.rating);
  ratinghotel = ratinghotel.slice(0, 3);

  return (
    <div className="fp">
      {ratinghotel.map((a) => {
        return (
          <div className="fpItem">
            <img src={a.photos[0]} alt="" className="fpImg" />
            <span className="fpName">
              <Link to={`./hotels/${a._id}`}>{a.name}</Link>
            </span>
            <span className="fpCity">{a.city}</span>
            <span className="fpPrice">Starting from {a.cheapestPrice}</span>
          </div>
        );
      })}
      ;
    </div>
  );
};

export default FeaturedProperties;
