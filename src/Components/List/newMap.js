import React, { Component } from 'react';
import Map from './pickLocation';

class NewCompo extends Component {
  render() {
    return (
      <Map
        pointerCallBack={this.props.pointerCallBack}
        google={this.props.google}
        height="300px"
        zoom={14}
      />
    );
  }
}

export default NewCompo;
