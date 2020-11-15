import React from 'react';
import { Row, Col } from 'reactstrap';
import { GiKnifeFork, GiMusicalNotes } from 'react-icons/gi';
import { FaHome } from 'react-icons/fa';
import * as Constants from '../../Constants/index';

const ActivityDiv = ( props) => {
  return (
    <div className="activityCard">
      <Row>
        <Col>
          <div className="activityCardDay">
            <h1>{`Day ${props.nDay}`}</h1>
          </div>
        </Col>
        <div className="activityIcons">
          <FaHome />
          <GiKnifeFork />
          <GiMusicalNotes />
          <GiMusicalNotes />
          <GiKnifeFork />
        </div>
        <div className="activityIcons">
          <h3>9:00</h3>
          <h3>12:00</h3>
          <h3>14:50</h3>
          <h3>17:00</h3>
          <h3>21:00</h3>
        </div>
        <Col>
          <div className="activityTextDiv">
            <div className="activityText">
              <h3>{Constants.ACTIVITY}</h3>
              <h5>{Constants.LOCATION_4_MILES}</h5>
            </div>
            <div className="activityText">
              <h3>{Constants.ACTIVITY}</h3>
              <h5>{Constants.LOCATION_4_MILES}</h5>
            </div>
            <div className="activityText">
              <h3>{Constants.ACTIVITY}</h3>
              <h5>{Constants.LOCATION_4_MILES}</h5>
            </div>
            <div className="activityText">
              <h3>{Constants.ACTIVITY}</h3>
              <h5>{Constants.LOCATION_4_MILES}</h5>
            </div>
            <div className="activityText">
              <h3>{Constants.ACTIVITY}</h3>
              <h5>{Constants.LOCATION_4_MILES}</h5>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default ActivityDiv;
