import React from "react";
import "./Singlepackagescreen/Singlepackage.css";
const SingleReview = (props) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div key={props.key} className="sng-pack-review">
          <div className="sng-pack-review-img">
            <img
              className="review-user-image"
              src={props.img}
              alt={props.name}
            />
          </div>
          <div className="sng-pack-review-cnt">
            <h5>{props.name}</h5>
            <h6>{props.text}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleReview;
