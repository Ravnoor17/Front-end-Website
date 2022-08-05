import React, { useState, useContext } from "react";
import "./Form.css";
// import Modal from "react-bootstrap/Modal";
// import { Button, Card, Col, Row } from "react-bootstrap";
// import call from "../../Assets/call.svg";
// import whatsapp from "../../Assets/whatsapp.svg";
import { FaRupeeSign } from "react-icons/fa";
import Payment from "../Payment";
import authContext from '../../utils/auth-hook'
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
const Pricecard = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const history = useHistory();

  const authData = useContext(authContext)

  console.log(authData)
  // function MyVerticallyCenteredModal(prps) {
  //   return (
  //     <Modal
  //       {...prps}
  //       size="lg"
  //       aria-labelledby="contained-modal-title-vcenter"
  //       centered
  //     >
  //       <Modal.Header closeButton>
  //         <Modal.Title id="contained-modal-title-vcenter">
  //           Book your trip
  //         </Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <Row>
  //           <Col>
  //             <a className="modal-link" href="tel:919557212758">
  //               <Card className="modal-card">
  //                 <Card.Body>
  //                   <img className="modal-card-img" src={call} alt="call" />
  //                   <p>Call</p>
  //                 </Card.Body>
  //               </Card>
  //             </a>
  //           </Col>
  //           <Col>
  //             <a
  //               className="modal-link"
  //               href={`https://api.whatsapp.com/send?phone=919557212758&text=I'm%20interested%20in%20your%20tourism%20package%20`}
  //               target="_blank"
  //             >
  //               <Card className="modal-card">
  //                 <Card.Body>
  //                   <img
  //                     className="modal-card-img"
  //                     src={whatsapp}
  //                     alt="whatsapp"
  //                   />
  //                   <p>WhatsApp</p>
  //                 </Card.Body>
  //               </Card>
  //             </a>
  //           </Col>
  //         </Row>
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <Button className="modal-button" onClick={prps.onHide}>
  //           Close
  //         </Button>
  //       </Modal.Footer>
  //     </Modal>
  //   );
  // }

  return (
    <div className="price-card-main">
      <div className="price-card">
        <div className="price-card1">
          <p>
            Starting from{" "}
            <span>
              <FaRupeeSign />
              {parseInt(props.price[0].cost) + 1000}
            </span>
          </p>
          <h2>
            <FaRupeeSign />
            {props.price && props.price[0] && props.price[0].cost}{" "}
            <span>
              {parseInt((1000 / (parseInt(props.price[0].cost) + 1000)) * 100)}%
              Off
            </span>
          </h2>
          <h4>{props.price[0].type}</h4>
        </div>
        <hr />
        <div className="price-card2">
        {
          authData && authData.isAuth && authData.isAuth 
          ?
          <button onClick={() => setModalShow(true)}>Book Now</button>
          :
          <button onClick={() => history.push("/signin")}>Book Now</button>
        }
          
        </div>
        <div className="price-card2">
          <button style={{ marginTop: "14px" }}>
            <a className="link-pay" href="tel:+91-7906114905">
              Call Support
            </a>
          </button>
        </div>
        <div className="price-card2">
          <button style={{ marginTop: "14px" }}>
            <a
              className="link-pay"
              href={`https://api.whatsapp.com/send?phone=9815410772&text=I'm%20interested%20in%20your%20tourism%20package%20`}
              target="_blank"
            >
              WhatsApp Support
            </a>
          </button>
        </div>
        {props.seats && props.price && (
          <Payment
            show={modalShow}
            onHide={() => setModalShow(false)}
            seats={props.seats}
            pricing={props.price}
            packageType={props.packageType}
            packageId={props.packageId}
            packageName={props.packageName}
          />
        )}
      </div>
    </div>
  );
};

export default Pricecard;
