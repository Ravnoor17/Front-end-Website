import React, { useState, useEffect } from "react";
import { Col, Row,Modal,Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import "../Styles/AdminDashboard.css";
import { DataGrid } from "@material-ui/data-grid";
import firebase from "firebase";
import "../Styles/CustomRequests.css";

function ContactRequests() {
  const [requests, setRequests] = useState([]);
  const [show,setShow]=useState(false);
  const [data,setData]=useState({});

  useEffect(() => {
    getRequests();
  }, []);

  function handleClose(){
    setShow(false);
  }
  const handleShow=(row)=>{
    setShow(true);
    setData(row.data);
  }

  const [isLoading, setLoading] = useState(false);

  const columns = [
    { field: "id", headerName: "Request ID", width: 225 },
    { field: "customerName", headerName: "Customer name", width: 240 },
    { field: "message", headerName: "Message", width: 240 },
    {
      field: "customerPhone",
      headerName: "Customer Number",
      sortable: true,
      width: 205,
    },
    {
      field: "email",
      headerName: "Customer Email",
      width: 250,
    },
  ];

  function getRequests() {
    const db = firebase.firestore();
    setRequests([]);
    setLoading(true);
    db.collection("Enquiries")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length) {
          querySnapshot.docs.forEach((doc) => {
            if (doc.data) {
              setRequests((prev) => {
                return [...prev, {data:doc.data(), id:doc.id}];
              });
              setLoading(false);
            }
          });
        } else {
          setLoading(false);
        }
      });
  }

  const rows = requests.map((customRequest) => {
    return {
      id: customRequest.id,
      customerName: customRequest.data.name,
      message: customRequest.data.message,
      customerPhone: customRequest.data.phNo,
      email: customRequest.data.email,
    };
  });

  return (
    <div>
      <Row>
        <Col className="admin-dashboard-sidebar" lg={2} md={6}>
          <Sidebar />
        </Col>
        <Col className="admin-dashboard-content" lg={10} md={6}>
          <h3 className="admin-dashboard-title">All Contact Requests</h3>
          <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header ><h2 style={{textAlign:"center", width:"100%"}}>Details</h2></Modal.Header>
        <Modal.Body>
        <div>
        <Row>
        <Col lg={3}>Customer Name</Col><Col lg={9}>: {data.customerName}</Col>
        </Row>
        <Row>
        <Col lg={3}>Message</Col><Col lg={9}>: {data.message}</Col>
        </Row>
        <Row>
        <Col lg={3}>Customer Number</Col><Col lg={9}>: {data.customerPhone}</Col>
        </Row>
        <Row>
        <Col lg={3}>Customer Email</Col><Col lg={9}>: {data.email}</Col>
        </Row>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
          {requests && (
            <div style={{ height: 600, width: "100%" }}>
              <DataGrid
                className="admin-dashboard-table"
                loading={isLoading}
                rowCount={requests.length}
                rowsPerPageOptions={[5, 10, 15]}
                rows={rows}
                columns={columns}
                pageSize={10}
                onRowSelected={handleShow}
              />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default ContactRequests;
