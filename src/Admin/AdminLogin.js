import React, { useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import "../Styles/AdminLogin.css";
import admin from "../Assets/admin.png";
import firebase from "firebase";
import { reactLocalStorage } from "reactjs-localstorage";
import { Redirect } from "react-router";
import { toast, ToastContainer } from "react-toastify";

function AdminLogin() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const db = firebase.firestore();
  const auth = firebase.auth();
  const [isAdmin, setAdmin] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCredentials((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const signin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        if (user) {
          const uid = user.uid;
          db.collection("Admin")
            .doc(uid)
            .get()
            .then((querySnapshot) => {
              const data = querySnapshot.data();

              if (data.role === "admin") {
                reactLocalStorage.setObject("pacauli-admin", {
                  email: credentials.email,
                  uid: uid,
                  role: "admin",
                });
                setAdmin(true);
              } else {
                auth.signOut();
                setCredentials({ email: "", password: "" });
              }
            });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="admin-login-main-div">
      {isAdmin ? <Redirect to="/admin/dashboard" /> : null}
      <ToastContainer />
      <Row className="admin-login-row">
        <Col className="admin-login-colored-col" lg={3} md={6} sm={12}>
          <div>
            <img className="admin-login-png" src={admin} alt="admin" />
          </div>
          <div>
            <h3 className="admin-login-heading">Welcome Admin</h3>
          </div>
          <div>
            <p className="admin-login-text">
              Please sign in to verify it's really you.
            </p>
          </div>
        </Col>
        <Col className="admin-login-form-col" lg={9} md={6} sm={12}>
          <div>
            <h3 className="admin-login-form-heading">Admin Login</h3>
            <p className="admin-login-form-text">
              Enter your login details below.
            </p>
            <div className="admin-login-form">
              <Form>
                <Form.Group>
                  <Form.Control
                    className="admin-login-form-input"
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    className="admin-login-form-input"
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button onClick={signin} className="admin-login-form-button">
                  Login
                </Button>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default AdminLogin;
