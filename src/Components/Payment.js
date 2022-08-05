import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  Dropdown,
  DropdownButton,
  Form,
} from "react-bootstrap";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import "../Styles/Payment.css";
import Booked from "../Assets/booked.svg";
import logo from "../Assets/kashti travels.png";
import { Link, Redirect } from "react-router-dom";
import firebase from "firebase";
import { toast } from "react-toastify";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

const Payment = (props) => {
  const [dateIndex, setDateIndex] = useState(0);
  const [typeIndex, setTypeIndex] = useState(0);
  const [donation, setDonation] = useState(0);
  const [bookingId, setBookingId] = useState();
  const [totalCost, setTotalCost] = React.useState(
    parseInt(props.pricing[typeIndex].cost)
  );
  const [advancePayment, setAdvancePayment] = React.useState(
    parseInt(props.pricing[typeIndex].receivableAmount)
  );
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [payableAmount, setPayableAmount] = React.useState(
    1.18 * advancePayment + parseInt(donation)
  );
  const [gst, setGst] = React.useState(0);
  const [availability, setAvailability] = useState(false);
  const db = firebase.firestore();
  const auth = firebase.auth();
  const [agreed, setAgreed] = useState(false);

  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  const createPdf = (booking) => {
    console.log("Creating pdf");
    toDataURL(logo, function (dataUrl) {
      var docDefinition = {
        content: [
          {
            image: dataUrl,
            width: 120,
            alignment: "center",
            margin: [5, 0, 5, 10],
          },
          {
            text: "Auli Road, Joshimath, Uttarakhand",
            bold: false,
            alignment: "center",
            fontSize: 10,
          },
          {
            text: "Phone : +91-9557212758 , +91-7906114905",
            bold: false,
            alignment: "center",
            fontSize: 10,
          },
          {
            text: "Email : info@pacauli.com",
            bold: false,
            alignment: "center",
            fontSize: 10,
            margin: [0, 0, 0, 25],
          },
          {
            columns: [
              {
                // auto-sized columns have their widths based on their content
                width: "*",
                text: "INVOICE",
                fontSize: 36,
                color: "#29bb89",
                bold: true,
              },
              {
                // star-sized columns fill the remaining space
                // if there's more than one star-column, available width is divided equally
                width: "*",
                stack: [
                  {
                    columns: [
                      { width: "*", text: "Booking Date :", fontSize: 10 },
                      {
                        width: "*",
                        fontSize: 10,
                        text: booking.bookingData.dateOfBooking.substring(
                          4,
                          booking.bookingData.dateOfBooking.length
                        ),
                      },
                    ],
                  },
                  {
                    columns: [
                      { width: "*", text: "Booking ID :", fontSize: 10 },
                      {
                        width: "*",
                        text: booking.bookingData.bookingId,
                        fontSize: 10,
                      },
                    ],
                  },
                ],
              },
            ],
            margin: [0, 10],
          },
          {
            columns: [
              {
                // star-sized columns fill the remaining space
                // if there's more than one star-column, available width is divided equally
                width: "*",
                stack: [
                  {
                    text: booking.userData.name,
                    fontSize: 24,
                    bold: true,
                    margin: [0, 0, 0, 10],
                  },
                  {
                    columns: [
                      { width: "auto", text: "Phone : " },
                      {
                        width: "*",
                        text: booking.userData.phone,
                        margin: [4, 0, 0, 0],
                      },
                    ],
                  },
                  {
                    columns: [
                      { width: "auto", text: "Address : " },
                      {
                        width: "*",
                        text: booking.userData.city,
                        margin: [4, 0, 0, 0],
                      },
                    ],
                  },
                  {
                    columns: [
                      { width: "auto", text: "Email : " },
                      {
                        width: "*",
                        text: booking.userData.email,
                        margin: [4, 0, 0, 0],
                      },
                    ],
                  },
                ],
              },
              {
                // star-sized columns fill the remaining space
                // if there's more than one star-column, available width is divided equally
                width: "*",
                stack: [
                  {
                    text: "Booking Details",
                    fontSize: 20,
                    bold: true,
                  },
                  {
                    text: "----------------------------------------------------------------------------",
                    margin: [0, 0, 0, 14],
                  },
                  {
                    columns: [
                      { width: "*", text: "Travel Date :" },
                      { width: "*", text: booking.bookingData.bookingDate },
                    ],
                  },
                  {
                    columns: [
                      { width: "*", text: "Transaction ID :" },
                      { width: "*", text: booking.bookingData.transactionId },
                    ],
                  },
                ],
              },
            ],
            margin: [0, 10],
          },
          {
            stack: [
              {
                columns: [
                  {
                    columns: [
                      {
                        width: "*",
                        text: "Package Name",
                        fontSize: 12,
                        bold: true,
                      },
                      {
                        width: "*",
                        text: "Package Type",
                        fontSize: 12,
                        bold: true,
                      },
                      {
                        width: "*",
                        text: "Number Of Seats",
                        fontSize: 12,
                        bold: true,
                      },
                      {
                        width: "*",
                        text: "Cost Per Seat",
                        fontSize: 12,
                        bold: true,
                      },
                      {
                        width: "*",
                        text: "Advance Per Seat",
                        fontSize: 12,
                        bold: true,
                      },
                      {
                        width: "*",
                        text: "Total Advance",
                        fontSize: 12,
                        bold: true,
                      },
                    ],
                  },
                ],
              },
              {
                text: "-----------------------------------------------------------------------------------------------------------------------------------------------------------",
              },
              {
                columns: [
                  {
                    columns: [
                      {
                        width: "*",
                        text: booking.packageData.name,
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text: booking.bookingData.pricingType,
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text: booking.bookingData.numberOfSeats,
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text:
                          booking.bookingData.totalCost /
                          booking.bookingData.numberOfSeats,
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text:
                          booking.bookingData.totalAdvance /
                          booking.bookingData.numberOfSeats,
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text: booking.bookingData.totalAdvance,
                        fontSize: 10,
                        bold: false,
                      },
                    ],
                  },
                ],
                margin: [0, 10],
              },
              {
                text: "-----------------------------------------------------------------------------------------------------------------------------------------------------------",
              },
              {
                columns: [
                  {
                    columns: [
                      {
                        width: "*",
                        text: "",
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text: "",
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text: "",
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text: "",
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text: "Total Advance",
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text: `Rs. ${booking.bookingData.totalAdvance}`,
                        fontSize: 10,
                        bold: false,
                      },
                    ],
                  },
                ],
                margin: [0, 0],
              },
              {
                columns: [
                  {
                    columns: [
                      {
                        width: "*",
                        text: "",
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text: "",
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text: "",
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text: "",
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text: "Total GST",
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text: `Rs. ${booking.bookingData.gst}`,
                        fontSize: 10,
                        bold: false,
                      },
                    ],
                  },
                ],
                margin: [0, 0],
              },
              {
                columns: [
                  {
                    columns: [
                      {
                        width: "*",
                        text: "",
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text: "",
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text: "",
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text: "",
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text: "Donation",
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text: `Rs. ${booking.bookingData.donation}`,
                        fontSize: 10,
                        bold: false,
                      },
                    ],
                  },
                ],
                margin: [0, 0],
              },
              {
                text: "----------------------------------------------------",
                margin: [340, 0, 0, 0],
              },
              {
                columns: [
                  {
                    columns: [
                      {
                        width: "*",
                        text: "",
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text: "",
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text: "",
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text: "",
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text: "Total Paid",
                        fontSize: 12,
                        bold: true,
                      },
                      {
                        width: "*",
                        text: `Rs. ${booking.bookingData.totalPaid}`,
                        fontSize: 12,
                        bold: true,
                      },
                    ],
                  },
                ],
                margin: [0, 0],
              },
              {
                columns: [
                  {
                    columns: [
                      {
                        width: "*",
                        text: "",
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text: "",
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text: "",
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text: "",
                        fontSize: 10,
                        bold: false,
                      },
                      {
                        width: "*",
                        text: "Total Pending",
                        fontSize: 12,
                        bold: true,
                      },
                      {
                        width: "*",
                        text: `Rs. ${booking.bookingData.totalCost -
                          booking.bookingData.totalAdvance
                          } + GST @18%`,
                        fontSize: 12,
                        bold: 28000,
                      },
                    ],
                  },
                ],
                margin: [0, 0],
              },
              {
                text: "----------------------------------------------------",
                margin: [340, 0, 0, 0],
              },
            ],
            margin: [0, 10, 0, 0],
          },
          {
            text: "Notes : ",
            margin: [0, 80, 0, 5],
          },
          {
            ol: [
              "Our team will get in touch with you shortly.",
              "You will recieve all other necessary information and updates regarding your trip via email.",
              "If you have any emergency concern, kindly contact us via contact methods mentioned above.",
            ],
          },
          {
            text: "-----------------------------------------------------------------------------------------------------------------------------------------------------------",
            margin: [0, 10, 0, 0],
          },
          {
            text: "This is a computer generated invoice and does not need any signatures.",
            fontSize: 10,
            alignment: "center",
          },
        ],
      };
      pdfMake.createPdf(docDefinition).download();
    });
  };

  function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }

  //Use effect function
  useEffect(() => {
    console.log(props);
    checkAvailability();
  }, []);

  //Function to increase seat
  function handleadd() {
    if (numberOfSeats < props.seats[dateIndex].seats) {
      let value = numberOfSeats;
      value++;
      resetValues(value, typeIndex, donation);
    }
  }

  //Function to decrease seat
  function handlesub() {
    if (numberOfSeats > 1) {
      let value = numberOfSeats;
      value--;
      resetValues(value, typeIndex, donation);
    }
  }

  //Function to handle date change
  const handleDateChange = (event, index) => {
    event.preventDefault();
    setDateIndex(index);
    resetValues(1, typeIndex, donation);
  };

  //Function to handle price type change
  const handlePricingChange = (event, index) => {
    event.preventDefault();
    setTypeIndex(index);
    resetValues(1, index, donation);
  };

  //Function to check availability, if any
  const checkAvailability = () => {
    let found = false;
    props.seats.forEach((seat, index) => {
      if (!found) {
        if (seat.seats > 0) {
          setAvailability(true);
          found = true;
          setDateIndex(index);
          resetValues(1, typeIndex, donation);
        }
      }
    });
  };

  //Function to reset values
  const resetValues = (numberOfSeats, typeIndex, donation) => {
    setNumberOfSeats(numberOfSeats);
    setTotalCost(() => {
      return numberOfSeats * parseInt(props.pricing[typeIndex].cost);
    });
    setAdvancePayment(() => {
      return (
        numberOfSeats * parseInt(props.pricing[typeIndex].receivableAmount)
      );
    });
    setGst(0);
    setPayableAmount(() => {
      return (
        numberOfSeats *
        parseInt(props.pricing[typeIndex].receivableAmount) +
        parseInt(donation)
      );
    });
  };

  // Function to store booking details
  const completeBooking = (transactionId) => {
    auth.onAuthStateChanged((userCredentials) => {
      if (userCredentials) {
        const uid = userCredentials.uid;
        db.collection("Bookings")
          .add({
            packageId: props.packageId,
            userId: uid,
            bookingDate: props.seats[dateIndex].sDate,
            numberOfSeats: numberOfSeats,
            totalCost: totalCost,
            totalPaid: payableAmount,
            totalAdvance: advancePayment,
            gst: gst,
            dateOfBooking: new Date().toDateString(),
            transactionId: transactionId,
            packageType: props.packageType,
            pricingType: props.pricing[typeIndex].type,
            donation: parseInt(donation),
          })
          .then((docRef) => {
            const bookingId = docRef.id;
            setBookingId(docRef.id);
            console.log("adsjkfashdjkfh DONE");
            db.collection("Bookings")
              .doc(docRef.id)
              .update({
                bookingId: docRef.id,
              })
              .then(() => {
                const bookingData = {
                  packageId: props.packageId,
                  userId: uid,
                  bookingDate: props.seats[dateIndex].sDate,
                  numberOfSeats: numberOfSeats,
                  totalCost: totalCost,
                  totalPaid: payableAmount,
                  totalAdvance: advancePayment,
                  gst: gst,
                  dateOfBooking: new Date().toDateString(),
                  transactionId: transactionId,
                  packageType: props.packageType,
                  pricingType: props.pricing[typeIndex].type,
                  donation: parseInt(donation),
                  bookingId: docRef.id,
                };
                const s = [...props.seats];
                s[dateIndex].seats = s[dateIndex].seats - numberOfSeats;
                db.collection(props.packageType)
                  .doc(props.packageId)
                  .collection("Dates")
                  .doc("dates")
                  .update({
                    dates: s,
                  })
                  .then(() => {
                    db.collection("Users")
                      .doc(uid)
                      .update({
                        bookings:
                          firebase.firestore.FieldValue.arrayUnion(bookingId),
                      })
                      .then(() => {
                        toast.success("Booking done!");
                        db.collection("Users")
                          .doc(uid)
                          .get()
                          .then((user) => {
                            if (user.data()) {
                              const userData = user.data();
                              db.collection(props.packageType)
                                .doc(props.packageId)
                                .get()
                                .then((packagedata) => {
                                  if (packagedata.data()) {
                                    const packageData = packagedata.data();
                                    setDateIndex(0);
                                    setTypeIndex(0);
                                    setNumberOfSeats(1);
                                    setAgreed(false);
                                    createPdf({
                                      bookingData: bookingData,
                                      packageData: packageData,
                                      userData: userData,
                                    });
                                    props.onHide();
                                  }
                                });
                            }
                          });
                      });
                  });
              });
          });
      }
    });
  };

  const generateTokenRazor = (payableAmount) => {
    return fetch(`https://razor-api.herokuapp.com/api/payment/details`, {
      method: "Post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: payableAmount }),
    })
      .then((response) => {
        console.log(response)
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const paymentHandler = async () => {
    if (payableAmount) {

      const getToken = (payableAmount) => {
        generateTokenRazor(payableAmount).then((data) => {
          const options = {
            key: "rzp_test_IVJoD9ft3rH2lg",
            name: "Kashti Travels",
            description: "Thank You for choosing us.",
            currency: "INR",
            order_id: data.id,
            handler: async (response) => {
              await completeBooking(response.razorpay_payment_id);
              console.log("payment done", response.razorpay_payment_id);
              // processPayment(userId, token, response, data.amount);
            },
            theme: {
              color: "#f1bc19",
            },
          };
          const rzp1 = new window.Razorpay(options);
          rzp1.open();
        });
      };

      await getToken(payableAmount);
    } else {
      toast.error("Please select package first !!!");
    }
  };

  const handleChange = (event) => {
    console.log("updating state");
    setAgreed((prev) => !prev);
  };

  const handleDonationChange = (event) => {
    setDonation(event.target.value);
    resetValues(numberOfSeats, typeIndex, event.target.value);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className="img-pay">
            <img className="logo-pay" src={logo} alt="logo" />
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {availability ? (
          <React.Fragment>
            <h4 className="pay-pckg-title">{props.packageName}</h4>
            <Row md={12} className="main-row">
              <Col
                xl={{ span: 4, order: 1 }}
                lg={{ span: 4, order: 1 }}
                md={{ span: 4, order: 1 }}
                sm={{ span: 6, order: 1 }}
                xs={{ span: 6, order: 1 }}
                className="col-col dates col-type1"
              >
                Dates
              </Col>
              <Col
                xl={{ span: 4, order: 2 }}
                lg={{ span: 4, order: 2 }}
                md={{ span: 4, order: 3 }}
                sm={{ span: 6, order: 3 }}
                xs={{ span: 6, order: 3 }}
                className="col-col dates col-type1"
              >
                Package Type
              </Col>
              <Col
                xl={{ span: 4, order: 3 }}
                lg={{ span: 4, order: 3 }}
                md={{ span: 4, order: 5 }}
                sm={{ span: 6, order: 5 }}
                xs={{ span: 6, order: 5 }}
                className="col-col dates col-type1"
              >
                Number Of Seats
              </Col>
              <Col
                xl={{ span: 4, order: 4 }}
                lg={{ span: 4, order: 4 }}
                md={{ span: 4, order: 2 }}
                sm={{ span: 6, order: 2 }}
                xs={{ span: 6, order: 2 }}
                className="col-col dates col-type2"
              >
                <div className="dates-dropdown">
                  {props.seats && (
                    <DropdownButton
                      id="dropdown-basic-button"
                      title={props.seats && props.seats[dateIndex].sDate}
                      className="pay-btn"
                    >
                      {props.seats &&
                        props.seats.map((seat, index) => {
                          if (seat.seats > 0) {
                            return (
                              <Dropdown.Item
                                onClick={(e) => {
                                  handleDateChange(e, index);
                                }}
                              >
                                {seat.sDate}
                              </Dropdown.Item>
                            );
                          }
                        })}
                    </DropdownButton>
                  )}
                </div>
              </Col>
              <Col
                xl={{ span: 4, order: 5 }}
                lg={{ span: 4, order: 5 }}
                md={{ span: 4, order: 4 }}
                sm={{ span: 6, order: 4 }}
                xs={{ span: 6, order: 4 }}
                className="col-col dates col-type2"
              >
                <div className="pkgtype-dropdown">
                  <DropdownButton
                    id="dropdown-basic-button"
                    title={props.pricing[typeIndex].type}
                    className="pay-btn"
                  >
                    {props.pricing &&
                      props.pricing.map((price, index) => {
                        return (
                          <Dropdown.Item
                            onClick={(e) => {
                              handlePricingChange(e, index);
                            }}
                          >
                            {price.type}
                          </Dropdown.Item>
                        );
                      })}
                  </DropdownButton>
                </div>
              </Col>
              <Col
                xl={{ span: 4, order: 6 }}
                lg={{ span: 4, order: 6 }}
                md={{ span: 4, order: 6 }}
                sm={{ span: 6, order: 6 }}
                xs={{ span: 6, order: 6 }}
                className="col-col dates col-type2"
              >
                <div className="no-of-seats">
                  <Row>
                    <Col md={12} lg={12} sm={12}>
                      <div className="plus-minus">
                        <BsPlus
                          className="pm"
                          onClick={() => {
                            handleadd();
                          }}
                        />
                        <p>{numberOfSeats}</p>
                        <BiMinus
                          className="pm"
                          onClick={() => {
                            handlesub();
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            {/*<div className="donation-div">
              <h5>Contribute to Cuddle The Himalayas Foundation</h5>
              <p>
                Pacauli has funded and worked with Cuddle The Himalaya
                Foundation. As it’s high time for people to get it that crushing
                environment will devastate our presence. Together, we require to
                assist nature in reorganizing the environment harmed by people.
                Instead of searching for another home, we have to be work
                together to keep planet conditions favorable for up-and-coming
                eras by sparing the environment.
              </p>
              <p>
                Working in fields of Afforestation, Positive Climate Change,
                Mountains Cleanup Campaigns, Tree Plantation and Sustainable
                development. This scale of work, projects requires some funding.
                It would be great if you could help with a contribution How much
                you would like to donate?
              </p>
              <Row>
                <Col className="radio-col" xl={2} lg={2} md={4} sm={4} xs={4}>
                  <input
                    className="donation-radio-btn"
                    onChange={handleDonationChange}
                    type="radio"
                    name="donation"
                    value={0}
                  />{" "}
                  Rs. 0
                </Col>
                <Col className="radio-col" xl={2} lg={2} md={4} sm={4} xs={4}>
                  <input
                    className="donation-radio-btn"
                    onChange={handleDonationChange}
                    type="radio"
                    name="donation"
                    value={50}
                  />{" "}
                  Rs. 50
                </Col>
                <Col className="radio-col" xl={2} lg={2} md={4} sm={4} xs={4}>
                  <input
                    className="donation-radio-btn"
                    onChange={handleDonationChange}
                    type="radio"
                    name="donation"
                    value={100}
                  />{" "}
                  Rs. 100
                </Col>
                <Col className="radio-col" xl={2} lg={2} md={4} sm={4} xs={4}>
                  <input
                    className="donation-radio-btn"
                    onChange={handleDonationChange}
                    type="radio"
                    name="donation"
                    value={200}
                  />{" "}
                  Rs. 200
                </Col>
                <Col className="radio-col" xl={2} lg={2} md={4} sm={4} xs={4}>
                  <input
                    className="donation-radio-btn"
                    onChange={handleDonationChange}
                    type="radio"
                    name="donation"
                    value={400}
                  />{" "}
                  Rs. 400
                </Col>
                <Col className="radio-col" xl={2} lg={2} md={4} sm={4} xs={4}>
                  <input
                    className="donation-radio-btn"
                    onChange={handleDonationChange}
                    type="radio"
                    name="donation"
                    value={500}
                  />{" "}
                  Rs. 500
                </Col>
              </Row>
            </div>
                        */}
            <div className="total-cost">
              <Row>
                <Col lg={8} md={8} sm={8} xs={8} className="total-col">
                  <h5>Total Cost</h5>
                </Col>
                <Col className="total-col1">
                  <h5>{totalCost}</h5>
                </Col>
              </Row>
              <Row>
                <Col lg={8} md={8} sm={8} xs={8} className="total-col">
                  <h5>Advance Payment</h5>
                </Col>
                <Col className="total-col1">
                  <h5>{advancePayment}</h5>
                </Col>
              </Row>
              {/* <Row>
                <Col lg={8} md={8} sm={8} xs={8} className="total-col">
                  <h5>GST @ 18%</h5>
                </Col>
                <Col className="total-col1">
                  <h5>{gst}</h5>
                </Col>
              </Row> */}
              
              <hr className="line"></hr>
              <Row>
                <Col lg={8} md={8} sm={8} xs={8} className="total-col">
                  <h5>Total Payable At The Time Of Booking</h5>
                </Col>
                <Col className="total-col1">
                  <h5>{payableAmount}</h5>
                </Col>
              </Row>
            </div>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                checked={agreed}
                onChange={handleChange}
                type="checkbox"
                label="By clicking on this, you agree to all the Terms & Conditions."
              />
            </Form.Group>
            {/* <div className="payment-btn">
            <Button onClick={handleBooking} className="btn-payment">
              Pay
            </Button>
          </div> */}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="booked-div">
              <img src={Booked} alt="booked" />
              <h4>Oops! All the batches are already full!</h4>
              <p>
                But we have many more packages waiting for you to{" "}
                <Link className="booked-link" to="/categories">
                  explore
                </Link>{" "}
                them!
              </p>
              <p>
                Or you can customize your trip by contacting us on{" "}
                <a href="tel:+917906114905" className="booked-link">
                  +91-7906114905
                </a>
              </p>
            </div>
          </React.Fragment>
        )}
      </Modal.Body>
      <Modal.Footer>
        {availability && (
          <Button
            disabled={!agreed}
            onClick={paymentHandler}
            className="btn-payment"
          >
            Pay
          </Button>
        )}
        <Button className="close-btn" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Payment;
