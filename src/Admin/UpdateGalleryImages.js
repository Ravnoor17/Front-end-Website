import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Sidebar from "../Admin/Sidebar";
import "../Styles/updategallery.css";
import firebase from "firebase";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../Styles/AdminDashboard.css";

function UpdateGalleryImages(props) {
  const [images, setImages] = useState([]);
  const db = firebase.firestore();
  const packageType = props.match.params.packageType;
  const packageId = props.match.params.packageId;

  useEffect(() => {
    getGalleryImages();
  }, []);

  function getGalleryImages() {
    setImages([]);
    db.collection(packageType)
      .doc(packageId)
      .get()
      .then((snapshot) => {
        if (snapshot) {
          const data = snapshot.data();
          const imgUrls = data.imgUrl;
          setImages(imgUrls);
        }
      });
  }

  function deleteImage(img) {
    db.collection(packageType)
      .doc(packageId)
      .update({
        imgUrl: firebase.firestore.FieldValue.arrayRemove(img),
      })
      .then(() => {
        getGalleryImages();
      });
  }

  return (
    <div>
      <Row>
        <Col className="admin-dashboard-sidebar" lg={2} md={6}>
          <Sidebar />
        </Col>
        <Col className="admin-dashboard-content">
          <div className="admin-dashboard-title-div">
            <h1 className="admin-dashboard-title">Gallery Images</h1>
          </div>

          <div style={{ marginTop: "60px" }}>
            <Row style={{ marginBottom: "20px", textAlign: "center" }}>
              <Col>
                <Link to={`/admin/package/${packageType}/${packageId}`}>
                  Add Gallery Images
                </Link>
              </Col>
            </Row>
            <Row style={{ marginBottom: "80px" }}>
              {images &&
                images.map((img) => {
                  return (
                    <Col sm={12} md={6} lg={4}>
                      <div>
                        <img className="gallery-images" src={img} alt="image" />
                        <Button
                          onClick={() => {
                            deleteImage(img);
                          }}
                          style={{
                            marginBottom: "20px",
                            backgroundColor: "var(--primary)",
                          }}
                        >
                          Delete this image
                        </Button>
                      </div>
                    </Col>
                  );
                })}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default UpdateGalleryImages;
