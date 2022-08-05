import React, { useEffect, useState } from "react";
import { Row, Col, Container, Carousel } from "react-bootstrap";
import "./Singlepackage.css";
import Pricecard from "../Singlepackagescreen/Pricecard";
import Formcomp from "../Singlepackagescreen/Form";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import firebase from "firebase";
import { StickyContainer, Sticky } from "react-sticky";
import "react-alice-carousel/lib/alice-carousel.css";
import Imagess from "../Singlepackagescreen/imageGallery";
import SingleReview from "../SingleReview";
import { Button, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import { ToastContainer, toast } from "react-toastify";
//icons
import { FaRupeeSign, FaFlag } from "react-icons/fa";
import { GiNetworkBars, GiPathDistance } from "react-icons/gi";
import {BiCalendar} from 'react-icons/bi'
import {TiTime} from 'react-icons/ti'
import { AiOutlineFieldTime } from "react-icons/ai";
import { RiCheckboxCircleFill } from "react-icons/ri";
import {IoMdCheckmarkCircleOutline} from 'react-icons/io'
import { IoLocateSharp, IoAlertCircleSharp, IoLocation } from "react-icons/io5";
import {HiOutlineChevronDoubleRight, HiOutlineSun} from 'react-icons/hi'
import { FaTimesCircle } from "react-icons/fa";

const Singlepackage = (props) => {
  const [pack, setpack] = useState("");
  const [mapi, setmap] = useState("");
  const [reviews, setReviews] = useState([]);
  const [newreview, setNewreview] = React.useState("");
  const [reviewsFetched, setReviewsFetched] = useState(false);
  const [fetchingDates, setFetchingDates] = useState(false);
  const [redirectLogin, setRedirectLogin] = useState(false);
  const [seats, setSeats] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const db = firebase.firestore();
  const auth = firebase.auth();

  useEffect(() => {
    getPackage();
  }, []);

  useEffect(() => {
    var header = document.getElementById("sing-pack-nav");
    if (header) {
      var btns = header.getElementsByClassName("single-pack-nav-item");
      if (btns) {
        for (var i = 0; i < btns.length; i++) {
          btns[i].addEventListener("click", function () {
            var current = document.getElementsByClassName("nav-time-active");
            current[0].className = current[0].className.replace(
              " nav-time-active",
              ""
            );
            this.className += " nav-time-active";
          });
        }
      }
    }
  }, []);

  //Function to get package data
  const getPackage = () => {
    setFetching(true);
    setFetchingDates(true);
    db.collection("Skiing")
      .doc(props.match.params.packageId)
      .get()
      .then((ress) => {
        if (ress.data()) {
          setpack(ress.data());
          setSeats([]);
          db.collection("Skiing")
            .doc(props.match.params.packageId)
            .collection("Dates")
            .doc("dates")
            .get()
            .then((ress) => {
              if (ress.data()) {
                setSeats(ress.data().dates);
              } else {
                setSeats([]);
              }
              setFetchingDates(false);
              getReviews();
            });
          if (ress.data().map === "") {
            setmap("https://maps.google.com/maps?q=India&output=embed");
          } else {
            setmap(ress.data().map);
          }
        } else {
          setpack();
        }
      });
  };

  // Function to get package reviews
  const getReviews = () => {
    setReviews([]);
    db.collection("Skiing")
      .doc(props.match.params.packageId)
      .collection("Reviews")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          querySnapshot.docs.forEach((doc) => {
            const reviewData = doc.data();
            db.collection("Users")
              .doc(reviewData.userId)
              .get()
              .then((snap) => {
                const userData = snap.data();
                setReviews((prev) => {
                  return [
                    ...prev,
                    {
                      userId: reviewData.userId,
                      review: reviewData.review,
                      userName: userData.name,
                      userImage: userData.imageUrl,
                    },
                  ];
                });
              })
              .then(() => {
                setFetching(false);
                setReviewsFetched(true);
              });
          });
        } else {
          setReviewsFetched(true);
          setFetching(false);
        }
      });
  };

  //Function to handle review text change
  function handleNewreview(event) {
    setNewreview(event.target.value);
  }

  //Function to add new review
  function addNewreview(event) {
    event.preventDefault();
    auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        if (uid) {
          db.collection("Skiing")
            .doc(props.match.params.packageId)
            .collection("Reviews")
            .add({
              userId: uid,
              review: newreview,
            })
            .then(() => {
              setNewreview("");
              getReviews();
            });
        }
      } else {
        setRedirectLogin(true);
      }
    });
  }



  if (isFetching || !reviewsFetched || fetchingDates) {
    return <LoadingScreen />;
  } else {
    return (
      <div className="single-package-main">
        {redirectLogin && <Redirect to="/signin" />}
        <ToastContainer />
        <Header />

        <div className="img-carou">
          <div className="single-package-upper">
            <Carousel>
              {pack &&
                pack.imgUrl &&
                pack.imgUrl.map((l, k) => (
                  <Carousel.Item>
                    <img style={{ height: "700px" }} src={l} alt="sk" />
                  </Carousel.Item>
                ))}
            </Carousel>
          </div>
        </div>

        <div className="single-package-lower">
          {pack && (
            <Container>
              <Row className="sngl-pack-row">
                <Col md={8}>
                  <div className="single-package-left">
                    <div className="singel-pack-name">
                      <div className="single-pck-1-row">
                        <div className="single-pack-side-design"></div>
                        <h3>{pack.name}</h3>
                        <hr />
                        {pack.grade !== "" && (
                          <h5>
                            <FaFlag className="single-pck-1-row-icon" />
                            Level - {pack.grade}
                          </h5>
                        )}
                        {pack.maxAltitude !== "" && (
                          <h5>
                            <GiNetworkBars className="single-pck-1-row-icon" />
                            Altitude Range - {pack.maxAltitude}
                          </h5>
                        )}

                        {pack.duration !== "" && (
                          <h5>
                            <TiTime className="single-pck-1-row-icon" />
                            Duration - {pack.duration}
                          </h5>
                        )}
                        {pack.region !== "" && (
                          <h5>
                            <IoLocation className="single-pck-1-row-icon" />
                            Region - {pack.region}
                          </h5>
                        )}
                        {pack.bestTime !== "" && (
                          <h5>
                            <BiCalendar className="single-pck-1-row-icon" />
                            Best Time - {pack.bestTime}
                          </h5>
                        )}
                        <hr />
                        {pack.quote && (
                          <center>
                            <h6>"{pack.quote}"</h6>
                          </center>
                        )}
                      </div>
                    </div>

                    <StickyContainer>
                      <Sticky topOffset={50}>
                        {({ style, isSticky }) => (
                          <div
                            style={{
                              ...style,
                              marginTop: isSticky ? "76px" : "0px",
                            }}
                            className="single-package-navbar"
                            id="sing-pack-nav"
                          >
                            <div className="single-pack-nav-item">
                              <a href="#overview">
                                <p>About</p>
                              </a>
                            </div>
                            <div className="single-pack-nav-item">
                              <a href="#briefItinerary">
                                <p>Short_Itinerary</p>
                              </a>
                            </div>
                            <div className="single-pack-nav-item nav-time-active">
                              <a href="#detailedItinerary">
                                <p>Detailed_Itinerary</p>
                              </a>
                            </div>
                            <div className="single-pack-nav-item">
                              <a href="#majorattraction">
                                <p>Major_Attraction</p>
                              </a>
                            </div>
                            <div className="single-pack-nav-item">
                              <a href="#thingstocarry">
                                <p>Things_to_carry</p>
                              </a>
                            </div>
                            <div className="single-pack-nav-item">
                              <a href="#inclusion">
                                <p>Inclusions</p>
                              </a>
                            </div>
                            <div className="single-pack-nav-item ">
                              <a href="#exclusion">
                                <p>Exclusions</p>
                              </a>
                            </div>
                            <div className="single-pack-nav-item ">
                              <a href="#price">
                                <p>Price</p>
                              </a>
                            </div>
                            <div className="single-pack-nav-item ">
                              <a href="#gallery">
                                <p>Gallery</p>
                              </a>
                            </div>
                            <div className="single-pack-nav-item ">
                              <a href="#seatavialable">
                                <p>Seat_Avialable</p>
                              </a>
                            </div>
                            <div className="single-pack-nav-item">
                              <a href="#reviews">
                                <p>Reviews</p>
                              </a>
                            </div>
                            <div className="single-pack-nav-item">
                              <a href="#map">
                                <p>Location</p>
                              </a>
                            </div>
                            <div className="single-pack-nav-item">
                              <a href="#termsandconditions">
                                <p>Terms_&_Conditions</p>
                              </a>
                            </div>
                            <div className="single-pack-nav-item">
                              <a href="#cancellation">
                                <p>Cancellation_&_Refund</p>
                              </a>
                            </div>
                          </div>
                        )}
                      </Sticky>

                      {/* OVERVIEW */}
                      <div className="sngl-pack-short-itn" id="overview">
                        <div className="single-pck-2-row">
                          <div className="single-pack-side-design"></div>
                          <h4>About</h4>
                          <hr />
                          {pack &&
                            pack.overviews.map((l, k) => (
                              <p key={k}>
                                <IoLocateSharp className="single-pck-2-row-icon" />
                                {l}
                              </p>
                            ))}
                        </div>
                      </div>
                      {/* BRIEF ITINERARY */}
                      <div className="sngl-pack-short-itn" id="briefItinerary">
                        <div className="single-pck-2-row">
                          <div className="single-pack-side-design"></div>
                          <h4>Short Itinerary</h4>
                          <hr />
                          {pack &&
                            pack.briefItinerary.map((l, k) => (
                              <div key={k} className="single-pack-itn">
                                <h5>{l.day}</h5>
                                <h6>
                                  <IoLocateSharp className="single-pck-2-row-icon" />
                                  {l.title}
                                </h6>
                                <p>{l.desc}</p>
                              </div>
                            ))}
                        </div>
                      </div>
                      {/* DETAILED ITINERARY */}
                      <div
                        className="sngl-pack-short-itn"
                        id="detailedItinerary"
                      >
                        <div className="single-pck-2-row">
                          <div className="single-pack-side-design"></div>
                          <h4>Detailed Itinerary</h4>
                          <hr />
                          {pack &&
                            pack.detailedItinerary.map((l, k) => (
                              <div key={k} className="single-pack-itn">
                                <h5>{l.day}</h5>
                                <h6>
                                  <IoLocateSharp className="single-pck-2-row-icon" />
                                  {l.title}
                                </h6>
                                <p>{l.desc}</p>
                              </div>
                            ))}
                        </div>
                      </div>
                      {/* Major Attraction */}
                      <div className="sngl-pack-short-itn" id="majorattraction">
                        <div className="single-pck-2-row">
                          <div className="single-pack-side-design"></div>
                          <h4>Major Attraction</h4>
                          <hr />
                          {pack &&
                            pack.majorattraction &&
                            pack.majorattraction.map((l, k) => (
                              <p key={k}>
                                <HiOutlineSun style={{color:'orangered'}} className="single-pck-2-row-icon" />
                                {l}
                              </p>
                            ))}
                        </div>
                      </div>
                      {/* Things to carry */}
                      <div className="sngl-pack-short-itn" id="thingstocarry">
                        <div className="single-pck-2-row">
                          <div className="single-pack-side-design"></div>
                          <h4>Things to Carry</h4>
                          <hr />
                          {pack &&
                            pack.thingsToCarry &&
                            pack.thingsToCarry.map((l, k) => (
                              <p key={k}>
                                <IoMdCheckmarkCircleOutline
                                  className="single-pck-2-row-icon"
                                  style={{
                                    color: "green",
                                    fontSize: "19px",
                                  }}
                                />
                                {l}
                              </p>
                            ))}
                        </div>
                      </div>
                      {/* INCLUSIONS */}
                      <div className="sngl-pack-short-itn" id="inclusion">
                        <div className="single-pck-2-row">
                          <div className="single-pack-side-design"></div>
                          <h4>Inclusions</h4>
                          <hr />
                          {pack &&
                            pack.inclusions &&
                            pack.inclusions.map((l, k) => (
                              <p key={k}>
                                <RiCheckboxCircleFill
                                  className="single-pck-2-row-icon"
                                  style={{
                                    color: "green",
                                    fontSize: "19px",
                                  }}
                                />
                                {l}
                              </p>
                            ))}
                        </div>
                      </div>
                      {/* EXCLUSIONS */}
                      <div className="sngl-pack-short-itn" id="exclusion">
                        <div className="single-pck-2-row">
                          <div className="single-pack-side-design"></div>
                          <h4>Exclusions</h4>
                          <hr />
                          {pack &&
                            pack.exclusions.map((l, k) => (
                              <p key={k}>
                                <FaTimesCircle
                                  className="single-pck-2-row-icon"
                                  style={{
                                    color: "red",
                                    fontSize: "17px",
                                  }}
                                />
                                {l}
                              </p>
                            ))}
                        </div>
                      </div>
                      {/* PACKAGE PRICING */}
                      <div className="sngl-pack-short-itn" id="price">
                        <div className="single-pck-2-row">
                          <div className="single-pack-side-design"></div>
                          <h4>Package Options</h4>
                          <hr />
                          {pack &&
                            pack.pricing.map((l, k) => (
                              <div key={k} className="sng-prc-tag">
                                <Row>
                                  <Col lg={6}>
                                    <div className="sng-prc-tag1">
                                      <h5>Option {k + 1}</h5>
                                      <h6>
                                        <AiOutlineFieldTime
                                          style={{ fontSize: "21px" }}
                                        />{" "}
                                        {pack.duration}
                                      </h6>
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="sng-prc-tag2">
                                      <h6>
                                        <FaRupeeSign />{" "}
                                        {parseInt(l.cost) + 1000}
                                      </h6>
                                      <h5>
                                        <span>{l.type}</span> : <FaRupeeSign />{" "}
                                        {l.cost}
                                      </h5>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            ))}
                        </div>
                      </div>
                      {/* GALLERY */}
                      <div className="sngl-pack-short-itn" id="gallery">
                        <div className="single-pck-2-row">
                          <div className="single-pack-side-design"></div>
                          <h4>Gallery</h4>
                          <hr />

                          {pack && pack.imgUrl && (
                            <Imagess imgUrl={pack.imgUrl} />
                          )}
                        </div>
                      </div>
                      {/* BATCH AVAILABILITY */}
                      <div className="sngl-pack-short-itn" id="seatavialable">
                        <div className="single-pck-2-row">
                          <div className="single-pack-side-design"></div>
                          <h4>Seat Availability</h4>
                          <hr />
                          <Row>
                            <Col lg={4} md={4} sm={12}>
                              <span className="seat-availablity1">
                                <RiCheckboxCircleFill
                                  style={{
                                    color: "green",
                                    fontSize: "19px",
                                  }}
                                />{" "}
                                Seats Availabe
                              </span>
                            </Col>
                            <Col lg={4} md={4} sm={12}>
                              <span className="seat-availablity2">
                                {" "}
                                <IoAlertCircleSharp
                                  style={{
                                    color: "#ff8303",
                                    fontSize: "20px",
                                  }}
                                />{" "}
                                Seats Filling Fast
                              </span>
                            </Col>
                            <Col lg={4} md={4} sm={12}>
                              <span className="seat-availablity3">
                                <FaTimesCircle
                                  style={{
                                    color: "red",
                                    fontSize: "17px",
                                  }}
                                />{" "}
                                Seats Full
                              </span>
                            </Col>
                          </Row>

                          <Row>
                            {seats &&
                              seats.map((l, k) => (
                                <Col lg={2} md={2} xs={2}>
                                  <div
                                    style={
                                      l.seats === 0
                                        ? {
                                          backgroundColor:
                                            "rgba(255, 0, 0, 0.75)",
                                        }
                                        : l.seats > 10
                                          ? {
                                            backgroundColor:
                                              "rgba(0, 128, 0,0.75)",
                                          }
                                          : { backgroundColor: "#ff8303" }
                                    }
                                    key={k}
                                    className="sng-date"
                                  >
                                    <div className="sng-prc-tag1">
                                      <h5 className="sng-prc-tag-date">
                                        {l.sDate && l.sDate}
                                      </h5>
                                    </div>
                                  </div>
                                </Col>
                              ))}
                          </Row>
                        </div>
                      </div>
                      {/* REVIEWS */}
                      <div className="sngl-pack-short-itn" id="reviews">
                        <div className="single-pck-2-row">
                          <div className="single-pack-side-design"></div>
                          <h4>Reviews</h4>
                          <hr />

                          <Row>
                            {reviewsFetched &&
                              reviews.map((review, index) => {
                                return (
                                  <Col lg={6} md={6} sm={12}>
                                    <SingleReview
                                      img={review.userImage}
                                      name={review.userName}
                                      text={review.review}
                                      key={index}
                                    />
                                  </Col>
                                );
                              })}
                          </Row>
                          <Form>
                            <Form.Group controlId="add-review-text">
                              <Form.Label>Enter your review</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={5}
                                value={newreview}
                                onChange={handleNewreview}
                              />
                            </Form.Group>
                          </Form>

                          <Button
                            onClick={addNewreview}
                            className="modal-button"
                          >
                            Add Review
                          </Button>
                        </div>
                      </div>
                      {/* LOCATION */}
                      <div className="sngl-pack-short-itn" id="map">
                        <div className="single-pck-2-row">
                          <div className="single-pack-side-design"></div>
                          <h4>Location</h4>
                          <hr />
                          {pack && mapi && (
                            <iframe
                              src={mapi}
                              width="100%"
                              height="450"
                              frameborder="0"
                              allowfullscreen
                              title="map"
                            ></iframe>
                          )}
                        </div>
                      </div>
                      {/* Terms and condition */}
                      <div
                        className="sngl-pack-short-itn"
                        id="termsandconditions"
                      >
                        <div className="single-pck-2-row">
                          <div className="single-pack-side-design"></div>
                          <h4>Terms and Condition</h4>
                          <hr />
                          {pack &&
                            pack.terms &&
                            pack.terms.map((l, k) => (
                              <p key={k}>
                              <HiOutlineChevronDoubleRight
                              className="single-pck-2-row-icon"
                              style={{
                                color: "black",
                                fontSize: "17px",
                              }}
                            />
                                {l}
                              </p>
                            ))}
                        </div>
                      </div>
                      {/* Cancellation Refund */}
                      <div className="sngl-pack-short-itn" id="cancellation">
                        <div className="single-pck-2-row">
                          <div className="single-pack-side-design"></div>
                          <h4>Cancellation & Refund</h4>
                          <hr />
                          {pack &&
                            pack.cancellation &&
                            pack.cancellation.map((l, k) => (
                              <p key={k}>
                                <HiOutlineChevronDoubleRight
                                  className="single-pck-2-row-icon"
                                  style={{
                                    color: "black",
                                    fontSize: "17px",
                                  }}
                                />
                                {l}
                              </p>
                            ))}
                        </div>
                      </div>
                    </StickyContainer>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="single-package-right">
                    {seats && pack.pricing && (
                      <Pricecard
                        price={pack.pricing}
                        seats={seats}
                        packageType="Skiing"
                        packageId={props.match.params.packageId}
                        packageName={pack.name}
                      />
                    )}
                    <Formcomp />
                    <div className="skska">
                      <StickyContainer>
                        <Sticky topOffset={50}>
                          {({ style, isSticky }) => (
                            <div
                              style={{
                                ...style,
                                marginTop: isSticky ? "66px" : "0px",
                              }}
                            >
                              {seats && pack.pricing && (
                                <Pricecard
                                  price={pack.pricing}
                                  seats={seats}
                                  packageType="Skiing"
                                  packageId={props.match.params.packageId}
                                  packageName={pack.name}
                                />
                              )}
                            </div>
                          )}
                        </Sticky>
                        <div className="sksks"></div>
                      </StickyContainer>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          )}
        </div>

        <Footer />
      </div>
    );
  }
};

export default Singlepackage;
