import React, { useState, useContext } from "react";
import { Card, Form, Button } from "react-bootstrap";
import firebase from "firebase";

import "./Login.css";
import "../Styles/Loginnew2.css";
import logo from "../Assets/kashti travels.png";
import { Redirect } from "react-router-dom";
import Imageupload from "./Imageupload";
import authContext from '../utils/auth-hook'

function UserRegistration() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "+91",
    city: "",
    email: "",
    age: "",
    gender: "Male",
  });
  const [profileImage, setProfileImage] = useState(null);
  const types = ["image/png", "image/jpeg", "image/jpg"];
  const auth = firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage();
  const [registered, setRegistered] = useState(false);
  const authData = useContext(authContext)

  // function handleProfileImageChange(event) {
  //   let selectedFile = event.target.files[0];
  //   if (selectedFile && types.includes(selectedFile.type)) {
  //     setProfileImage(selectedFile);
  //   } else {
  //     setProfileImage(null);
  //   }
  // }

  

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUserDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const registerUser = (event) => {
    event.preventDefault();
    auth.onAuthStateChanged((userCredentials) => {
      const uid = userCredentials.uid;
      const uploadTask = storage.ref("Users/" + uid).put(userDetails.image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (err) => {
          console.log(err.message);
        },
        () => {
          storage
            .ref("Users")
            .child(uid)
            .getDownloadURL()
            .then((imageUrl) => {
              db.collection("Users")
                .doc(uid)
                .set({
                  name: userDetails.name,
                  phone: userDetails.phone,
                  city: userDetails.city,
                  email: userDetails.email,
                  imageUrl: imageUrl,
                  age: userDetails.age,
                  gender: userDetails.gender,
                })
                .then(() => {
                  setRegistered(true);
                  authData.authTriggered()
                });
            });
        }
      );
    });
  };

  return (
    
    <div className="mainn">
      {registered && <Redirect to="/" />}
      <div className="section-log-ax" id="contact">
        <div className="form-container-ax">
          <img src={logo} className="form-img-ax" alt="login" />
          <form onSubmit={registerUser} className="contact-form-ax">
          <h3>USER REGISTRATION</h3>
          <Imageupload center="true" setData={setUserDetails}/>
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="age"
              placeholder="Age"
              value={userDetails.age}
              onChange={handleChange}
            />
            
              <select
                onChange={handleChange}
                className="auth-input"
                name="gender"
                value={userDetails.gender}

              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            
            <input
              type="text"
              placeholder="Phone Number"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={userDetails.city}
              onChange={handleChange}
            />
            <input
              type="text"
              name="email"
              placeholder="Email Address"
              value={userDetails.email}
              onChange={handleChange}
            />
            {/* <Form.Group style={{ textAlign: "left" }}>
               <Form.File
                 id="userImage"
                 label="Profile Picture"
                 onChange={handleProfileImageChange}
               />
             </Form.Group> */}
            <input type="submit" value="Register" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserRegistration;
