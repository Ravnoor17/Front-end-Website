import React, { useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../Styles/ContactUs.css";
import email from "../Assets/email.png";
import location from "../Assets/location.png";
import phone from "../Assets/phone.png";
import shape from "../Assets/shape.png";
import firebase from "firebase";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";

import $ from "jquery";
import { useFormik } from "formik";

const ValidateForm = (empData) => {
  const errors = {};

  if (!empData.name) {
    errors.name = "Please Enter Your Name";
  } else if (empData.name.length > 20) {
    errors.name = "Name Should Not Exeed 20 Characters";
  }

  if (!empData.phNo) {
    errors.phNo = "Please Enter Your Phone number";
  } else if (
    !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(empData.phNo)
  ) {
    errors.phNo = "Phone Number you entered is invalid";
  }

  if (!empData.email) {
    errors.email = "Please Enter Your Email Adress";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(empData.email)) {
    errors.email = "Email address you entered in invalid";
  }
  if (!empData.message) {
    errors.message = "Please Enter your Message";
  }
  return errors;
};

const ContactUs = () => {
  useEffect(() => {
    $(document).ready(function () {
      $(this).scrollTop(0);
    });
  }, []);

  useEffect(() => {
    const inputs = document.querySelectorAll(".contact-input");

    if (inputs) {
      inputs.forEach((input) => {
        input.addEventListener("focus", () => {
          input.parentNode.classList.add("focus");
        });
        input.addEventListener("blur", () => {
          if (input.value === "") {
            input.parentNode.classList.remove("focus");
          }
        });
      });
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      phNo: "",
      email: "",
      message: "",
    },
    validate: ValidateForm,
    onSubmit: (values, { resetForm }) => {
      resetForm();
    },
  });

  const db = firebase.firestore();

  const addEnquiry = (e) => {
    e.preventDefault();
    db.collection("Enquiries")
      .add(formik.values)
      .then((docRef) => {
        db.collection("Enquiries").doc(docRef.id).update({ id: docRef.id });
        emailjs
          .send(
            "service_bamc2hz",
            "template_t9icbvw",
            formik.values,
            "user_VBg8xCBfb5y3PPweXPV0B"
          )
          .then(() => {
            toast.success(
              "Your request has been successfully submitted, we will contact you shortly."
            );
          });
      });
  };

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="contact-us-main">
        {/* <div className="heading-contact">
          <p>&nbsp;&nbsp;Contact Us&nbsp;&nbsp;</p>
        </div> */}
        <div className="heading-alt-3">
          <h2>Contact Us</h2>
          <h2>Contact Us</h2>
        </div>
        <div className="contact-us-container">
          <span className="big-circle"></span>
          <img src={shape} className="square" alt=""></img>
          <div className="contact-us-form">
            <div className="contact-info">
              <h3 className="contact-info-title">Let's get in touch</h3>
              <p className="contact-info-text">
                Our connection with our customers in not limited to the time of
                their journey with us. We believe in being there for our
                customers before and after the trip. In case you need some kind
                of help, here's how you can reach out to us.
              </p>
              <div className="info">
                <div className="information">
                  <img
                    src={location}
                    alt="Location"
                    className="contact-info-icon"
                  />
                  <p>Bir, Himachal Pradesh</p>
                </div>
              </div>
              <div className="info">
                <div className="information">
                  <img
                    src={email}
                    alt="Location"
                    className="contact-info-icon"
                  />
                  <p>
                    <a
                      className="contact-us-link"
                      
                    >
                      info@kashtitravels.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="info">
                <div className="information">
                  <img
                    src={phone}
                    alt="Location"
                    className="contact-info-icon"
                  />
                  <p>
                    <a className="contact-us-link" href="tel:917906114905">
                      +91-9815410772
                    </a>
                  </p>
                </div>
              </div>
              <div className="social-media">
                <p>Connect with us:</p>
                <div className="social-icons">
                  <a >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a >
                    <i class="fas fa-envelope"></i>
                  </a>
                  <a >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a >
                    <i class="fab fa-google"></i>
                  </a>
                  <a >
                    <i class="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <span className="circle one"></span>
              <span className="circle two"></span>
              <form className="contact-us-main-form">
                <h3 className="contact-form-title">Contact Us</h3>

                <div
                  className="contact-form-input-container"
                  style={formik.errors.name ? { marginBottom: "0" } : null}
                >
                  <input
                    type="text"
                    name="name"
                    className="contact-input"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />

                  <label className="contact-form-label" for="">
                    Name
                  </label>
                  <span>Name</span>
                </div>

                {formik.touched.name && formik.errors.name ? (
                  <p className="errt">{formik.errors.name}</p>
                ) : null}
                <div
                  className="contact-form-input-container"
                  style={formik.errors.phNo ? { marginBottom: "0" } : null}
                >
                  <input
                    type="text"
                    name="phNo"
                    className="contact-input"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.phNo}
                  />

                  <label className="contact-form-label" for="">
                    Phone Number
                  </label>
                  <span>Phone Number</span>
                </div>

                {formik.touched.phNo && formik.errors.phNo ? (
                  <p className="errt">{formik.errors.phNo}</p>
                ) : null}

                <div
                  className="contact-form-input-container"
                  style={formik.errors.email ? { marginBottom: "0" } : null}
                >
                  <input
                    id="Email"
                    type="email"
                    name="email"
                    className="contact-input"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />

                  <label className="contact-form-label" for="">
                    Email
                  </label>
                  <span>Email</span>
                </div>

                {formik.touched.email && formik.errors.email ? (
                  <p className="errt">{formik.errors.email}</p>
                ) : null}

                <div
                  className="contact-form-input-container contact-textarea"
                  style={formik.errors.message ? { marginBottom: "0" } : null}
                >
                  <textarea
                    name="message"
                    cols=""
                    rows=""
                    className="contact-input"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.message}
                  />

                  <label className="contact-form-label" for="">
                    Message
                  </label>
                  <span>Message</span>
                </div>
                {formik.touched.message && formik.errors.message ? (
                  <p className="errt">{formik.errors.message}</p>
                ) : null}

                <input
                  type="button"
                  value="Submit"
                  onClick={formik.isValid ? addEnquiry : null}
                  className="contact-button"
                  style={formik.errors.message ? { marginTop: "0" } : null}
                ></input>
              </form>
            </div>
          </div>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#222222"
          fill-opacity="1"
          d="M0,256L48,245.3C96,235,192,213,288,181.3C384,149,480,107,576,117.3C672,128,768,192,864,202.7C960,213,1056,171,1152,138.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <Footer />
    </div>
  );
};

export default ContactUs;
