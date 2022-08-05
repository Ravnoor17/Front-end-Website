import React, { useState, useEffect } from "react";
import { Col, Row, Modal, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import "../Styles/AdminDashboard.css";
import { DataGrid } from "@material-ui/data-grid";
import firebase from "firebase";
import "../Styles/CustomRequests.css";
import ReviewModal from "./reviewModal";

function SinglePackageReviews(props) {
  const [reviews, setReviews] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [roww, setRoww] = useState({ review: "", name: "", id: "" });
  const [packageType, setPackageType] = useState(
    props.match.params.packageType
  );
  const [docId, setDocId] = useState(props.match.params.packageId);

  useEffect(() => {
    getReviews();
  }, []);

  const [isLoading, setLoading] = useState(false);

  const columns = [
    { field: "id", headerName: "Review ID", width: 225 },
    { field: "userId", headerName: "User ID", width: 225 },
    { field: "userName", headerName: "Customer Name", width: 250 },
    { field: "review", headerName: "Review", width: 250 },
  ];

  function getReviews() {
    const db = firebase.firestore();
    setReviews([]);
    setLoading(true);
    db.collection(props.match.params.packageType)
      .doc(props.match.params.packageId)
      .collection("Reviews")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length) {
          querySnapshot.docs.forEach((doc) => {
            if (doc.data()) {
              const uid = doc.data().userId;
              db.collection("Users")
                .doc(uid)
                .get()
                .then((user) => {
                  const userData = user.data();

                  setReviews((prev) => {
                    return [
                      ...prev,
                      {
                        id: doc.id,
                        userId: uid,
                        review: doc.data().review,
                        userName: userData.name,
                      },
                    ];
                  });
                  setLoading(false);
                });
            }
          });
        } else {
          setLoading(false);
        }
      });
  }

  const rows = reviews.map((rev) => {
    return {
      id: rev.id,
      userId: rev.userId,
      userName: rev.userName,
      review: rev.review,
    };
  });
  function rowSelected(row) {
    setModalShow(true);
    const rowData = { name: "", review: "", id: "" };
    rowData.name = row.data.userName;
    rowData.review = row.data.review;
    rowData.id = row.data.id;

    setRoww(rowData);
  }
  function DeleteReview(e) {
    e.preventDefault();
    const db = firebase.firestore();

    db.collection(packageType)
      .doc(docId)
      .collection("Reviews")
      .doc(roww.id)
      .delete()
      .then(() => {
        getReviews();
        setModalShow(false);
      });
  }

  return (
    <div>
      <Row>
        <Col className="admin-dashboard-sidebar" lg={2} md={6}>
          <Sidebar />
        </Col>
        <Col className="admin-dashboard-content" lg={10} md={6}>
          <h3 className="admin-dashboard-title">Package Reviews</h3>
          {reviews && (
            <div style={{ height: 600, width: "100%" }}>
              <DataGrid
                className="admin-dashboard-table"
                loading={isLoading}
                rowCount={reviews.length}
                rowsPerPageOptions={[5, 10, 15]}
                rows={rows}
                columns={columns}
                pageSize={10}
                onRowSelected={rowSelected}
              />
            </div>
          )}
          <Modal
            show={modalShow}
            onHide={() => {
              setModalShow(false);
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                {roww.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>{roww.review}</Modal.Body>
            <Modal.Footer>
              <Button onClick={DeleteReview}>Delete Review</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </div>
  );
}

export default SinglePackageReviews;
