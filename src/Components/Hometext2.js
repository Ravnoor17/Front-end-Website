import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import "../Styles/Hometext2.css";
import { Link } from "react-router-dom";

const Hometext = (props) => {
  return (
    <div className="hometext-god">
      <Container>
        <div className="headdd">
          <h1>
            {props.mainheading}
          </h1>
        </div>
        <br />
        <br />
        <Row>
          <Col sm={12} lg={6} xs={12}>
            <Row data-aos="fade-left">
              <div className="headings-aks">
                {" "}
                <div className="photuu">
                  <img src={props.src1} />
                </div>
              </div>
            </Row>
            {/* <Row>
              <div className="headings-aks">
                <h1 class="soul regaltoss">
                  <span>{props.heading1}</span>
                </h1>
              </div>
            </Row>

            <Row>
              <div className="headings-aks">
                <div className="captionn">{props.caption1}</div>
              </div>
            </Row> */}
          </Col>
          <Col sm={12} lg={6} xs={12}>
            <Row>
              <div className="headings-aks">
                <h1 class="soul regaltoss">
                  <span>{props.heading2}</span>
                </h1>
              </div>
            </Row>
            <Row>
              <div className="headings-aks">
                <div className="captionn">{props.caption2}</div>
              </div>
            </Row>
            <Row className="explore-btn00">
              <Link to={props.link} class="horizontall">
                <span class="text">Explore More</span>
              </Link>
            </Row>
            {/* <Row data-aos="fade-right">
              <div className="headings-aks">
                <div className="photuu">
                  <img src={props.src2} />
                </div>
              </div>
            </Row> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hometext;
