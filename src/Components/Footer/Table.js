import React, { Component } from 'react';
import { Col, Row, Modal, ModalHeader } from 'reactstrap';
import * as Constants from '../../Constants';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import SignInAuth from '../SignIn/form';
import * as authAction from '../../MyStore/actions/authActions';
import './style.css';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  toggle = () => {
      this.setState({
        isOpen: !this.state.isOpen
      });
  };
  logout = () => {
    let user = {};
    this.props.logout(user);
  };
  render() {
    const isAuthenticated = this.props.isAuthenticated
    return (
      <div className="tableFooter">
        <Row>
          <Col sm={{ size: 5 }}>
            <div className="tableDiv" id="tableBarDiv">
              <Row>
                <h1>{Constants.NAVIGATION}</h1>
              </Row>
              <Row>
                <Link style={{ color: 'white' }} to="/">
                  <h2>{Constants.HOME}</h2>
                </Link>
              </Row>
              <Row>
                <Link style={{ color: 'white' }} to="/explore">
                  <h2>{Constants.EXPLORE}</h2>
                </Link>
              </Row>
              <Row>
                <Link style={{ color: 'white' }} to="/plan">
                  <h2>{Constants.PLAN}</h2>
                </Link>
              </Row>
              
              <Row>
              {isAuthenticated ? (<h2 style={{ cursor: "pointer" }} onClick={this.logout}>Logout</h2>) : (<h2 style={{ cursor: "pointer" }} onClick={this.toggle}>{Constants.ACCOUNT}</h2>)}
                
              </Row>
            </div>
          </Col>
          <Col sm={{ offset: 2, size: 4 }}>
            <div className="tableDiv">
              <Row>
                <h1>{Constants.LINKS}</h1>
              </Row>
              <Row>
                <Link style={{ color: 'white' }} to="/about">
                  <h2>{Constants.ABOUT}</h2>
                </Link>
              </Row>
              <Row>
                <Link style={{ color: 'white' }} to="/claim">
                  <h2>Get Listed</h2>
                </Link>
              </Row>
            </div>
          </Col>
        </Row>
        <Modal className="signInModel" isOpen={this.state.isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}></ModalHeader>
          <div className="SingUp">
            <SignInAuth onUpdateUser={this.toggle} />
          </div>
        </Modal>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    transparent: state.auth.transparent,
    isAuthenticated: state.auth.isAuthenticated
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: user => dispatch(authAction.logout(user)),
  }
}
export default (connect(mapStateToProps, mapDispatchToProps)(Table));