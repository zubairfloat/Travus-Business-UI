import React, { Component } from 'react';
import { Row, Col, Button, } from 'reactstrap';
import { connect } from 'react-redux';
import * as authActions from '../../MyStore/actions/authActions';
import * as Constants from '../../Constants';
import Loader from 'react-loader-spinner';

import { IoMdAddCircleOutline } from 'react-icons/io';
import './style.css';

class UpdateProfile extends Component {
    constructor() {
        super();
        this.state = {
            userUpdate: {
                firstName: '',
                lastName: '',
                age: '',
                number: '',
                gender: '',
                image: '',
            }
        };
    }
    componentWillReceiveProps(props) {
        if (props.update && this.props.update !== props.update) {
          let isOpen = false;
          this.props.onUpdateUser(isOpen);
        }
      }
    onChangeImage = e => {
        this.setState({
            image: e.target.files[0],
            file: URL.createObjectURL(e.target.files[0])
        });
    };
    handleInputChange = ({ currentTarget: input }) => {
        let userUpdate = { ...this.state.userUpdate };
        userUpdate[input.name] = input.value;
        this.setState({ userUpdate });
    };
    onSubmitReview = e => {
        e.preventDefault();
        const userId = this.props.user.userId;
        const { firstName, lastName, age, number, gender } = this.state.userUpdate;
        if (firstName.length === 0) {
            alert('First Name Field is Empty');
        } else if (lastName.length === 0) {
            alert('Last Name Field is Empty');
        } else if (age.length === 0) {
            alert('Age Field is Empty');
        } else if (number.length === 0) {
            alert('Number Field is Empty');
        } else if (gender.length === 0) {
            alert('Sex Field is Empty');
        } else {
            let formData = new FormData();
            let userUpdate = this.state.userUpdate;
            formData.append('firstName', userUpdate.firstName);
            formData.append('lastName', userUpdate.lastName);
            formData.append('image', this.state.image);
            formData.append('age', userUpdate.age);
            formData.append('number', userUpdate.number);
            formData.append('gender', userUpdate.gender);
            formData.append('userId', userId);

            this.props.updateUser(formData);
            this.setState({
                image: ''
            });
        }
    };
    render() {
        const loading = this.props.loading

        return (
            <div>
                <form encType="multipart/form-data" onSubmit={this.onSubmitReview}>
                    <div className="submitUpdateDiv">
                        <Row className="rowPadding">
                            <Col sm={{ size: 11 }}>
                                <input
                                    type="name"
                                    name="firstName"
                                    id="FirstName"
                                    placeholder="First Name"
                                    value={this.state.userUpdate.firstName}
                                    onChange={this.handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row className="rowPadding">
                            <Col sm={{ size: 11 }}>
                                <input
                                    type="name"
                                    name="lastName"
                                    id="LastName"
                                    placeholder="Last Name"
                                    value={this.state.userUpdate.lastName}
                                    onChange={this.handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row className="rowPadding">
                            <Col sm={{ size: 11 }}>
                                <input
                                    type='number'
                                    name="age"
                                    id="Age"
                                    placeholder="Age"
                                    value={this.state.userUpdate.age}
                                    onChange={this.handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row className="rowPadding">
                            <Col sm={{ size: 11 }}>
                                <input
                                    type="number"
                                    name="number"
                                    id="Number"
                                    placeholder="Number"
                                    value={this.state.userUpdate.number}
                                    onChange={this.handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row className="rowPadding">
                            <Col sm={{ size: 11 }}>
                                <Row style={{ padding: '20px' }}>
                                    <div className="displayColumn">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Male"
                                            onClick={this.handleInputChange}
                                        />
                                        <h4>Male</h4>
                                    </div>
                                    <div className="displayColumn">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Female"
                                            onClick={this.handleInputChange}
                                        />
                                        <h4>Female</h4>
                                    </div>
                                    <div className="displayColumn">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Other"
                                            onClick={this.handleInputChange}
                                        />
                                        <h4>Other</h4>
                                    </div>

                                </Row>
                            </Col>
                        </Row>
                        <Row className="rowPicPadding">
                            <Col sm={{ size: 11 }}>
                                <div className="displayColumnUpload">
                                    <input
                                        className="listInputUpload"
                                        type="file"
                                        id="file"
                                        onChange={event => this.onChangeImage(event)}
                                    />
                                    <label for="file">
                                        <h4>
                                            <IoMdAddCircleOutline className="profileUpdateIcon"/> {Constants.CLICK_TO_UPLOAD}
                                        </h4>
                                    </label>
                                </div>
                            </Col>
                        </Row>
                        <Row className="rowPadding">
                            <Col sm={{ size: 11 }}>
                                <img style={{ width: '200px', height: 'auto' }} src={this.state.file} alt="" />
                            </Col>
                        </Row>
                        {loading && (
                            <Loader
                                className="gridLoading"
                                type="Oval"
                                color="#6E6E6E"
                                height={60}
                                width={80}
                                timeout={10000}
                            />
                        )}
                        {!loading && (
                            <Row className="rowPadding">
                                <Col className="submitAccontBtn" sm="12">
                                    <Button type="submit" className="submitAcountBtn" >
                                        Submit
                           </Button>
                                </Col>
                            </Row>
                        )}

                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateUser: userUpdate => dispatch(authActions.updateUser(userUpdate))
    };
};
const mapStateToProps = state => {
    return {
        user: state.auth.user,
        loading: state.auth.loading,
        update: state.auth.update
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);