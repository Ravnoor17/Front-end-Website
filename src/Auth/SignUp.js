import { Link, Redirect } from "react-router-dom";
import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import firebase from "firebase";
import { toast, ToastContainer } from "react-toastify";
import "../Styles/Loginnew.css";
import logo from "../Assets/kashti travels.png";
function SignUp() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const auth = firebase.auth();
  const [redirect, setRedirect] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCredentials((prev) => {
      return { ...prev, [name]: value };
    });
  };

  function handleSignup(event) {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        user
          .sendEmailVerification()
          .then(() => {
            toast.success("Check your email inbox !!!");
            setCredentials({ email: "", password: "" });
          })
          .catch((e) => {
            toast.error("ERROR : " + e.message);
          });
        auth.signOut();
        setRedirect(true);
      })
      .catch((err) => {
        toast.error("ERROR : " + err.message);
      });
  }

  return (
    // <div className="auth-main">
    //   <ToastContainer />
    //   {redirect && <Redirect to="/signin" />}
    //   <img src={logo} className="logo-auth" alt="logo" />
    //   <div className="auth-card-div">
    //     <Card className="auth-card">
    //       <h3 className="auth-title">Sign Up</h3>
    //       <Form className="auth-form">
    //         <Form.Group>
    //           <Form.Control
    //             className="auth-input"
    //             type="text"
    //             name="email"
    //             placeholder="Email Address"
    //             value={credentials.email}
    //             onChange={handleChange}
    //           />
    //         </Form.Group>
    //         <Form.Group>
    //           <Form.Control
    //             className="auth-input"
    //             type="password"
    //             name="password"
    //             placeholder="Password"
    //             value={credentials.password}
    //             onChange={handleChange}
    //           />
    //         </Form.Group>
    //         <Button onClick={handleSignup} className="auth-button">
    //           Sign Up
    //         </Button>
    //       </Form>
    //       <p className="auth-bottom-text">
    //         Already registered?{" "}
    //         <Link className="auth-link" to="/signin">
    //           Sign In
    //         </Link>
    //       </p>
    //     </Card>
    //   </div>
    // </div>
    <div>
      <ToastContainer />
      {redirect && <Redirect to="/signin" />}
      <div className="section-log-a" id="contact">
        <div className="form-container-a">
          <img src={logo} className="form-img-a" alt="signup" />
          <form onSubmit={handleSignup}  className="contact-form-a">
            <h3>SIGN UP</h3>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
            <input type="submit" value="Sign Up" />
            <p>
              Already registered? <Link to="/signin">Login here</Link>
            </p>
            <br />
            <hr className="line-bro" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
