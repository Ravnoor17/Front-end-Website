import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import "../Styles/AdminDashboard.css";
import firebase from "firebase";
import { Redirect } from "react-router";
import { Form } from "react-bootstrap";

function PackageGalleryImages(props) {
  const [added, setAdded] = useState(false);
  const db = firebase.firestore();
  const storage = firebase.storage();
  const packageType = props.match.params.packageType;
  const docId = props.match.params.packageId;

  function handleImageChange(event) {
    const files = event.target.files;
    Array.from(files).forEach((image) => {
      const uploadTask = storage.ref(packageType + "/" + image.name).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (err) => {},
        () => {
          storage
            .ref(packageType)
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              db.collection(packageType)
                .doc(docId)
                .update({
                  imgUrl: firebase.firestore.FieldValue.arrayUnion(url),
                });
              setAdded(true);
            });
        }
      );
    });
  }

  return (
    <div>
      {added ? <Redirect to="/admin/dashboard" /> : null}
      <Row>
        <Col className="admin-dashboard-sidebar" lg={2} md={6}>
          <Sidebar />
        </Col>
        <Col className="admin-dashboard-content" lg={10} md={6}>
          <h3 className="admin-dashboard-title">Add Package Gallery Images</h3>
          <Form className="admin-dashboard-form">
            <input type="file" multiple onChange={handleImageChange} />
          </Form>
          <hr />
        </Col>
      </Row>
    </div>
  );
}

export default PackageGalleryImages;
