import React, { useState, useEffect } from "react";
import { Col, Row, Button, Card } from "react-bootstrap";
import Sidebar from "./Sidebar";
import "../Styles/AdminDashboard.css";
import { DataGrid } from "@material-ui/data-grid";
import firebase from "firebase";
import "../Styles/CustomRequests.css";
import "../Styles/Pdf.css";
import Modal from "react-bootstrap/Modal";
import pdfMake from "pdfmake/build/pdfmake";
import logo from "../Assets/logo.png";
import pdfFonts from "pdfmake/build/vfs_fonts";

function MyVerticallyCenteredModal(props) {
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
            margin: [0, 5, 0, 10],
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
                        text: `Rs. ${
                          booking.bookingData.totalCost -
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
            margin: [0, 30, 0, 0],
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
      pdfMake.createPdf(docDefinition).open();
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

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="admin-booking-modal"
    >
      <Modal.Body>
        <Card className="admin-booking-card">
          <Row>
            <Col lg={4}>
              <img
                src={props.selectedBooking.packageData.imageUrl}
                alt={props.selectedBooking.packageData.name}
              />
            </Col>
            <Col lg={8}>
              <Row>
                <Col>
                  <p>
                    <strong>Customer Name :</strong>{" "}
                    {props.selectedBooking.userData.name}
                  </p>
                  <p>
                    <strong>Phone Number :</strong>{" "}
                    <a href={`tel:${props.selectedBooking.userData.phone}`}>
                      {props.selectedBooking.userData.phone}
                    </a>
                  </p>
                  <p>
                    <strong>Email :</strong>{" "}
                    <a href={`mailto:${props.selectedBooking.userData.email}`}>
                      {props.selectedBooking.userData.email}
                    </a>
                  </p>
                  <p>
                    <strong>Age :</strong> {props.selectedBooking.userData.age}
                  </p>
                  <p>
                    <strong>Gender :</strong>{" "}
                    {props.selectedBooking.userData.gender}
                  </p>
                  <p>
                    <strong>Address :</strong>{" "}
                    {props.selectedBooking.userData.city}
                  </p>
                  <p>
                    <strong>Package Category :</strong>{" "}
                    {props.selectedBooking.bookingData.packageType}
                  </p>
                  <p>
                    <strong>Package Name :</strong>{" "}
                    {props.selectedBooking.packageData.name}
                  </p>
                  <p>
                    <strong>Booking Date :</strong>{" "}
                    {props.selectedBooking.bookingData.dateOfBooking.substring(
                      4,
                      props.selectedBooking.bookingData.dateOfBooking.length
                    )}
                  </p>
                  <p>
                    <strong>Travel Date :</strong>{" "}
                    {props.selectedBooking.bookingData.bookingDate}
                  </p>
                  <p>
                    <strong>Number Of Seats :</strong>{" "}
                    {props.selectedBooking.bookingData.numberOfSeats}
                  </p>
                </Col>
                <Col>
                  <p>
                    <strong>Package Type :</strong>{" "}
                    {props.selectedBooking.bookingData.pricingType}
                  </p>
                  <p>
                    <strong>Total Cost :</strong>{" "}
                    {props.selectedBooking.bookingData.totalCost}
                  </p>
                  <p>
                    <strong>Total Paid :</strong>{" "}
                    {props.selectedBooking.bookingData.totalPaid}
                  </p>
                  <p>
                    <strong>Advance :</strong>{" "}
                    {props.selectedBooking.bookingData.totalAdvance}
                  </p>
                  <p>
                    <strong>Donation :</strong>{" "}
                    {props.selectedBooking.bookingData.donation}
                  </p>
                  <p>
                    <strong>GST Paid :</strong>{" "}
                    {props.selectedBooking.bookingData.gst}
                  </p>
                  <p>
                    <strong>Total Pending :</strong>{" "}
                    {props.selectedBooking.bookingData.totalCost -
                      props.selectedBooking.bookingData.totalAdvance}{" "}
                    + GST @ 18%
                  </p>
                  <p>
                    <strong>Booking ID :</strong>{" "}
                    {props.selectedBooking.bookingData.bookingId}
                  </p>
                  <p>
                    <strong>Transaction ID :</strong>{" "}
                    {props.selectedBooking.bookingData.transactionId}
                  </p>
                  <Button
                    onClick={(event) => {
                      event.preventDefault();
                      createPdf(props.selectedBooking);
                    }}
                  >
                    Download Invoice
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Modal.Body>
    </Modal>
  );
}

function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getEnquiries();
  }, []);

  const columns = [
    { field: "id", headerName: "Booking ID", width: 225 },
    { field: "bookingDate", headerName: "Date Of Booking", width: 240 },
    { field: "travelDate", headerName: "Date Of Travel", width: 240 },
    { field: "packageName", headerName: "Package Name", width: 240 },
    { field: "customerName", headerName: "Customer name", width: 240 },
    {
      field: "customerPhone",
      headerName: "Customer Number",
      sortable: true,
      width: 205,
    },
    { field: "noOfPeople", headerName: "Number Of People", width: 240 },
    {
      field: "amountPaid",
      headerName: "Amount Paid",
      type: "number",
      width: 240,
    },
    {
      field: "amountPending",
      headerName: "Amount Pending",
      type: "number",
      width: 250,
    },
  ];

  function getEnquiries() {
    const db = firebase.firestore();
    setBookings([]);
    setLoading(true);
    db.collection("Bookings")
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

  const rows = bookings.map((booking) => {
    return {
      id: booking.bookingData.bookingId,
      customerName: booking.userData.name,
      packageName: booking.packageData.name,
      bookingDate: booking.bookingData.dateOfBooking.substring(
        4,
        booking.bookingData.dateOfBooking.length
      ),
      travelDate: booking.bookingData.bookingDate,
      amountPaid: booking.bookingData.totalPaid,
      noOfPeople: booking.bookingData.numberOfSeats,
      customerPhone: booking.userData.phone,
      amountPending:
        booking.bookingData.totalCost - booking.bookingData.totalAdvance,
      bookingData: booking.bookingData,
      userData: booking.userData,
      packageData: booking.packageData,
    };
  });

  const showBooking = (row) => {
    console.log(row.data);
    setSelectedBooking(row.data);
    setModalShow(true);
  };

  return (
    <div>
      <Row>
        <Col className="admin-dashboard-sidebar" lg={2} md={6}>
          <Sidebar />
        </Col>
        <Col className="admin-dashboard-content" lg={10} md={6}>
          <h3 className="admin-dashboard-title">All Bookings</h3>
          {bookings && (
            <div style={{ height: 600, width: "100%" }}>
              <DataGrid
                className="admin-dashboard-table"
                loading={isLoading}
                rowCount={bookings.length}
                rowsPerPageOptions={[5, 10, 15]}
                rows={rows}
                columns={columns}
                pageSize={10}
                onRowSelected={showBooking}
              />
              {selectedBooking && (
                <MyVerticallyCenteredModal
                  show={modalShow}
                  selectedBooking={selectedBooking}
                  onHide={() => setModalShow(false)}
                />
              )}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default AllBookings;
