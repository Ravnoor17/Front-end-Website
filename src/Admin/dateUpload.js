import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import firebase from "firebase";
import Sidebar from "./Sidebar";
import { Redirect } from "react-router-dom";
import DatePicker from "react-date-picker";
import "../Styles/dateupload.css";

function DateUpload(props) {
  const [dates, setDates] = useState([{ sDate: "", seats: "" }]);
  const [prevDates, setPrevDates] = useState([]);
  const [packageDates, setPackageDates] = useState([]);
  const [finalDates, setFinalDates] = useState([{ sDate: "", seats: "" }]);
  const [added, setAdded] = useState(false);
  const db = firebase.firestore();
  const [tareek, setTareek] = useState([{ date: "", month: "" }]);

  useEffect(() => {
    getDates();
  }, []);

  function getDates() {
    db.collection(props.match.params.packageType)
      .doc(props.match.params.packageId)
      .collection("Dates")
      .doc("dates")
      .get()
      .then((snapshot) => {
        if (snapshot.data()) {
          setPrevDates(snapshot.data().dates);
          if (prevDates != null) {
          }
        }
      });
  }

  function addDate() {
    setTareek((prev) => {
      return [...prev, { date: "", month: "" }];
    });
    setDates((prev) => {
      return [...prev, { sDate: "", seats: "" }];
    });
  }

  function removeDate(index) {
    const values = [...dates];
    values.splice(index, 1);
    setDates(values);
  }

  function handleTareekChange(index, event) {
    const values = [...tareek];
    const fulldate = [...dates];
    if (event) {
      const { name, value } = event.target;
      if (name === "date") {
        values[index].date = value;
      }
      if (name === "month") {
        values[index].month = value;
      }
      setTareek(values);

      fulldate[index].sDate = tareek[index].date + "-" + tareek[index].month;
      setDates(fulldate);
    }
  }

  function handleDateChange(index, event) {
    const values = [...dates];
    if (event) {
      const { name, value } = event.target;
      if (name === "seats") {
        values[index].seats = value;
      }
      if (name === "sDate") {
        values[index].sDate = value;
      }
    }

    setDates(values);
  }

  function addMonth() {
    dates.forEach((date) => {
      prevDates.push(date);
    });

    if (finalDates !== []) {
      db.collection(props.match.params.packageType)
        .doc(props.match.params.packageId)
        .collection("Dates")
        .doc("dates")
        .set({
          dates: prevDates,
        })
        .then(() => {
          setAdded(true);

          setPrevDates([{ sDate: "", seats: "" }]);
        });
    }
  }

  return (
    <div>
      <Row>
        <Col className="admin-dashboard-sidebar" lg={2} md={6}>
          <Sidebar />
        </Col>
        <Col className="admin-dashboard-content" lg={10} md={6}>
          <div style={{ height: "100vh" }}>
            <div className="add-package-form-section">
              {added ? <Redirect to={"/admin/dashboard"} /> : null}
              <h2 className="add-package-form-section-title">
                {" "}
                Package Dates{" "}
              </h2>
              <hr />
              <Form className="form-add-package">
                {dates.map((date, index) => {
                  return (
                    <Form.Group
                      className="add-package-form-group"
                      controlId="package-dates"
                    >
                      <Form.Label className="add-package-form-label">
                        Date {index + 1}
                      </Form.Label>
                      <br />

                      <Form.Control
                        onChange={(e) => {
                          handleTareekChange(index, e);
                        }}
                        placeholder={"Date"}
                        className="add-package-form-input-datee-input"
                        type="text"
                        name="date"
                        value={tareek[index].date}
                      />
                      <Form.Control
                        onChange={(e) => {
                          handleTareekChange(index, e);
                        }}
                        placeholder={"Month"}
                        className="add-package-form-input-datee-input"
                        type="text"
                        name="month"
                        value={tareek[index].month}
                      />

                      <Form.Control
                        onChange={(e) => {
                          handleDateChange(index, e);
                        }}
                        placeholder={"Seats"}
                        className="add-package-form-input date-input"
                        type="text"
                        name="seats"
                        value={date.seats}
                      />

                      <Button onClick={addDate} className="inline-button">
                        {" "}
                        +{" "}
                      </Button>
                      <Button
                        onClick={() => removeDate(index)}
                        className="inline-button"
                      >
                        {" "}
                        -{" "}
                      </Button>
                    </Form.Group>
                  );
                })}
              </Form>
              <Button onClick={addMonth} variant="dark">
                Submit
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default DateUpload;
