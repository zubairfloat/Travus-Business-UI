import React, { Component } from 'react';
import HeadList from './Head';
import ListContent from './Content';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './style.css';

class GetList extends Component {
  componentDidMount() {
    let { isAuthenticated } = this.props.auth;
    if (isAuthenticated === false) {
      this.props.history.push('/signin');
      
    }
  }

  render() {
    return (
      <div>
        <div className="getList">
          <HeadList />
          <ListContent />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
export default withRouter(connect(mapStateToProps)(GetList));
