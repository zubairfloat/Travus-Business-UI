import React from 'react';
import { Col, Row } from 'reactstrap';
import * as Constants from '../../Constants';
import './style.css';

const Travus = () => {
  return (
    <div className="travusFooter">
      <Col md="10">
        <Row>
          <h1>{Constants.TRAVUS} </h1> <h3>@2019</h3>
        </Row>
        <Row>
          {/* <h2>{Constants.BLACK_TRAVEL}</h2> */}
          <p>{Constants.LOREM_IPSUM_SIT_AMET}</p>
        </Row>
      </Col>
    </div>
  );
};

export default Travus;
