import { Button } from "react-bootstrap";
import React from "react";
import "../Styles/catStrip.css";
import { Link } from "react-router-dom";

function catStrip(props) {
  let catStripCss = {
    background: `linear-gradient(45deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${props.img})`,
    width: "100%",
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    transition: "0.5s ease-in-out",
  };

  const buttonClick = () => {};

  return (
    <div className="category-strip-main">
      <div className="category-strip" style={catStripCss}></div>
      <div className="category-strip-content">
        <h1 className="category-title">{props.Name}</h1>
        <p className="category-quote">{props.quote}</p>
        <Link to={`/categories/${props.index}`}>
          <Button className="category-button" onClick={buttonClick}>
            View Packages
          </Button>
        </Link>
        <br />
      </div>
    </div>
  );
}
export default catStrip;
