import React from 'react';
import { Row } from 'reactstrap';
import { FaFacebookSquare, FaTwitterSquare, FaYoutube, FaInstagram } from 'react-icons/fa';
import * as Constants from '../../Constants';
import './style.css';

const Icons = () => {
  return (
    <div className="iconsFooterHead">
      <Row>
        <h1>{Constants.FOLLOW_US}</h1>
      </Row>
      <Row className="iconsRow">
        <FaFacebookSquare className="iconsFooter" /> <FaTwitterSquare className="iconsFooter" />{' '}
        <FaYoutube className="iconsFooter" /> <FaInstagram className="iconsFooter" />
      </Row>
      <Row>
        <div className="footerSearch">
          <input placeholder=" &#xF002; Search"></input>
        </div>
      </Row>
    </div>
  );
};

export default Icons;
