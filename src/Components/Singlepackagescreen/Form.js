import React from "react";
import { HiCheckCircle, HiPhone, HiCheck } from "react-icons/hi";
import { useFormik } from "formik";
import firebase from "firebase";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "emailjs-com";

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
  if (!empData.message) {
    errors.message = "Please Enter your Message";
  }
  if (!empData.noOfPeople) {
    errors.noOfPeople = "Please Enter the number of people";
  }
  if (!empData.destination) {
    errors.destination = "Please Enter the destination";
  }
  if (!empData.budget) {
    errors.budget = "Please Enter your Budget";
  }
  return errors;
};

const Form = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      phNo: "",
      email: "",
      noOfPeople: "",
      message: "",
      destination: "",
      budget: "",
    },
    validate: ValidateForm,
    onSubmit: (values, { resetForm }) => {
      resetForm();
    },
  });
  const db = firebase.firestore();

  const getInTouch = (e) => {
    e.preventDefault();
    db.collection("GetInTouch")

      .add(formik.values)

      .then((docRef) => {
        db.collection("GetInTouch").doc(docRef.id).update({ id: docRef.id });
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
      });
  };

  function sendEmail(e) {
    e.preventDefault();
    db.collection("QuickEnquiries")

      .add(formik.values)

      .then(
        (docRef) => {
          formik.handleSubmit();
          emailjs
            .send(
              "service_bamc2hz",
              "template_szc8rfg",
              formik.values,
              "user_VBg8xCBfb5y3PPweXPV0B"
            )
            .then((response) => {
              toast.success(
                "Your request has been successfully submitted, we will contact you shortly."
              );
              db.collection("QuickEnquiries")
                .doc(docRef.id)
                .update({ id: docRef.id });
            });
        },
        (err) => {
          toast.error("An error occurred, please try again.");
        }
      );
  }

  return (
    <div>
      <ToastContainer />
      <div className="form-main-ak">
        <div className="form-main-ak1">
          <h6>Get in touch with our travel expert</h6>
          <div className="form-main-form-akk">
            <form onSubmit={formik.handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="rtyui">{formik.errors.name}</p>
              ) : null}
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="rtyui">{formik.errors.email}</p>
              ) : null}
              <input
                type="number"
                name="phNo"
                id="phone"
                placeholder="Phone Number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phNo}
              />
              {formik.touched.phNo && formik.errors.phNo ? (
                <p className="rtyui">{formik.errors.phNo}</p>
              ) : null}
              <input
                type="number"
                name="noOfPeople"
                placeholder="No Of People"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.noOfPeople}
              />
              {formik.touched.noOfPeople && formik.errors.noOfPeople ? (
                <p className="rtyui">{formik.errors.noOfPeople}</p>
              ) : null}
              <input
                type="number"
                name="budget"
                placeholder="Budget"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.budget}
              />
              {formik.touched.budget && formik.errors.budget ? (
                <p className="rtyui">{formik.errors.budget}</p>
              ) : null}
              <input
                type="text"
                name="destination"
                placeholder="Destination"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.destination}
              />
              {formik.touched.destination && formik.errors.destination ? (
                <p className="rtyui">{formik.errors.destination}</p>
              ) : null}
              <textarea
                className="akk-txtar"
                rows="4"
                name="message"
                placeholder="Message"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.message}
              />
              {formik.touched.message && formik.errors.message ? (
                <p className="rtyui">{formik.errors.message}</p>
              ) : null}
            </form>
            <div className="form-main-ass-ak">
              <p>
                <HiCheckCircle style={{ color: "green", fontSize: "18px" }} />{" "}
                We assure the privacy of your contact data.
              </p>
              <p>
                <HiCheckCircle style={{ color: "green", fontSize: "18px" }} />{" "}
                This data will only be used by our team to contact you and no
                other purposes.
              </p>
            </div>
            <div className="form-main-btn-ak">
              <button
                type="submit"
                onClick={formik.isValid ? getInTouch : null}
              >
                Send Enquiry
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="contac-info-ak">
        <div className="contact-info-akk-in">
          <h6>Got a Question?</h6>
          <hr />
          <p>
            Our Destination expert will be happy to help you resolve your
            queries for this tour.
          </p>
          <HiPhone style={{ color: "violet", fontSize: "19px" }} />
          <a href="tel:+917906114905">+91-7906114905</a>
          <h6>10:30 AM - 8:00 PM (Mon to Sat)</h6>
        </div>
      </div>

      <div className="why-pacauli-ak">
        <div className="why-pac-main">Why PacAuli</div>
        <div className="main-pac-content">
          <div className="last-why-pac-ak">
            <p className="l-main-pac-p">
              <HiCheck className="icon-bahar-ak" />
              10+ Years Of Experience
            </p>
            <p>We are working in the field for more than 10 Years.</p>
          </div>
          <div className="last-why-pac-ak">
            <p className="l-main-pac-p">
              <HiCheck className="icon-bahar-ak" />
              Expert Knowledge
            </p>
            <p>
              We have the core team of experts that are working in this field
              for over a decade.
            </p>
          </div>
          <div className="last-why-pac-ak">
            <p className="l-main-pac-p">
              {" "}
              <HiCheck className="icon-bahar-ak" />
              Local and Traditional Knowledge
            </p>
            <p>
              We value our tradition and knowledge of localism as for us these
              mountains are our home.
            </p>
          </div>
          <div className="last-why-pac-ak">
            <p className="l-main-pac-p">
              <HiCheck className="icon-bahar-ak" />
              Customer Delight
            </p>
            <p>
              We are always able to support you so that you have a hassle free
              experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
