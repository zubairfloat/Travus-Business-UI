import React, { Component } from 'react';
import { Button, Modal } from 'reactstrap';
import { connect } from 'react-redux';
import { MdSupervisorAccount } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import ForgotPassword from './forgot';
import * as authActions from '../../MyStore/actions/authActions';
import Loader from 'react-loader-spinner';
import SignupAuth from '../SignUp/form';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css';

class SignInAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SignInuser: {
        email: '',
        password: ''
      },
      isEmptyState: true
    };
    
  }
  componentWillReceiveProps(props) {
    if (props.register && this.props.register !== props.register) {
      this.changestate()
    }
    else if (props.isAuthenticated && this.props.isAuthenticated !== props.isAuthenticated) {
      this.props.onUpdateUser();
    }
  }
  triggerAddTripState = () => {
    this.setState({
      ...this.state,
      isEmptyState: false,
      isAddTripState: true
    })
  }
  changestate = () => {
    this.setState({
      ...this.state,
      isEmptyState: true,
      isAddTripState: false
    })
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  toggleVerify = () => {
    this.setState({
      isOpenVerify: !this.state.isOpenVerify
    });
  };
  handleCloseForGot = () => {
    this.toggle()
  }
  handleInputChange = ({ currentTarget: input }) => {
    let SignInuser = { ...this.state.SignInuser };
    SignInuser[input.name] = input.value;
    this.setState({ SignInuser });
  };
  SignInAdd = () => {
    const { email, password } = this.state.SignInuser;
    if (email.length === 0) {
      alert('Email Field is Empty');
    } else if (password.length === 0) {
      alert('Password Field is Empty');
    } else {
      let SignInuser = { ...this.state.SignInuser };
      this.props.SignIn(SignInuser);
      this.setState({
        SignInuser: {
          email: this.state.SignInuser.email,
          password: ''
        }
      });
    }
  };
  render() {
    let { loading } = this.props.user;
    return (
      <>
       {this.state.isEmptyState &&
      <div className="signInAuth">
            <div className="signInAuthDiv">
              <div className="rowPadding">
                <input
                  type="name"
                  name="email"
                  id="Email"
                  placeholder="Email"
                  value={this.state.SignInuser.email}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="rowPadding">
                <input
                  type="password"
                  name="password"
                  id="Password"
                  placeholder="Enter Password"
                  value={this.state.SignInuser.password}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="rowPaddingLink">
                <Link onClick={this.toggle}>
                  <p>Forgot Password?</p>
                </Link>
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
                <div className="authenticateLogin">
                  <Button className="loginBtnForm" onClick={this.SignInAdd}>
                    Sign In
                    </Button>
                  <div className="signCreateAccount">
                    {/* <Link
                      style={{
                        color: '#6c757d',
                        display: 'block',
                        fontWeight: 700,
                        marginBottom: '15px'
                      }}
                      to="/signUp"
                    > */}
                      <h4 style={{cursor: "pointer"}} onClick={this.triggerAddTripState}>
                        Create your account  <MdSupervisorAccount className="createAccountIcon" />
                      </h4>
                    {/* </Link> */}
                  </div>
                </div>
              )}
            </div>
        <Modal
          className="forGotModel"
          isOpen={this.state.isOpen}
          toggle={this.toggle}
          centered={true}
          style={{ width: '600px' }}
        >
          <ForgotPassword forGotSend={this.handleCloseForGot} />
        </Modal>
      </div>
  }
   {this.state.isAddTripState && <SignupAuth addTrip={this.changestate} />}
      </>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    SignIn: SignInuser => dispatch(authActions.SignIn(SignInuser))
  };
};

const mapStateToProps = state => {
  return {
    user: state.auth,
    isAuthenticated: state.auth.isAuthenticated,
    register: state.auth.register
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignInAuth));
