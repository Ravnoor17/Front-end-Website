import React from "react";
import { Col, Row } from "react-bootstrap";
import "../Styles/Footer.css";
import Socials from "../Components/Socials";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiOutlineMail,
  AiFillGoogleCircle,
  AiFillYoutube,
} from "react-icons/ai";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <div className="footer-main-div">
        <Row>
          <Col lg={3} md={6} sm={12}>
            <div className="footer-about-section">
              <h3 className="footer-section-title">About Us</h3>
              <div className="footer-section-content-div">
                <p className="footer-section-content">
                North India’s well-known and one of the best trekking, skiing, expedition and biking organisation. The company is headquartered in bir,Himachal Pradesh an adventure hotspot. Every year, people choose Kashti Travels because of our unrivalled tradition, experience, local knowledge and quality standards.
                </p>
              </div>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12}>
            <div className="footer-quick-links-section">
              <h3 className="footer-section-title">Quick Links</h3>
              <div className="footer-section-content-div">
                <Link to="/categories">
                  <p className="footer-section-content">All Categories</p>
                </Link>
                <Link to="/custompackage">
                  <p className="footer-section-content">Custom Package</p>
                </Link>
                <Link to="/contactus">
                  <p className="footer-section-content">Contact Us</p>
                </Link>
                <Link to="/aboutus">
                  <p className="footer-section-content">About Us</p>
                </Link>
              </div>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12}>
            <div className="footer-top-packages-section">
              <h3 className="footer-section-title">Package Types</h3>
              <div className="footer-section-content-div">
                <Row>
                  <Col>
                    <Link to="/categories/0">
                      <p className="footer-section-content">Trekking</p>
                    </Link>
                    <Link to="/categories/1">
                      <p className="footer-section-content">Expedition</p>
                    </Link>
                    <Link to="/categories/2">
                      <p className="footer-section-content">Skiing</p>
                    </Link>
                    <Link to="/categories/3">
                      <p className="footer-section-content">Camping</p>
                    </Link>
                    <Link to="/categories/4">
                      <p className="footer-section-content">Spiritual Tours</p>
                    </Link>
                  </Col>
                  <Col>
                    <Link to="/categories/5">
                      <p className="footer-section-content">Bike Trips</p>
                    </Link>
                    <Link to="/categories/6">
                      <p className="footer-section-content">Rafting</p>
                    </Link>
                    <Link to="/categories/7">
                      <p className="footer-section-content">Cycling</p>
                    </Link>
                    <Link to="/categories/8">
                      <p className="footer-section-content">Rock Climbing</p>
                    </Link>
                    <Link to="/categories/9">
                      <p className="footer-section-content">Snowboarding</p>
                    </Link>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12}>
            <div className="footer-contact-section">
              <h3 className="footer-section-title">Connect With Us</h3>
              <div className="footer-section-content-div">
                <a href="tel:+917906114905">
                  <p className="footer-section-content">
                    Phone : +91-9815410772
                  </p>
                </a>
                <a >
                  <p className="footer-section-content">
                    Email : info@kashtitravels.com
                  </p>
                </a>
                <p className="footer-section-content">
                  Address : bir, Himachal Pradesh
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <hr className="footer-divider" />
        <div className="footer-socials">
          <a >
            <AiFillInstagram className="footer-social-icon" />
          </a>
          <a >
            <AiFillFacebook className="footer-social-icon" />
          </a>
          <a>
            <AiOutlineMail className="footer-social-icon" />
          </a>
          <a >
            <AiFillGoogleCircle className="footer-social-icon" />
          </a>
          <a>
            <AiFillYoutube className="footer-social-icon" />
          </a>
        </div>
        <div className="footer-last">
          <p className="footer-copyright-content">
            Copyright © 2021 Kashti Travels. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
