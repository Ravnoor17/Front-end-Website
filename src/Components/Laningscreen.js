import React from "react";
import "../Styles/Landingscreen.css";
import { Carousel } from "react-bootstrap";
import Search from "../Components/search"
import { Link } from "react-router-dom";

const Laningscreen = () => {
  return (
    <div className="home-carousel">
      <Carousel>
       
        <Carousel.Item className="container-fluid carousel-item item-two">
          <div className="landing-div">
            <h1 className="carousel-title">Take The Road Not Taken</h1>
            <h4 className="carousel-subtitle">
              Travelling is what makes us feel alive
            </h4>
            <div>
            <Search/>
            </div>
          </div>
        </Carousel.Item>
        
      </Carousel>
    </div>
  );
};

export default Laningscreen;

// <Row>
// {
//     arr.map((n, m) =>
//         <Col md={4}>
//             <Landingcard />
//         </Col>
//     )
// }
// </Row>
