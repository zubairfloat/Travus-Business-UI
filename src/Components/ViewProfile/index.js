import React, { Component } from 'react';
import { connect } from 'react-redux';
import ViewDetail from './detail';
import BusinessTypes from '../UserBusiness/types'
import BusinessShow from '../UserBusiness/business';
import './style.css';

class ViewProfile extends Component {
  // componentDidMount() {
  //   let { isAuthenticated } = this.props.user;
  //   if (isAuthenticated === false) {
  //     this.props.history.push('/signin');
  //   }
  // }
  render() {
    let { isAuthenticated } = this.props.user;
    return (
      <div>
        <div className="viewProfile">
          {isAuthenticated ?
            <div>
              <ViewDetail />
              <BusinessTypes />
              <BusinessShow />
            </div>
            : <h2> First Login Your Account </h2>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};
export default connect(mapStateToProps)(ViewProfile);
