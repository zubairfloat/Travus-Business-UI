import React, { Component } from 'react';
import { Row, Col, FormGroup, Input } from 'reactstrap';
import * as Constants from '../../Constants';
import * as businessAc from '../../MyStore/actions/businessAc';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NewCompo from './newMap';
import CustomButton from '../CustomBtn';
import { IoMdAddCircleOutline } from 'react-icons/io';
import Loader from 'react-loader-spinner';
import './style.css';

class ListContent extends Component {
  constructor() {
    super();
    this.state = {
      businessUser: {
        businessName: '',
        userEmail: '',
        typeOfBusiness: 'Food',
        role: '',
        option: '',
        location: '',
        city: '',
        image: ''
      }
    };
  }
  addressComplete = locate => {
    let mylocation = locate.address;
    let city = locate.area;
    let country = locate.state;
    let lat = locate.newLng;
    let lng = locate.newLat;
    let nearlat = locate.newLng;
    let nearlng = locate.newLat;
    this.setState({
      businessUser: {
        ...this.state.businessUser,
        location: mylocation,

        cityLocation: {
          type: 'Point',
          coordinates: [lat, lng]
        },
        businessLocation: {
          type: 'Point',
          coordinates: [nearlat, nearlng]
        },
        city: city,
        country: country
      }
    });
  };
  componentWillReceiveProps(props) {
    if (props.create && this.props.create !== props.create) {
      this.props.history.push('/viewprofile');
    }
  }
  onSubmit = e => {
    e.preventDefault();
    const userID = this.props.items.userId;
    const { businessName, userEmail, typeOfBusiness, role } = this.state.businessUser;
    if (businessName.length === 0) {
      alert('First Name Field is Empty');
    } else if (userEmail.length === 0) {
      alert('User Email Field is Empty');
    } else if (typeOfBusiness.length === 0) {
      alert('Bussiness Field is Empty');
    } else if (role.length === 0) {
      alert('Role Field is Empty');
    } else {
      let formData = new FormData();
      let businessUser = this.state.businessUser;
      formData.append('image', this.state.image);
      formData.append('businessName', businessUser.businessName);
      formData.append('userEmail', businessUser.userEmail);
      formData.append('typeOfBusiness', businessUser.typeOfBusiness);
      formData.append('role', businessUser.role);
      formData.append('option', businessUser.option);
      formData.append('location', businessUser.location);
      formData.append('city', businessUser.city);
      formData.append('country', businessUser.country);
      formData.append('businessLocation', JSON.stringify(businessUser.businessLocation));
      formData.append('cityLocation', JSON.stringify(businessUser.cityLocation));
      formData.append('userID', userID);
      this.props.AddBusiness(formData);
      this.setState({
        image: ''
      });
    }
  };
  onChangeImage = e => {
    this.setState({
      image: e.target.files[0],
      file: URL.createObjectURL(e.target.files[0])
    });
  };
  handleInputChange = ({ currentTarget: input }) => {
    let businessUser = { ...this.state.businessUser };
    businessUser[input.name] = input.value;
    this.setState({ businessUser });
  };
  render() {
    const loading = this.props.loading
    return (
      <div className="listContent">
        <form encType="multipart/form-data" onSubmit={this.onSubmit}>
          <Row>
            <Col md={{ offset: 1, size: 6 }}>
              <h2>{Constants.What_IS_YOUR_NAME}</h2>
              <input
                type="name"
                name="businessName"
                id="BusinessName"
                placeholder="Enter Business Name"
                value={this.state.businessUser.businessName}
                onChange={this.handleInputChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md={{ offset: 1, size: 6 }}>
              <h2>{Constants.WHAT_IS_YOUR_EMAIL}</h2>
              <input
                type="name"
                name="userEmail"
                id="UserEmail"
                placeholder="Enter Your Email"
                value={this.state.businessUser.userEmail}
                onChange={this.handleInputChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md={{ offset: 1, size: 6 }}>
              <h2>{Constants.WHAT_IS_YOUR_BUSINESS}</h2>
              <FormGroup>
                <Input
                  type="select"
                  name="typeOfBusiness"
                  id="exampleSelect"
                  onChange={this.handleInputChange}
                >
                  <option className="optionText" name="typeOfBusiness" value="Food">
                    Food
                  </option>
                  <option className="optionText" name="typeOfBusiness" value="Sleep">
                    Sleep
                  </option>
                  <option className="optionText" name="typeOfBusiness" value="Drink">
                    Drink
                  </option>
                  <option className="optionText" name="typeOfBusiness" value="Party">
                    Party
                  </option>
                  <option className="optionText" name="typeOfBusiness" value="Culture">
                    Culture
                  </option>
                  <option className="optionText" name="typeOfBusiness" value="Fun">
                    Fun
                  </option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={{ offset: 1, size: 6 }}>
              <h2>{Constants.WHAT_IS_YOUR_ROLE}</h2>
              <input
                type="role"
                name="role"
                id="Role"
                placeholder="Enter Your Role"
                value={this.state.role}
                onChange={this.handleInputChange}
              />
            </Col>
          </Row>
          <Row>
            <Col xl={{ offset: 1, size: 8 }}>
              <h2>{Constants.CHECK_ALL_THE_APPLY}</h2>
              <div className="contentListInputDiv">
                <Row >
                  <Col md="4">
                    <Row className="listedCheckApplyRow">
                      <input
                        className="contentLisInput"
                        type="radio"
                        id="option1"
                        name="option"
                        value={Constants.SMALL_BUSINESS}
                        onClick={this.handleInputChange}
                      />
                      <h3>{Constants.SMALL_BUSINESS}</h3>
                    </Row>
                  </Col>
                  <Col md="4">
                    <Row className="listedCheckApplyRow">
                      <input
                        className="contentLisInput"
                        type="radio"
                        id="option2"
                        name="option"
                        value={Constants.BLACK_OWNED_BUSINESS}
                        onClick={this.handleInputChange}
                      />
                      <h3>{Constants.BLACK_OWNED_BUSINESS}</h3>
                    </Row>
                  </Col>
                  <Col md="4">
                    <Row className="listedCheckApplyRow">
                      <input
                        className="contentLisInput"
                        type="radio"
                        id="option3"
                        name="option"
                        value={Constants.FAMILY_OWNED_BUSINESS}
                        onClick={this.handleInputChange}
                      />
                      <h3>{Constants.FAMILY_OWNED_BUSINESS}</h3>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={{ offset: 1, size: 6 }}>
              <h2>{Constants.WHERE_YOUR_BUSINESS}</h2>
              <NewCompo pointerCallBack={this.addressComplete} />
            </Col>
          </Row>
          <Row className="rowuploadimage">
            <Col md={{ offset: 1, size: 6 }}>
              <h2 style={{padding: "100px 0px 10px 0px"}}>7. Upload Your Image</h2>
              <div className="displayColumnUpload">
                <input
                  className="listInputUpload"
                  type="file"
                  id="file"
                  onChange={event => this.onChangeImage(event)}
                />
                <label for="file">
                  <h4>
                    <IoMdAddCircleOutline /> {Constants.CLICK_TO_UPLOAD}
                  </h4>
                </label>
              </div>
              <Row>
                <img className="listedPageImg" src={this.state.file} alt="" />
              </Row>
            </Col>
          </Row>
            {loading && (
              <Row className="listBusinessLoading">
                <Loader
                  className="gridLoading"
                  type="Oval"
                  color="#6E6E6E"
                  height={60}
                  width={80}
                  timeout={10000}
                />
              </Row>
            )}
          {!loading && (
            <div className="listedbottomBtn">
              <CustomButton name={'Submit'} />
            </div>
          )}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    AddBusiness: businessUser => dispatch(businessAc.AddBusiness(businessUser))
  };
};
const mapStateToProps = state => {
  return {
    items: state.auth.user,
    loading: state.business.loading,
    create: state.business.create
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListContent));