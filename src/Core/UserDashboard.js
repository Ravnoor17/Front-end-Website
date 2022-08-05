import React, { useEffect, useState, useContext } from "react";
import firebase from "firebase";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import shape from "../Assets/shape.png";
import "../Styles/userDashboard.css";
import Gender from "../Assets/gender-symbols.png";
import Namee from "../Assets/man-userr.png";
import Age from "../Assets/cake.png";
import Phone from "../Assets/calll.png";
import Emaill from "../Assets/emaill.png";
import Addresss from "../Assets/homee.png";
import Edit from "../Assets/edit.png"; 

import { Row, Col, Button } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import LoadingScreen from "../Components/LoadingScreen";
import authContext from '../utils/auth-hook'

function UserDashboard() {
  const auth = firebase.auth();
  const db = firebase.firestore();

  const [user, setUser] = useState({});
  const [Name, setName] = useState("");

  const [PhoneNo, setPhoneNo] = useState("");
  const [Address, setAddress] = useState("");
  const [Email, setEmail] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [userId,setUserId]=useState("");
  const [age,setAge]=useState(0);
  const [gender,setGender]=useState("");
  const [loggedOut, setLoggedOut] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const authData = useContext(authContext)

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    setFetching(true);
    auth.onAuthStateChanged((user) => {
      setUserId(user.uid);
      db.collection("Users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          const userData = doc.data();
          if (userData) {
            
            setName(userData.name);
            setAddress(userData.city);
            setPhoneNo(userData.phone);
            setEmail(userData.email);
            setImgUrl(userData.imageUrl);
            setAge(userData.age);
            setGender(userData.gender);
            setFetching(false);
            setUser((prev) => {
              return { ...prev, userData };
            });
          }
        });
    });
  }
  const signouttt = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setLoggedOut(true);
        authData.authTriggered()
      });
  };

  if (isFetching) {
    return <LoadingScreen />;
  } else {
    return (
      <div>
        {loggedOut ? <Redirect to="/" /> : null}
        <Header />

        <div className="contact-us-main">
          {/* <div className="heading-dashboard">
            <p>&nbsp;&nbsp;Your Profile&nbsp;&nbsp;</p>
          </div> */}
          <div className="heading-alt-4">
            <h2>Your Profile</h2>
            <h2>Your Profile</h2>
          </div>
          <div className="contact-us-container">
            <span className="big-circle"></span>
            <img src={shape} className="square" alt=""></img>
            <div className="contact-us-form1">
              <div className="contact-info1">
              <div className="edit_div2">
                <Link to="/edituserdetails"><button className="edit_div_button2"><img src={Edit}/></button></Link>
                </div>
                <h2 className="contact-info-title-h2">Your Details</h2>
                <br></br>
                <h3 className="contact-info-title-h3 "><img src={Namee}/>&nbsp;:&nbsp; {Name}</h3>
                <br></br>
                <br></br>
                <h3 className="contact-info-title-h3">
                  <img src={Addresss}/>&nbsp;:&nbsp; {Address}
                </h3>
                <br></br>
                <br></br>
                <h3 className="contact-info-title-h3">
                  <img src={Age}/>&nbsp;:&nbsp; {age}
                </h3>
                <br></br> <br></br>
                <h3 className="contact-info-title-h3"><img src={Emaill}/>&nbsp;:&nbsp; {Email}</h3>
                <br></br>
                <br></br>
                <h3 className="contact-info-title-h3">
                  <img src={Phone}/>&nbsp;:&nbsp; {PhoneNo}
                </h3>
                <br></br> <br></br>
                
                <h3 className="contact-info-title-h3">
                  <img src={Gender}></img>&nbsp;:&nbsp; {gender}
                </h3>
                <br></br> <br></br>
                <div className="user_buttons">
                  <Row>
                    <Col>
                      <Link to={`/bookings/${userId}`}>
                        {" "}
                        <Button className="user_button">Bookings</Button>
                      </Link>
                    </Col>
                    <Col>
                      <Button onClick={signouttt} className="user_button">
                        Sign Out
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="contact-form345">
                <span className="circle one"></span>
                <span className="circle two"></span>
                <div className="edit_div">
                <Link to="/edituserdetails"><button className="edit_div_button"><img src={Edit}/></button></Link>
                </div>
                <div className="user_image_div">
                  <img className="user_image" src={imgUrl} alt={Name} />
                </div>
                <br></br>
                <div className="user_buttons1">
                  <Link to={`/bookings/${userId}`}>
                    <Button className="user_button1">Bookings</Button>
                  </Link>
                </div>
                <div className="user_buttons1">
                  <Button onClick={signouttt} className="user_button1">
                    Sign Out
                  </Button>
                </div>
                <div className="user_buttons2"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default UserDashboard;
