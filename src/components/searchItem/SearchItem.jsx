import "./searchItem.css";

const SearchItem = (prop) => {
  console.log(prop);
  return (
    <div>
      {prop.data.map((h) => {
        return (
          <div className="searchItem">
            <img src={h._doc.photos[0]} alt="" className="siImg" />
            <div className="siDesc">
              <h1 className="siTitle">{h._doc.name}</h1>
              <span className="siDistance">{h._doc.distance} from center</span>

              <span className="siSubtitle">{h._doc.desc}</span>
              <span className="siFeatures">{h._doc.type}</span>

              <div>
                <span className="siCancelOp">Free cancellation </span>
                <span className="siCancelOpSubtitle">
                  You can cancel later, so lock in this great price today!
                </span>
              </div>
            </div>
            <div className="siDetails">
              <div className="siRating">
                <span>Rating</span>
                <button>{h.rating}</button>
              </div>
              <div className="siDetailTexts">
                <span className="siPrice">{h.cheapestPrice}</span>
                <span className="siTaxOp">Includes taxes and fees</span>
                <button
                  className="siCheckButton "
                  data-toggle="collapse"
                  data-target={`#demo${h._doc._id}${h.id} `}
                >
                  See availability
                </button>
              </div>
              <div
                id={`demo${h._doc._id}${h.id}`}
                className="collapse container-fluid"
              >
                {h.number.map((r) => (
                  <label className="form-check-label" for="check1">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="check1"
                      name={h._id}
                      value={r}
                    />
                    {r}
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
//
export default SearchItem;
