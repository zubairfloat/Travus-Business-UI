import React from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import mountain from '../../Images/mountain.jpg';
import feature2 from '../../Images/feature2.jpg';
import feature3 from '../../Images/feature3.jpg';
import * as Constants from '../../Constants';
import './style.css';

const Feature = () => {
  return (
    <div>
      <div className="feature">
        <Container fluid={true}>
          <Row>
            <Col md={{ offset: 1, size: 4 }}>
              <div className="featureOffer">
                <h1>{Constants.OFFERING1}</h1>
              </div>
              <div className="featureOfferRead">
                <h4>{Constants.NEMO_ENIM_IPSAM}</h4>
                <h5>{}</h5>
              </div>
            </Col>
            <Col md={{ offset: 1, size: 5 }}>
              <div>
                <img className="featureImg" src={mountain} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="feature">
        <Container fluid={true}>
          <Row>
            <Col md={{ offset: 1, size: 4 }}>
              <div className="featureOffer">
                <h1>{Constants.OFFERING2}</h1>
              </div>
              <div className="featureOfferRead">
                <h4>{Constants.NEMO_ENIM_IPSAM}</h4>
                <h5>{Constants.LEARN_MORE}</h5>
              </div>
            </Col>
            <Col md={{ offset: 1, size: 5 }}>
              <div>
                <img className="featureImg" src={feature2} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="feature">
        <Container fluid={true}>
          <Row>
            <Col md={{ offset: 1, size: 4 }}>
              <div className="featureOffer">
                <h1>{Constants.OFFERING3}</h1>
              </div>
              <div className="featureOfferRead">
                <h4>{Constants.NEMO_ENIM_IPSAM}</h4>
                <h5>{Constants.LEARN_MORE}</h5>
              </div>
            </Col>
            <Col md={{ offset: 1, size: 5 }}>
              <div>
                <img className="featureImg" src={feature3} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="featureDivBtn">
        <Button className="featureInBtn">{Constants.PARTNER_WITH_US}</Button>
      </div>
    </div>
  );
};
export default Feature;
