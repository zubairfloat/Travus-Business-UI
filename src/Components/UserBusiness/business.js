import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import './style.css';

class BusinessShow extends Component {
  render() {
    let { list } = this.props;
    return (
      <div className="businessShow">
        <Table size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Business Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Role</th>
              <th>Rank</th>
              <th>Location</th>
            </tr>
          </thead>
          {list &&
            Object.keys(list).map(key => {
              let tile = list[key];
              return (
                <tbody>
                  <tr>
                    <th scope="row"></th>
                    <td>{tile.businessName}</td>
                    <td>{tile.userEmail}</td>
                    <td>{tile.typeOfBusiness}</td>
                    <td>{tile.role}</td>
                    <td>{tile.option}</td>
                    <td>{tile.location}</td>
                  </tr>
                </tbody>
              );
            })}
        </Table>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    list: state.business.businessList
  };
};

export default connect(mapStateToProps)(BusinessShow);
