import React, { useEffect, useState } from "react";
import Bookingcardd from "./BookingCard";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../Styles/bookingPage.css";
import firebase from "firebase";
import LoadingScreen from "./LoadingScreen";
import nobookings from "../Assets/nobookings.svg";

function Bookings(props) {
  const [userIdd, setUserIdd] = useState(props.match.params.userId);
  const db = firebase.firestore();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getEnquiries();
  }, []);

  function getEnquiries() {
    console.log(userIdd);
    const db = firebase.firestore();
    setBookings([]);
    setLoading(true);

    db.collection("Bookings")
      .where("userId", "==", props.match.params.userId)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length) {
          querySnapshot.docs.forEach((doc) => {
            const bookingData = doc.data();
            const packageId = bookingData.packageId;
            const packageType = bookingData.packageType;
            const userId = bookingData.userId;
            db.collection(packageType)
              .doc(packageId)
              .get()
              .then((snapshot) => {
                const packageData = snapshot.data();
                db.collection("Users")
                  .doc(userId)
                  .get()
                  .then((snap) => {
                    const userData = snap.data();
                    if (userData) {
                      setBookings((prev) => {
                        return [
                          ...prev,
                          {
                            bookingData: bookingData,
                            packageData: packageData,
                            userData: userData,
                          },
                        ];
                      });
                      setLoading(false);
                    }
                  });
              });
          });
        } else {
          setLoading(false);
        }
      });
    console.log(bookings);
  }

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <div>
        <Header />
        <div className="heading-alt-4">
          <h2>Your Bookings</h2>
          <h2>Your Bookings</h2>
        </div>
        {bookings.length === 0 && (
          <div className="no-bookings">
            <img src={nobookings} alt="No bookings" />
            <h4>
              No bookings to show! Book your first trip,{" "}
              <Link to="/categories">explore</Link> our trip packages
            </h4>
          </div>
        )}
        <div className="cardDiv1">
          {bookings &&
            bookings.map((booking) => {
              if (
                booking &&
                booking.packageData &&
                booking.userData &&
                booking.bookingData
              ) {
                return (
                  <Bookingcardd
                    bookingId={booking.bookingData.bookingId}
                    packName={booking.packageData.name}
                    bookedFor={booking.bookingData.bookingDate}
                    bookedOn={booking.bookingData.dateOfBooking}
                    gst={booking.bookingData.gst}
                    totalAdv={booking.bookingData.totalAdvance}
                    totalCost={booking.bookingData.totalCost}
                    totalPaid={booking.bookingData.totalPaid}
                    noOfSeats={booking.bookingData.numberOfSeats}
                    transId={booking.bookingData.transactionId}
                    packImg={booking.packageData.imageUrl}
                    packageId={booking.packageData.packageId}
                    packageType={booking.packageData.packageType}
                    pricingType={booking.bookingData.pricingType}
                    donation={booking.bookingData.donation}
                    booking={booking}
                  />
                );
              }
            })}
        </div>

        <Footer />
      </div>
    );
  }
}
export default Bookings;
