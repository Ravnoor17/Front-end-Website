import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import "../Styles/AdminDashboard.css";
import { DataGrid } from "@material-ui/data-grid";
import firebase from "firebase";
import "../Styles/CustomRequests.css";

function AllEnquiries() {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    getEnquiries();
  }, []);

  const [isLoading, setLoading] = useState(false);

  const columns = [
    { field: "id", headerName: "Enquiry ID", width: 225 },
    { field: "customerName", headerName: "Customer name", width: 240 },
    { field: "destination", headerName: "Destination", width: 240 },
    { field: "budget", headerName: "Budget", type: "number", width: 240 },
    { field: "noOfPeople", headerName: "Number Of People", width: 240 },
    {
      field: "customerPhone",
      headerName: "Customer Number",
      sortable: true,
      width: 205,
    },
    {
      field: "email",
      headerName: "Customer Email",
      width: 300,
    },
  ];

  function getEnquiries() {
    const db = firebase.firestore();
    setEnquiries([]);
    setLoading(true);
    db.collection("QuickEnquiries")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length) {
          querySnapshot.docs.forEach((doc) => {
            if (doc.data) {
              setEnquiries((prev) => {
                return [...prev, {id: doc.id, data: doc.data()}];
              });
              setLoading(false);
            }
          });
        } else {
          setLoading(false);
        }
      });
  }

  const rows = enquiries.map((enquiry) => {
    return {
      id: enquiry.id,
      customerName: enquiry.data.name,
      destination: enquiry.data.destination,
      customerPhone: enquiry.data.phNo,
      email: enquiry.data.email,
      budget: enquiry.data.budget,
      noOfPeople: enquiry.data.noOfPeople,
    };
  });

  return (
    <div>
      <Row>
        <Col className="admin-dashboard-sidebar" lg={2} md={6}>
          <Sidebar />
        </Col>
        <Col className="admin-dashboard-content" lg={10} md={6}>
          <h3 className="admin-dashboard-title">All Enquiries</h3>
          {enquiries && (
            <div style={{ height: 600, width: "100%" }}>
              <DataGrid
                className="admin-dashboard-table"
                loading={isLoading}
                rowCount={enquiries.length}
                rowsPerPageOptions={[5, 10, 15]}
                rows={rows}
                columns={columns}
                pageSize={10}
              />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default AllEnquiries;
