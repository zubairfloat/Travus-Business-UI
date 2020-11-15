import React, { Component } from 'react';
import {connect} from 'react-redux';
import './style.css';

class MessageVerify extends Component {
  render() {
      const verify = this.props.verify
    return (
      <div className="verifyMessage">
          {!verify && (
          <h2>your account has not been verified please check your inbox and complete the verification</h2>
          )}
          </div>
    );
  }
}
const mapStateToProps = (state) => {
    return{
        verify: state.auth.isverify
    }
}
export default connect(mapStateToProps , null)(MessageVerify);
