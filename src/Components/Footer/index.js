import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Travus from './travus';
import Table from './Table';
import Icons from './Icons';
import './style.css';

class Footer extends Component {
  render() {
    return (
      <Container fluid={true}>
        <Row className="footer">
          <Col xl={{ offset: 1, size: 3 }}>
            <Travus />
          </Col>
          <Col xl={{ offset: 1, size: 4 }}>
            <Table />
          </Col>
          <Col xl="2">
            <Icons />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Footer;
