import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import firebase from "firebase";
import { Link, Redirect } from "react-router-dom";

function SinglePackageDashboard(props) {
  const [packageType, setPackageType] = useState(
    props.match.params.packageType
  );
  const [docId, setDocId] = useState(props.match.params.packageId);
  const [deleted, setDeleted] = useState(false);
  const [name, setName] = useState("");
  const db = firebase.firestore();
  const [packages, setPackage] = useState({});

  useEffect(() => {
    getPackage(packageType);
  }, []);

  function getPackage(packageType) {
    db.collection(packageType)
      .doc(docId)
      .get()
      .then((snapshot) => {
        setName(snapshot.data().name);
      });
  }
  
  const deletePackage = (e) => {
    e.preventDefault();
    db.collection(packageType)
      .doc(docId)
      .delete()
      .then(() => {
        setDeleted(true);
      });
  };

  return (
    <div>
      {deleted ? <Redirect to="/admin/allpackages" /> : null}
      <Row>
        <Col className="admin-dashboard-sidebar" lg={2} md={6}>
          <Sidebar />
        </Col>

        <Col className="admin-dashboard-content" lg={10} md={6}>
          <h3 className="admin-dashboard-title">{name}</h3>
          <Row className="admin-dashboard-cards-row">
            <Col lg={6} md={6} sm={12}>
              <Link
                className="admin-dashboard-link"
                to={`/admin/editpackage/${packageType}/${docId}`}
              >
                <Card className="admin-dashboard-card">
                  <Card.Body className="admin-dashboard-card-body">
                    <h3>Edit Package</h3>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <Card onClick={deletePackage} className="admin-dashboard-card">
                <Card.Body className="admin-dashboard-card-body">
                  <h3>Delete Package</h3>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="admin-dashboard-cards-row">
            <Col lg={6} md={6} sm={12}>
              <Link
                className="admin-dashboard-link"
                to={`/admin/editpackage/updategallery/${packageType}/${docId}`}
              >
                <Card className="admin-dashboard-card">
                  <Card.Body className="admin-dashboard-card-body">
                    <h3>Edit Gallery Images </h3>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <Link
                className="admin-dashboard-link"
                to={`/admin/package/reviews/${packageType}/${docId}`}
              >
                <Card className="admin-dashboard-card">
                  <Card.Body className="admin-dashboard-card-body">
                    <h3>View Reviews</h3>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          </Row>

          
        </Col>
      </Row>
    </div>
  );
}

export default SinglePackageDashboard;
