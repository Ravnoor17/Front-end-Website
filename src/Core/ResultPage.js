import React from "react";
import { useState, useEffect } from "react";
import "../Styles/search.css";
import Footer from "../Components/Footer";
import { Carousel, Row, Col, Form } from "react-bootstrap";
import Header from "../Components/Header";
import nobookings from "../Assets/nobookings.svg";
import { Link } from "react-router-dom";
import firebase from "firebase";
import Card from "../Components/Card3.js";
import "../Styles/search.css";

function ResultPage(props) {
  const [duration, setDuration] = useState(props.match.params.duration);
  const [destination, setDestination] = useState(
    props.match.params.destination
  );
  const [budget, setBudget] = useState(props.match.params.budget);
  const [results, setresults] = useState([]);
  const [allpackage, setAllpackage] = useState([]);
  const db = firebase.firestore();

  useEffect(() => {
    setresults([]);
    setAllpackage([]);
    db.collection("Allpackage")
      .get()
      .then((res) => {
        if (res.docs.length > 0) {
          res.forEach((doc) => {
            if (doc.data().name.includes(props.match.params.destination)) {
              if (
                doc.data().pricing[0] &&
                parseInt(doc.data().pricing[0].cost) < props.match.params.budget
              ) {
                if (
                  doc.data().duration &&
                  parseInt(doc.data().duration) < props.match.params.duration
                ) {
                  setresults((e) => [...e, doc.data()]);
                }
              }
            }
            setAllpackage((e) => [...e, doc.data()]);
          });
        }
      });
  }, []);

  const filtnow = () => {
    setresults([]);
    allpackage.forEach((doc) => {
      if (doc.name.includes(destination)) {
        if (doc.pricing[0] && parseInt(doc.pricing[0].cost) < budget) {
          if (doc.duration && parseInt(doc.duration) < duration) {
            setresults((e) => [...e, doc]);
          }
        }
      }
    });
  };

  function handleInput(e) {
    const { name, value } = e.target;
    if (name == "destination") {
      setDestination(value);
    }
    if (name == "duration") {
      setDuration(value);
    }
    if (name == "budget") {
      setBudget(value);
    }
  }

  return (
    <div>
      <Header />
      <div className="home-carousel">
        <Carousel>
          <Carousel.Item className="container-fluid carousel-item item-two">
            <div className="landing-div">
              <h1 className="carousel-title">Discover new Places</h1>
              <h4 className="carousel-subtitle">
                Travel because money returns time doesn't!
              </h4>
              <div>
                <div className="search_main">
                  <h2>Find you ideal trip!</h2>
                  <div className="serachDiv">
                    <Form.Control
                      className="inputt-search"
                      type="text"
                      placeholder="Destination"
                      value={destination}
                      name="destination"
                      onChange={handleInput}
                    />
                    <Form.Control
                      className="inputt-search"
                      as="select"
                      aria-label="Default select example"
                      value={duration}
                      name="duration"
                      onChange={handleInput}
                    >
                      <option>Duration</option>
                      <option value="3">Less than 3 days</option>
                      <option value="7">Less than a week</option>
                      <option value="14">More than a week</option>
                    </Form.Control>
                    <Form.Control
                      className="inputt-search"
                      as="select"
                      value={budget}
                      name="budget"
                      onChange={handleInput}
                    >
                      <option>Budget</option>
                      <option value="10000">10000</option>
                      <option value="20000">20000</option>
                      <option value="40000">40000</option>
                    </Form.Control>

                    <button onClick={filtnow}>Go</button>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="resultpage_maindiv">
        <Row>
          {results &&
            results.map((pckg) => {
              return (
                <Col lg={3} md={6} sm={12}>
                  <Card
                    packageName={pckg.name}
                    duration={pckg.duration}
                    costing={pckg.pricing[0].cost}
                    imageUrl={pckg.imageUrl}
                    package={pckg}
                    categoryName={pckg.packageType}
                    rating={pckg.rating}
                  />
                </Col>
              );
            })}
        </Row>
        {results.length == 0 && (
          <div className="no-bookings">
            <img src={nobookings} alt="No bookings" />
            <h4>
              Didn't find what you were looking for! Plan your own,{" "}
              <Link to="/custompackage">Custom Package -</Link>
            </h4>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ResultPage;
