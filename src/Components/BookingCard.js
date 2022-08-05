import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import "../Styles/BookingCard.css";
import pdfMake from "pdfmake/build/pdfmake";
import logo from "../Assets/logo.png";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { VscFilePdf } from "react-icons/vsc";
import { GoLinkExternal } from "react-icons/go";
import { Link } from "react-router-dom";

const BookingCard = (props) => {
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
    <div className="booking-card-main-div">
      <Card className="booking-card">
        <Row className="booking-card-row">
          <Col lg={4}>
            <img
              src={props.packImg}
              className="booking-card-image"
              alt={props.packName}
            />
          </Col>
          <Col className="details-col" lg={8}>
            <h4>{props.packName}</h4>
            <h6>{props.packageType}</h6>
            <button
              onClick={(e) => {
                e.preventDefault();
                createPdf(props.booking);
              }}
              className="booking-card-btn btn-1"
            >
              <VscFilePdf />
            </button>
            <button className="booking-card-btn btn-2">
              <Link to={`/packages/${props.packageType}/${props.packageId}`}><GoLinkExternal /></Link>
            </button>
            <hr />
            <Row>
              <Col lg={6} md={12} className="main-details-col">
                <Row>
                  <Col lg={4} md={4} sm={4} xs={4}>
                    <p>Booking Date</p>
                  </Col>
                  <Col>
                    <p>{props.bookedOn.substring(4, props.bookedOn.length)}</p>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4} md={4} sm={4} xs={4}>
                    <p>Travel Date</p>
                  </Col>
                  <Col>
                    <p>{props.bookedFor}</p>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4} md={4} sm={4} xs={4}>
                    <p>Booking ID</p>
                  </Col>
                  <Col>
                    <p>{props.bookingId}</p>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4} md={4} sm={4} xs={4}>
                    <p>Transaction ID</p>
                  </Col>
                  <Col>
                    <p>{props.transId}</p>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4} md={4} sm={4} xs={4}>
                    <p>Number Of Seats</p>
                  </Col>
                  <Col>
                    <p>{props.noOfSeats}</p>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4} md={4} sm={4} xs={4}>
                    <p>Package Type</p>
                  </Col>
                  <Col>
                    <p>{props.pricingType}</p>
                  </Col>
                </Row>
              </Col>
              <Col lg={6} md={12}>
                <Row>
                  <Col lg={4} md={4} sm={4} xs={4}>
                    <p>Total Cost</p>
                  </Col>
                  <Col>
                    <p>Rs. {props.totalCost}</p>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4} md={4} sm={4} xs={4}>
                    <p>Total Advance</p>
                  </Col>
                  <Col>
                    <p>Rs. {props.totalAdv}</p>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4} md={4} sm={4} xs={4}>
                    <p>GST</p>
                  </Col>
                  <Col>
                    <p>Rs. {props.gst}</p>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4} md={4} sm={4} xs={4}>
                    <p>Donation</p>
                  </Col>
                  <Col>
                    <p>Rs. {props.donation}</p>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4} md={4} sm={4} xs={4}>
                    <p>Total Paid</p>
                  </Col>
                  <Col>
                    <p>Rs. {props.totalPaid}</p>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4} md={4} sm={4} xs={4}>
                    <p>Total Pending</p>
                  </Col>
                  <Col lg={8} md={8} sm={8} xs={8}>
                    <p>Rs. {props.totalCost - props.totalAdv} + GST @ 18%</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
export default BookingCard;
