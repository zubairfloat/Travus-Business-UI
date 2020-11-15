import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import * as authActions from '../../MyStore/actions/authActions';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import './style.css';

class SignupAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        email: '',
        companyName: '',
        password: ''
      }
    };
  }
 
  handleInputChange = ({ currentTarget: input }) => {
    let user = { ...this.state.user };
    user[input.name] = input.value;
    this.setState({ user });
  };
  loginAdd = () => {
    const { username, email, companyName, password } = this.state.user;
    if (username.length === 0) {
      alert('First Name Field is Empty');
    } else if (email.length === 0) {
      alert('Last Name Field is Empty');
    } else if (companyName.length === 0) {
      alert('Email Field is Empty');
    } else if (password.length === 0) {
      alert('Number Field is Empty');
    } else {
      let user = { ...this.state.user };
      this.props.Signup(user);
    }
  };
  render() {
    let {  loading } = this.props.user;
    return (
      <div className="signupAuth">
        {/* <ToastContainer /> */}
        <div className="signupAuthDiv">
          <div className="rowPadding">
            <input
              type="name"
              name="username"
              id="Username"
              placeholder="User Name"
              value={this.state.user.username}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="rowPadding">
            <input
              type="name"
              name="email"
              id="Email"
              placeholder="Email"
              value={this.state.user.email}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="rowPadding">
            <input
              type="email"
              name="companyName"
              id="CompanyName"
              placeholder="Your Company Name"
              value={this.state.user.companyName}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="rowPadding">
            <input
              type="password"
              name="password"
              id="Password"
              placeholder="Enter Password"
              value={this.state.user.password}
              onChange={this.handleInputChange}
            />
          </div>
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
            <Button className="loginBtnForm" onClick={this.loginAdd}>
              Sign Up
            </Button>
          )}
          <div className="signupBtnDivLink">
          <h5 style={{color: '#4E7E7C', cursor: "pointer"}} onClick={this.props.addTrip}>Sign in</h5>
          {/* <Link style={{color: '#4E7E7C'}} to='/signin'> </Link> */}
          </div>
        </div>

      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    Signup: user => dispatch(authActions.Signup(user))
  };
};

const mapStateToProps = state => {
  return {
    user: state.auth,
    register: state.auth.register
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupAuth));
