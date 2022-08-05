import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { Form } from "react-bootstrap";
import Footer from "../Components/Footer";
import shape from "../Assets/shape.png";
import Header from "../Components/Header";
import "../Styles/editUserDetails.css";
import { Redirect } from "react-router-dom";
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";
import LoadingScreen from "../Components/LoadingScreen";

function EditUser() {
  const auth = firebase.auth();

  let uid = "";
  const [name, setName] = useState("");

  const [phoneno, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [age,setAge]=useState(0);
  const [gender,setGender]=useState("");
  const [updatestate, setupdateState] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [showrofile, setShowProfile] = useState(null);
  const [isFetching, setFetching] = useState(false);
  const types = ["image/png", "image/jpeg", "image/jpg"];

  useEffect(() => {
    $(document).ready(function () {
      $(this).scrollTop(0);
    });
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "phoneno") {
      setPhoneNo(value);
    } else if (name === "address") {
      setAddress(value);
    }
    else if (name === "age") {
      setAge(value);
    }
    else if (name === "gender") {
      setGender(value);
    }

  }

  function handleProfileImageChange(event) {
    let selectedFile = event.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProfileImage(selectedFile);
    } else {
      setProfileImage(null);
    }
  }
  const fetchUserData = async () => {
    setFetching(true);
    await auth.onAuthStateChanged((user) => {
      if (user) {
        uid = user.uid;
        db.collection("Users")
          .doc(uid)
          .get()
          .then((doc) => {
            const data = doc.data();
            setAddress(data.city);
            setName(data.name);
            setPhoneNo(data.phone);
            setEmail(data.email);
            setAge(data.age);
            setGender(data.gender);
            setShowProfile(data.imageUrl);
            setFetching(false);
          });
      } else {
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const db = firebase.firestore();
  const storage = firebase.storage();

  async function editUserProfile(event) {
    event.preventDefault();
    await auth.onAuthStateChanged((user) => {
      if (user) {
        uid = user.uid;
        const uploadTask = storage.ref("Users/" + uid).put(profileImage);
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
                  .update({
                    imageUrl: imageUrl,
                  })
                  .then(() => {
                    toast.success("Profile picture uploded succesfully");
                    setShowProfile(imageUrl);
                  });
              });
          }
        );
      }
    });
  }

  async function editUserdetails(event) {
    event.preventDefault();
    await auth.onAuthStateChanged((user) => {
      if (user) {
        uid = user.uid;
        const uploadTask = storage.ref("Users/" + uid).put(profileImage);
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
                  .update({
                    city: address,
                    name: name,
                    phone: phoneno,
                    email: email,
                    age:age,
                    gender:gender,
                    imageUrl: imageUrl,
                  })
                  .then(() => {
                    setAddress("");
                    setName("");
                    setPhoneNo("");
                    setAge(0);
                    setGender("");
                    setupdateState(true);
                  });
              });
          }
        );
      }
    });
  }

  if (isFetching) {
    return <LoadingScreen />;
  } else {
    return (
      <div>
        {updatestate ? <Redirect to="/userdashboard" /> : null}
        <Header />

        <ToastContainer />
        <div className="contact-us-main">
          {/* <div className="edit-custom">
            <p>Edit Details</p>
          </div> */}
          <div className="heading-alt-4">
            <h2>Edit Details</h2>
            <h2>Edit Details</h2>
          </div>
          <div className="contact-us-container">
            <span className="big-circle"></span>
            <img src={shape} className="square" alt=""></img>
            <div className="contact-us-form">
              <div className="contact-info" style={{ textAlign: "center" }}>
                <div className="funi">
                  <h3 className="contact-info-title">Edit Your Details</h3>
                </div>
                <img id="yuiop2" src={showrofile} alt="custom"></img>
              </div>
              <div className="contact-form">
                <span className="circle one"></span>
                <span className="circle two"></span>

                <form className="contact-us-main-form">
                  <h3 className="contact-form-title">
                    Edit your details below...
                  </h3>
                  <div className="contact-form-input-container">
                    <input
                      type="text"
                      name="name"
                      className="contact-input"
                      onChange={handleChange}
                      value={name}
                    />
                    <span className="uyit">Name</span>
                  </div>
                  <div className="contact-form-input-container">
                    <input
                      type="text"
                      name="age"
                      className="contact-input"
                      onChange={handleChange}
                      value={age}
                    />
                    <span className="uyit">Age</span>
                  </div>
                  <div className="contact-form-input-container">
                    <input
                      type="text"
                      name="gender"
                      className="contact-input"
                      onChange={handleChange}
                      value={gender}
                    />
                    <span className="uyit">Gender</span>
                  </div>
                  <div className="contact-form-input-container">
                    <input
                      type="text"
                      name="phoneno"
                      className="contact-input"
                      onChange={handleChange}
                      value={phoneno}
                    />
                    <span className="uyit">Phone Number</span>
                  </div>
                  <div className="contact-form-input-container">
                    <input
                      type="text"
                      name="address"
                      className="contact-input"
                      onChange={handleChange}
                      value={address}
                    />
                    <span className="uyit">City</span>
                  </div>
                  <Form>
                    <Form.File
                      onChange={handleProfileImageChange}
                      id="userImage"
                    />
                  </Form>

                  <input
                    type="button"
                    value="Preview"
                    onClick={editUserProfile}
                    className="contact-button123"
                  ></input>
                  <input
                    type="button"
                    value="Submit"
                    onClick={editUserdetails}
                    className="contact-button123"
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
  }
}
export default EditUser;
