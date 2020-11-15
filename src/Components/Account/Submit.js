import React, { Component } from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import * as Constants from '../../Constants';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as businessActions from '../../MyStore/actions/businessAc';
import './style.css';

const image = `${process.env.REACT_APP_SERVER}/images`;
class Submit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: {
        firstName: '',
        lastName: '',
        workEmail: '',
        phone: '',
        title: '',
        price: '',
      }
    };
  }
  handleInputChange = ({ currentTarget: input }) => {
    let update = { ...this.state.update };
    update[input.name] = input.value;
    this.setState({ update });
  };
  onSubmit = () => {
    if (!this.props.user.isAuthenticated) {
      alert('You must be logged in to claim any business');
      return;
    }
    const { firstName, lastName, workEmail, phone, title , price} = this.state.update;
    if (firstName.length === 0) {
      alert('First-Name Field is Empty');
    } else if (lastName.length === 0) {
      alert('Last-Name Field is Empty');
    } else if (workEmail.length === 0) {
      alert('Email Field is Empty');
    } else if (phone.length === 0) {
      alert('Number Field is Empty');
    } else if (title.length === 0) {
      alert('Title Field is Empty');
    }else if (price.length === 0) {
      alert('Price Field is Empty');
    }  
    else {
      let update = { ...this.state.update };
      this.props.businessUpdate(update);
      this.setState({
        update: {
          firstName: '',
          lastName: '',
          workEmail: '',
          phone: '',
          title: '',
          price: '',
        }
      });
    }
    this.scrollToTop();
  };
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  render() {
    let { search } = this.props.items;
    let item = this.props.items.searchBusiness;
    // let createImage = item.image
    return (
      <div className="acountSubmit">
        <Container>
          <Row>
            <Col xl="6">
              <Row>
                <Col sm="6">
                  <div>
                   {item.prefix ? <img className="submitAdmin" src={`${item.prefix}${'280x250'}${item.suffiex}`} alt={item.title}/> : <></>}
                   {item.image ? <img style={{ width: "300px", minHeight: "300px" }} src={`${image}/${item.image}`} alt="" /> :<></>}
                  </div>
                </Col>
                <Col sm="6">
                  <div className="submitProfileText">
                    {search ? <h1>{item.businessName} </h1> : <h1>{Constants.COMPANY_NAME}</h1>}
                    <p>{Constants.ACCOUNT_LOREM_IPSUM_DOLOR}</p>
                  </div>
                </Col>
                <Row>
                  <Col>
                    <div className="sumbitText">
                      <h4>
                        <input type="checkbox" /> &nbsp; &nbsp;{Constants.LOREM_IPSUM_CONSECTETUR}
                      </h4>
                      <h4>
                        <input type="checkbox" />
                        &nbsp; &nbsp;{Constants.LOREM_IPSUM_CONSECTETUR}
                      </h4>
                    </div>
                  </Col>
                </Row>
              </Row>
            </Col>
            <Col xl="6">
              <div className="submitInputDiv">
                <Row className="rowPadding">
                  <Col sm={{ offset: 1, size: 11 }}>
                    <input
                      type="name"
                      name="firstName"
                      id="FirstName"
                      placeholder="First Name"
                      value={this.state.update.firstName}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </Row>
                <Row className="rowPadding">
                  <Col sm={{ offset: 1, size: 11 }}>
                    <input
                      type="name"
                      name="lastName"
                      id="LastName"
                      placeholder="Last Name"
                      value={this.state.update.lastName}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </Row>
                <Row className="rowPadding">
                  <Col sm={{ offset: 1, size: 11 }}>
                    <input
                      type="email"
                      name="workEmail"
                      id="Email"
                      placeholder="Business Email Address"
                      value={this.state.update.workEmail}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </Row>
                <Row className="rowPadding">
                  <Col sm={{ offset: 1, size: 11 }}>
                    <input
                      type="phone"
                      name="phone"
                      id="Number"
                      placeholder="Business Number"
                      value={this.state.update.phone}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </Row>
                <Row className="rowPadding">
                  <Col sm={{ offset: 1, size: 11 }}>
                    <input
                      type="title"
                      name="title"
                      id="Title"
                      placeholder="Your Title"
                      value={this.state.update.title}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </Row>
                <Row className="rowPadding">
                  <Col sm={{ offset: 1, size: 11 }}>
                    <input
                      type="name"
                      name="price"
                      id="price"
                      placeholder="Price $"
                      value={this.state.update.price}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </Row>
                <Row className="rowPadding">
                  <Col className="submitAccontBtn" sm="12">
                    <Button type="submit" className="submitAcountBtn" onClick={this.onSubmit}>
                      Submit
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    businessUpdate: update => dispatch(businessActions.businessUpdate(update))
  };
};
const mapStateToProps = state => {
  return {
    items: state.business,
    user: state.auth
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Submit));