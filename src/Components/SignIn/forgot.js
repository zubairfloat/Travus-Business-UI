import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { FiMail } from 'react-icons/fi';
import { connect } from 'react-redux';
import * as authActions from '../../MyStore/actions/authActions';
import { withRouter } from 'react-router-dom';
import Loader from "react-loader-spinner";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SignInuser: {
        email: ''
      }
    };
  }
  componentWillReceiveProps(props) {
    if (props.forgot && this.props.forgot !== props.forgot) {
      this.props.forGotSend();
    }
  }
  handleInputChange = ({ currentTarget: input }) => {
    let SignInuser = { ...this.state.SignInuser };
    SignInuser[input.name] = input.value;
    this.setState({ SignInuser });
  };
  emailSend = () => {
    const { email } = this.state.SignInuser;
    if (email.length === 0) {
      alert('Email Field is Empty');
    } else {
      this.props.forGet(email);
      // this.props.history.push('/signin');
      this.setState({
        SignInuser: {
          email: ''
        }
      });
    }
  };
  render() {
    const loading = this.props.loading
    return (
      <div className="forgotPasswordAuth">
        <div className="forgotPasswordAuthDiv">
          <div className="rowPadding">
            <input type="name" name="email" id="Email" placeholder="Email"
              value={this.state.SignInuser.email}
              onChange={this.handleInputChange} />
          </div>

          {loading && (
          <div >
            <Loader type="TailSpin" color="#007bff" height={50} width={50} timeout={0} />
          </div>
        )}
         {!loading && (
        <Button className="loginBtnForm" onClick={this.emailSend}>
        <FiMail  className="btnMailIcon" /> Send Confirmation
      </Button>
        )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    loading: state.auth.loading,
    forgot: state.auth.forgot
  }
}
const mapDispatchToprops = dispatch => {
  return {
    forGet: email => dispatch(authActions.forGet(email))
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToprops)(ForgotPassword));