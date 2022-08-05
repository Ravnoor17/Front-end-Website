import React from "react";
import { Col, Row } from "react-bootstrap";
import { AiFillInstagram, AiFillFacebook } from "react-icons/ai";

import "../Styles/TeamSocials.css";

function TeamSocials(props) {
  return (
    <div className="team-socials-main-div">
      <p className="team-socials-text">Connect online</p>
      <Row className="team-socials-row">
        {props.instagram && (
          <Col className="team-socials-col">
            <a href={props.instagram}>
              <AiFillInstagram
                style={props.color && { color: `${props.color}` }}
                className="team-social-icon"
              />
            </a>
          </Col>
        )}
        {props.facebook && (
          <Col className="team-socials-col">
            <a href={props.facebook}>
              <AiFillFacebook
                style={props.color && { color: `${props.color}` }}
                className="team-social-icon"
              />
            </a>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default TeamSocials;
