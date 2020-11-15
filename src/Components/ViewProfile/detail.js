import React, { Component } from 'react';
import { Col, Row, Modal, ModalHeader } from 'reactstrap';
import CustomButton from "../CustomBtn";
import { connect } from 'react-redux';
import UpdateProfile from './update';
import './style.css';

const image = `${process.env.REACT_APP_IMAGE}/images`;
class ViewDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    let { isAuthenticated } = this.props.user;
    if (isAuthenticated === true) {
      this.setState({
        isOpen: !this.state.isOpen
      });
    } else {

    }
  };
  handleSubmit = isOpen => {
    this.setState({ isOpen: isOpen });
  };
  render() {
    const { firstName, lastName, number, age, gender } = this.props.user.user
    const profileImage = this.props.user.user.image
    return (
      <div>
        <div className="viewProfileHeading">
          <div className="aboutheading">
            <h1>My Profile</h1>
          </div>
        </div>
        {profileImage ? 
        <div className="profilePicDiv">
         <img style={{ width: "200px", height: "200px" ,borderRadius: "50%" }} src={`${image}/${this.props.items.image}`} alt="" /> 
        </div>
        : <></>}
        <div className="viewDetail">
          <Row>
            <Col md="12">
              <Row>
                <Col md="3"></Col>
                <Col md="3">
                  <h1>User name</h1>
                </Col>
                <Col md="3">
                  <h3>{this.props.items.username}</h3>
                </Col>
                <Col md="3"></Col>
              </Row>
              <Row>
                <Col md="3"></Col>
                <Col md="3">
                  <h1>Compay name</h1>
                </Col>
                <Col md="3">
                  <h3>{this.props.items.companyName}</h3>
                </Col>
                <Col md="3"></Col>
              </Row>
              <Row>
                <Col md="3"></Col>
                <Col md="3">
                  <h1>Email</h1>
                </Col>
                <Col md="3">
                  <h3>{this.props.items.email}</h3>
                </Col>
                <Col md="3"></Col>
              </Row>
              {firstName ?
                <Row>
                  <Col md="3"></Col>
                  <Col md="3">
                    <h1>First name</h1>
                  </Col>
                  <Col md="3">
                    <h3>{this.props.items.firstName}</h3>
                  </Col>
                  <Col md="3"></Col>
                </Row> :
                <></>}
              {lastName ?
                <Row>
                  <Col md="3"></Col>
                  <Col md="3">
                    <h1>Last name</h1>
                  </Col>
                  <Col md="3">
                    <h3>{this.props.items.lastName}</h3>
                  </Col>
                  <Col md="3"></Col>
                </Row> : <></>}
              {number ?
                <Row>
                  <Col md="3"></Col>
                  <Col md="3">
                    <h1>Number</h1>
                  </Col>
                  <Col md="3">
                    <h3>{this.props.items.number}</h3>
                  </Col>
                  <Col md="3"></Col>
                </Row> :
                <></>}
              {age ?
                <Row>
                  <Col md="3"></Col>
                  <Col md="3">
                    <h1>Age</h1>
                  </Col>
                  <Col md="3">
                    <h3>{this.props.items.age}</h3>
                  </Col>
                  <Col md="3"></Col>
                </Row> :
                <></>}
              {gender ?
                <Row>
                  <Col md="3"></Col>
                  <Col md="3">
                    <h1>Gender</h1>
                  </Col>
                  <Col md="3">
                    <h3>{this.props.items.gender}</h3>
                  </Col>
                  <Col md="3"></Col>
                </Row> :
                <></>}
            </Col>
          </Row>
          <div className="viewProfileButton">
            <CustomButton name="Update" onClick={this.toggle} />
          </div>
        </div>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}></ModalHeader>
          <UpdateProfile onUpdateUser={this.handleSubmit} />
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.auth.user,
    user: state.auth,
    update: state.auth.update
  };
};
export default connect(mapStateToProps)(ViewDetail);
