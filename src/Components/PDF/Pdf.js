import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { AiOutlineDownload } from "react-icons/ai";
import Pdf from "react-to-pdf";
import firebase from "firebase";
import LoadingScreen from "../LoadingScreen";

import logo from "../../Assets/logo.png";
import "../../Styles/Pdf.css";

const MyDocument = (props) => {
  const [booking, setBooking] = useState();
  const [loading, setLoading] = useState(false);
  const db = firebase.firestore();
  const docRef = useRef();

  useEffect(() => {
    console.log("Fetching data");
    getBooking(props.match.params.bookingId);
  }, []);

  const getBooking = (bookingId) => {
    console.log("Fetching data");
    console.log(bookingId);
    setLoading(true);
    db.collection("Bookings")
      .doc(bookingId)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.data()) {
          const bookingData = querySnapshot.data();
          console.log(bookingData);
          db.collection("Users")
            .doc(bookingData.userId)
            .get()
            .then((snapshot) => {
              if (snapshot.data()) {
                const userData = snapshot.data();
                console.log(userData);
                db.collection(bookingData.packageType)
                  .doc(bookingData.packageId)
                  .get()
                  .then((snap) => {
                    if (snap.data()) {
                      const packageData = snap.data();
                      console.log(packageData);
                      setBooking(() => {
                        return {
                          bookingData: bookingData,
                          userData: userData,
                          packageData: packageData,
                        };
                      });
                      setLoading(false);
                    }
                  });
              }
            });
        }
      });
  };

  if (loading || !booking) {
    return <LoadingScreen />;
  } else {
    return (
      <React.Fragment>
        <Pdf
          targetRef={docRef}
          filename={`${booking.bookingData.bookingId}.pdf`}
        >
          {({ toPdf }) => (
            <button className="download-btn">
              <AiOutlineDownload onClick={toPdf} className="download-icon" />
            </button>
          )}
        </Pdf>
        <div ref={docRef} className="pdf-main-div">
          <div className="invoice-logo">
            <img src={logo} className="logo" alt="logo" />
          </div>
          <Row>
            <Col className="invoice-title-col">
              <h4>INVOICE</h4>
            </Col>
            <Col className="invoice-details-col">
              <Row className="details-col">
                <Col>
                  <p>
                    <span>BOOKING DATE : </span>
                  </p>
                </Col>
                <Col>
                  <p>
                    {booking.bookingData.dateOfBooking.substring(
                      4,
                      booking.bookingData.dateOfBooking.length
                    )}
                  </p>
                </Col>
              </Row>
              <Row className="details-col">
                <Col>
                  <p>
                    <span>BOOKING ID : </span>
                  </p>
                </Col>
                <Col>
                  <p>{booking.bookingData.bookingId}</p>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="more-details-div">
            <Row>
              <Col className="user-details">
                <h5>{booking.userData.name}</h5>
                <p>📞 {booking.userData.phone}</p>
                <p>🏠 {booking.userData.city}</p>
                <p>📧 {booking.userData.email}</p>
              </Col>
              <Col>
                <h6>Booking Details</h6>
                <hr />
                <Row className="details-col">
                  <Col>
                    <p>
                      <span>Travel Date :</span>
                    </p>
                  </Col>
                  <Col>
                    <p>{booking.bookingData.bookingDate}</p>
                  </Col>
                </Row>
                <Row className="details-col">
                  <Col>
                    <p>
                      <span>Transaction ID :</span>
                    </p>
                  </Col>
                  <Col>
                    <p>{booking.bookingData.transactionId}</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <div className="main-details-div">
            <Row className="main-details-title-row">
              <Col>
                <h5>PACKAGE NAME</h5>
              </Col>
              <Col>
                <h5>PACKAGE TYPE</h5>
              </Col>
              <Col>
                <h5>NUMBER OF SEATS</h5>
              </Col>
              <Col>
                <h5>COST PER SEAT</h5>
              </Col>
              <Col>
                <h5>ADVANCE PER SEAT</h5>
              </Col>
              <Col>
                <h5>TOTAL ADVANCE</h5>
              </Col>
            </Row>
            <Row className="main-details-details-row">
              <Col>
                <p>{booking.packageData.name}</p>
              </Col>
              <Col>
                <p>{booking.bookingData.pricingType}</p>
              </Col>
              <Col>
                <p>{booking.bookingData.numberOfSeats}</p>
              </Col>
              <Col>
                <p>
                  Rs.{" "}
                  {booking.bookingData.totalCost /
                    booking.bookingData.numberOfSeats}
                </p>
              </Col>
              <Col>
                <p>
                  Rs.{" "}
                  {booking.bookingData.totalAdvance /
                    booking.bookingData.numberOfSeats}
                </p>
              </Col>
              <Col>
                <p>Rs. {booking.bookingData.totalAdvance}</p>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col style={{ textAlign: "left", fontSize: "13px" }}>
                TOTAL ADVANCE
              </Col>
              <Col style={{ textAlign: "left", fontSize: "13px" }}>
                Rs. {booking.bookingData.totalAdvance}
              </Col>
            </Row>
            <Row>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col style={{ textAlign: "left", fontSize: "13px" }}>GST</Col>
              <Col style={{ textAlign: "left", fontSize: "13px" }}>
                Rs. {booking.bookingData.gst}
              </Col>
            </Row>
            <Row>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col style={{ textAlign: "left", fontSize: "13px" }}>
                DONATION
              </Col>
              <Col style={{ textAlign: "left", fontSize: "13px" }}>
                Rs. {booking.bookingData.donation}
              </Col>
            </Row>
            <hr className="grand-total-divider" />
            <Row>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col style={{ textAlign: "left", fontSize: "13px" }}>
                <strong>TOTAL PAID</strong>
              </Col>
              <Col style={{ textAlign: "left", fontSize: "13px" }}>
                Rs. {booking.bookingData.totalPaid}
              </Col>
            </Row>
            <Row>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col style={{ textAlign: "left", fontSize: "13px" }}>
                <strong>TOTAL PENDING</strong>
              </Col>
              <Col style={{ textAlign: "left", fontSize: "13px" }}>
                Rs.{" "}
                {booking.bookingData.totalCost -
                  booking.bookingData.totalAdvance}{" "}
                + GST @18%
              </Col>
            </Row>
          </div>

          <div className="bottom-div">
            <p>
              This is a computer generated invoice and does not need any
              signatures.
            </p>
            <p>For any queries, contact us at +91-7906114905</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default MyDocument;
