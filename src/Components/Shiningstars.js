import React from "react";
import "../Styles/Shiningstars.css";
import { Col, Row } from "react-bootstrap";
import TeamMemberCard, {
  TeamMemberCard2,
  TeamMemberCard3,
} from "./TeamMemberCard";
import TeamSocials from "./TeamSocials";

const Shiningstars = () => {
  return (
    <div className="shiningstars-main">
      <Row className="shiningstars-row xtra">
        <Col lg={6}>
          <TeamMemberCard />
        </Col>
        <Col className="shiningstars-description" lg={6}>
          <h2 className="titlee-alt">Achievements:</h2>
          <p className="copyy-alt">
            <ul className="achi-list-founderr">
              <li>
                <b>SKIING</b>
                <ul className="achi-list-founderr">
                  <li>
                    <b>1996</b> Second Position in Auli National Winter Games
                    Open Skiing Championship
                  </li>
                  <li>
                    <b>1997</b> Third Position in National Winter Games
                  </li>
                  <li>
                    <b>1998</b> Third Position in National Open Skiing
                    Championship
                  </li>
                  <li>
                    <b>1999</b> First Position in Winter Sports Championship
                  </li>
                  <li>
                    <b>2000-2004</b> Participate in National Winter Games
                  </li>
                </ul>
              </li>
              <li>
                {" "}
                <b>SNOWBOARDING</b>
                <ul className="achi-list-founderr">
                  <li>
                    <b>2008</b> First position (SL) in 5th National Winter Games
                  </li>
                  <li>
                    <b>2008</b> First position (GS) in 5th National Winter Games
                  </li>
                  <li>
                    <b>2008</b> International Snowboarding Competition - IRIAN
                  </li>
                  <li>
                    <b>2010</b> Second Position in National Snowboarding
                    Championship
                  </li>
                  <li>
                    <b>2012</b> First Position (SL) in National Open Skiing
                    Championship
                  </li>
                  <li>
                    <b>2012</b> Represent INDIA in International Skiing
                    Federation (FIS) meet in - BULGARIA
                  </li>
                  <li>
                    <b>2012</b> First Position (GS) in National Open Skiing
                    Championship
                  </li>
                </ul>
              </li>
            </ul>
          </p>
          <TeamSocials
            facebook="https://m.facebook.com/profile.php?id=1184490462&ref=content_filter"
            instagram="https://instagram.com/traveller.monk?igshid=nc3bc0sx258f"
          />
        </Col>
      </Row>
      <Row className="shiningstars-row">
        <Col className="shiningstars-description" lg={6}>
          <h2 className="titlee-alt">Achievements:</h2>
          <p className="copyy-alt">
            <ul className="achi-list-founderr"></ul>
          </p>
          <TeamSocials
            facebook="https://www.facebook.com/parmod.panwar.90/?show_switched_toast=0"
            instagram="https://instagram.com/parmod.panwar.90?igshid=11z48elw5c6ko"
          />
        </Col>
        <Col lg={6}>
          <TeamMemberCard2 />
        </Col>
      </Row>
      <Row className="shiningstars-row">
        <Col lg={6}>
          <TeamMemberCard3 />
        </Col>
        <Col className="shiningstars-description" lg={6}>
          <h2 className="titlee-alt">Achievements:</h2>
          <p className="copyy-alt">
            <ul className="achi-list-founderr"></ul>
          </p>
          <TeamSocials facebook="https://www.facebook.com/vandana.panwar.52/?show_switched_toast=0" />
        </Col>
      </Row>
    </div>
  );
};

export default Shiningstars;
