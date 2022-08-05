import React from "react";
import { Col, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import "../Styles/AdminDashboard.css";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <Row>
        <Col className="admin-dashboard-sidebar" lg={2} md={6}>
          <Sidebar />
        </Col>
        <Col className="admin-dashboard-content" lg={10} md={6}>
          <h3 className="admin-dashboard-title">Admin Dashboard</h3>
          <Row className="admin-dashboard-cards-row">
            <Col lg={4} md={6} sm={12}>
              <Link className="admin-dashboard-link" to="/admin/allpackages">
                <Card className="admin-dashboard-card">
                  <Card.Body className="admin-dashboard-card-body">
                    <h3>All Packages</h3>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <Link className="admin-dashboard-link" to="/admin/addpackage">
                <Card className="admin-dashboard-card">
                  <Card.Body className="admin-dashboard-card-body">
                    <h3>Add Package</h3>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <Link className="admin-dashboard-link" to="/admin/customrequests">
                <Card className="admin-dashboard-card">
                  <Card.Body className="admin-dashboard-card-body">
                    <h3>Custom Package Requests</h3>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          </Row>
          <Row className="admin-dashboard-cards-row">
            <Col lg={4} md={6} sm={12}>
              <Link
                className="admin-dashboard-link"
                to="/admin/contactrequests"
              >
                <Card className="admin-dashboard-card">
                  <Card.Body className="admin-dashboard-card-body">
                    <h3>Contact Requests</h3>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <Link className="admin-dashboard-link" to="/admin/allenquiries">
                <Card className="admin-dashboard-card">
                  <Card.Body className="admin-dashboard-card-body">
                    <h3>All Enquiries</h3>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <Link className="admin-dashboard-link" to="/admin/allbookings">
                <Card className="admin-dashboard-card">
                  <Card.Body className="admin-dashboard-card-body">
                    <h3>All Bookings</h3>
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

export default AdminDashboard;
