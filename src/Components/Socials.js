import React from "react";
import "../Styles/Socials.css";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiOutlineMail,
  AiFillGoogleCircle,
} from "react-icons/ai";

const Socials = () => {
  return (
    <div className="social-god">
      <div class="button-block">
        <div class="social">
          <a href="/">
            {" "}
            <AiFillInstagram className="footer-social-icon" />
          </a>
        </div>
        <div class="social">
          <a href="/">
            {" "}
            <AiFillFacebook className="footer-social-icon" />
          </a>
        </div>
        <div class="social">
          <a href="/">
            {" "}
            <AiOutlineMail className="footer-social-icon" />
          </a>
        </div>
        <div class="social">
          <a href="/">
            {" "}
            <AiFillGoogleCircle className="footer-social-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Socials;
