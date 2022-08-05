import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import "../Styles/AdminDashboard.css";
import { DataGrid } from "@material-ui/data-grid";
import firebase from "firebase";
import "../Styles/CustomRequests.css";

function CustomPackage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getRequests();
  }, []);

  const [isLoading, setLoading] = useState(false);

  const columns = [
    { field: "id", headerName: "Request ID", width: 225 },
    { field: "customerName", headerName: "Customer name", width: 250 },
    { field: "destination", headerName: "Destination", width: 250 },
    { field: "budget", headerName: "Budget", width: 150, type: "number" },
    {
      field: "customerPhone",
      headerName: "Customer Number",
      sortable: true,
      width: 225,
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
    db.collection("CustomPackages")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length) {
          querySnapshot.docs.forEach((doc) => {
            if (doc.data) {
              setRequests((prev) => {
                return [...prev, doc.data()];
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
      customerName: customRequest.name,
      destination: customRequest.destination,
      budget: customRequest.budget,
      customerPhone: customRequest.phNo,
      email: customRequest.email,
    };
  });
  return (
    <div>
      <Row>
        <Col className="admin-dashboard-sidebar" lg={2} md={6}>
          <Sidebar />
        </Col>
        <Col className="admin-dashboard-content" lg={10} md={6}>
          <h3 className="admin-dashboard-title">Custom Package Requests</h3>
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
              />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default CustomPackage;
