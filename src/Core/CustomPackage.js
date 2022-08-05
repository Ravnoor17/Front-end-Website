import React, { useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../Styles/CustomPackage.css";
import shape from "../Assets/shape.png";
import custi from "../Assets/custompackage.svg";
import firebase from "firebase";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import emailjs from "emailjs-com";
import $ from "jquery";

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
    errors.phNo = "Phone Number You Entered is invalid";
  }

  if (!empData.email) {
    errors.email = "Please Enter Your Email Adress";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(empData.email)) {
    errors.email = "Email address you entered in invalid";
  }
  if (!empData.destination) {
    errors.destination = "Please Enter your Destination";
  }
  if (!empData.budget) {
    errors.budget = "Please Enter your Budget";
  }
  if (!empData.message) {
    errors.message = "Please Enter your Message";
  }
  if (!empData.noOfPeople) {
    errors.noOfPeople = "Please Enter Number Of People";
  }
  return errors;
};

const ContactUs = () => {
  const db = firebase.firestore();

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
      budget: "",
      destination: "",
      message: "",
      noOfPeople: "",
    },
    validate: ValidateForm,
    onSubmit: (values, { resetForm }) => {
      resetForm();
    },
  });

  const addRequest = (e) => {
    e.preventDefault();
    db.collection("CustomPackages")

      .add(formik.values)

      .then(
        (docRef) => {
          formik.handleSubmit();
          db.collection("CustomPackages")
            .doc(docRef.id)
            .update({ id: docRef.id });
          emailjs
            .send(
              "service_bamc2hz",
              "template_szc8rfg",
              formik.values,
              "user_VBg8xCBfb5y3PPweXPV0B"
            )
            .then(() => {
              toast.success(
                "Your request has been successfully submitted, we will contact you shortly."
              );
            });
        },
        (err) => {
          toast.error("An error occurred, please try again.");
        }
      );
  };

  useEffect(() => {
    $(document).ready(function () {
      $(this).scrollTop(0);
    });
  }, []);

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="contact-us-main">
        {/* <div className="heading-custom">
          <p>&nbsp;&nbsp;Custom Package&nbsp;&nbsp;</p>
        </div> */}
        <div className="heading-alt-2">
          <h2>Custom Package</h2>
          <h2>Custom Package</h2>
        </div>
        <div className="contact-us-container">
          <span className="big-circle"></span>
          <img src={shape} className="square" alt=""></img>
          <div className="contact-us-form">
            <div className="contact-info">
              <div className="funi">
                <h3 className="contact-info-title">Request A Custom Package</h3>
                <p className="contact-info-text">
                  Not everyone has the same expectations, same outlook towards a
                  trip. Everyone has something different in their mind for their
                  vacations. And for all that, we've got you covered.
                </p>
              </div>
              <img id="yuiop" src={custi} alt="custom"></img>
            </div>
            <div className="contact-form">
              <span className="circle one"></span>
              <span className="circle two"></span>

              <form
                className="contact-us-main-form"
                onSubmit={formik.handleSubmit}
              >
                <h3 className="contact-form-title">
                  Let us know what you need
                </h3>
                <div
                  className="contact-form-input-container"
                  style={formik.errors.name ? { marginBottom: "0" } : null}
                >
                  <input
                    type="text"
                    name="name"
                    className="contact-input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />

                  <label className="contact-form-label" for="">
                    Name
                  </label>
                  <span>Name</span>
                </div>

                {formik.touched.name && formik.errors.name ? (
                  <p class="errt">{formik.errors.name}</p>
                ) : null}
                <div
                  className="contact-form-input-container"
                  style={formik.errors.phNo ? { marginBottom: "0" } : null}
                >
                  <input
                    type="text"
                    name="phNo"
                    className="contact-input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phNo}
                  />

                  <label className="contact-form-label" for="">
                    Phone Number
                  </label>
                  <span>Phone Number</span>
                </div>

                {formik.touched.phNo && formik.errors.phNo ? (
                  <p class="errt">{formik.errors.phNo}</p>
                ) : null}
                <div
                  className="contact-form-input-container"
                  style={formik.errors.email ? { marginBottom: "0" } : null}
                >
                  <input
                    type="email"
                    name="email"
                    className="contact-input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />

                  <label className="contact-form-label" for="">
                    Email
                  </label>
                  <span>Email</span>
                </div>

                {formik.touched.email && formik.errors.email ? (
                  <p class="errt">{formik.errors.email}</p>
                ) : null}
                <div
                  className="contact-form-input-container"
                  style={
                    formik.errors.destination ? { marginBottom: "0" } : null
                  }
                >
                  <input
                    type="text"
                    name="destination"
                    className="contact-input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.destination}
                  />

                  <label className="contact-form-label" for="">
                    Destination
                  </label>
                  <span>Destination</span>
                </div>

                {formik.touched.destination && formik.errors.destination ? (
                  <p class="errt">{formik.errors.destination}</p>
                ) : null}
                <div
                  className="contact-form-input-container"
                  style={
                    formik.errors.noOfPeople ? { marginBottom: "0" } : null
                  }
                >
                  <input
                    type="text"
                    name="noOfPeople"
                    className="contact-input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.noOfPeople}
                  />

                  <label className="contact-form-label" for="">
                    No Of People
                  </label>
                  <span>No Of People</span>
                </div>

                {formik.touched.noOfPeople && formik.errors.noOfPeople ? (
                  <p class="errt">{formik.errors.noOfPeople}</p>
                ) : null}
                <div
                  className="contact-form-input-container"
                  style={formik.errors.budget ? { marginBottom: "0" } : null}
                >
                  <input
                    type="text"
                    name="budget"
                    className="contact-input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.budget}
                  />

                  <label className="contact-form-label" for="">
                    Budget
                  </label>
                  <span>Budget</span>
                </div>

                {formik.touched.budget && formik.errors.budget ? (
                  <p class="errt">{formik.errors.budget}</p>
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                  />

                  <label className="contact-form-label" for="">
                    Message
                  </label>
                  <span>Message</span>
                </div>
                {formik.touched.message && formik.errors.message ? (
                  <p class="errt">{formik.errors.message}</p>
                ) : null}
                <input
                  type="button"
                  value="Submit"
                  onClick={formik.isValid ? addRequest : null}
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
