import React, { useState, useEffect } from "react";
import { Col, Row, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";
import "../Styles/AdminDashboard.css";
import firebase from "firebase";
import { DataGrid } from "@material-ui/data-grid";
import { Redirect } from "react-router";

function AllPacakges() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    getPackages("Skiing");
  }, []);

  const [packageType, setPackageType] = useState("Skiing");

  // Package type change handling
  function handleTypeChange(event) {
    setPackageType(event.target.value);

    getPackages(event.target.value);
  }

  const [isLoading, setLoading] = useState(false);

  const columns = [
    { field: "id", headerName: "Package ID", width: 240 },
    { field: "packageName", headerName: "Package name", width: 300 },
    { field: "packageDuration", headerName: "Package Duration", width: 200 },
    {
      field: "packageCost",
      headerName: "Package Cost",
      type: "number",
      width: 200,
    },
    {
      field: "packageType",
      headerName: "Package Type",
      sortable: true,
      width: 240,
    },
  ];

  function getPackages(packageType) {
    const db = firebase.firestore();
    setPackages([]);
    setLoading(true);
    db.collection(packageType)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length) {
          querySnapshot.docs.forEach((doc) => {
            if (doc.data) {
              setPackages((prev) => {
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

  const [redirectPath, setRedirectPath] = useState("");
  const [redirect, setRedirect] = useState(false);

  const redirectToSingle = (row) => {
    setRedirectPath("/single/" + row.data.packageType + "/" + row.data.id);
    setRedirect(true);
  };

  const rows = packages.map((pckg) => {
    return {
      id: pckg.packageId,
      packageName: pckg.name,
      packageDuration: pckg.duration,
      packageCost: pckg.pricing[0].cost,
      packageType: pckg.packageType,
    };
  });
  return (
    <div>
      {redirect ? <Redirect to={redirectPath} /> : null}
      <Row>
        <Col className="admin-dashboard-sidebar" lg={2} md={6}>
          <Sidebar />
        </Col>
        <Col className="admin-dashboard-content" lg={10} md={6}>
          <h3 className="admin-dashboard-title">All Packages</h3>
          <Form.Group controlId="package-type">
            <Form.Control
              onChange={handleTypeChange}
              as="select"
              name="package-type"
              value={packageType}
            >
              <option>Trekking</option>
              <option>Expedition</option>
              <option>Skiing</option>
              <option>Camping</option>
              <option>Spiritual Tours</option>
              <option>Bike Trips</option>
              <option>Rafting</option>
              <option>Cycling</option>
              <option>Rock Climbing</option>
              <option>Snowboarding</option>
            </Form.Control>
          </Form.Group>
          {packages && (
            <div style={{ height: 600, width: "100%" }}>
              <DataGrid
                loading={isLoading}
                rowCount={packages.length}
                rowsPerPageOptions={[5, 10, 15]}
                rows={rows}
                columns={columns}
                pageSize={10}
                onRowSelected={redirectToSingle}
              />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default AllPacakges;
