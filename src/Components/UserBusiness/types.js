import React, { Component } from 'react';
import { GiKnifeFork, GiMusicalNotes } from 'react-icons/gi';
import { FaBed, FaGlassMartiniAlt, FaHome, FaFoursquare } from 'react-icons/fa';
import { connect } from 'react-redux';
import * as businessAc from '../../MyStore/actions/businessAc';
import * as Constants from '../../Constants';

class BusinessTypes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setbusiness: {
        typeOfBusiness: ''
      }
    };
  }
  handleInputChange = ({ currentTarget: input }) => {
    let setbusiness = { ...this.state.setbusiness };
    setbusiness[input.name] = input.value;
    this.setState({ setbusiness });
    this.props.getBusiness(setbusiness);
  };
  render() {
    return (
      <div>
        <div className="gallaryFlex">
          <div className="exploreGllaryIcon">
            <input
              type="radio"
              name="typeOfBusiness"
              id="option1"
              value={Constants.FOOD}
              onChange={this.handleInputChange}
            />
            <h5>{Constants.FOOD}</h5>
            <GiKnifeFork className="iconsGallaryExplore" />
          </div>
          <div className="exploreGllaryIcon">
            <input
              type="radio"
              name="typeOfBusiness"
              id="option2"
              value={Constants.SLEEP}
              onChange={this.handleInputChange}
            />
            <h5>{Constants.SLEEP}</h5>
            <FaBed className="iconsGallaryExplore" />
          </div>
          <div className="exploreGllaryIcon">
            <input
              type="radio"
              name="typeOfBusiness"
              id="option3"
              value={Constants.DRINK}
              onChange={this.handleInputChange}
            />
            <h5>{Constants.DRINK}</h5>
            <FaGlassMartiniAlt className="iconsGallaryExplore" />
          </div>
          <div className="exploreGllaryIcon">
            <input
              type="radio"
              name="typeOfBusiness"
              id="option4"
              value={Constants.PARTY}
              onChange={this.handleInputChange}
            />
            <h5>{Constants.PARTY}</h5>
            <GiMusicalNotes className="iconsGallaryExplore" />
          </div>
          <div className="exploreGllaryIcon">
            <input
              type="radio"
              name="typeOfBusiness"
              id="option5"
              value={Constants.CULTURE}
              onChange={this.handleInputChange}
            />
            <h5>{Constants.CULTURE}</h5>
            <FaHome className="iconsGallaryExplore" />
          </div>
          <div className="exploreGllaryIcon">
            <input
              type="radio"
              name="typeOfBusiness"
              id="option6"
              value={Constants.FUN}
              onChange={this.handleInputChange}
            />
            <h5>{Constants.FUN}</h5>
            <FaFoursquare className="iconsGallaryExplore" />
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getBusiness: setbusiness => dispatch(businessAc.getBusiness(setbusiness))
  };
};

export default connect(null, mapDispatchToProps)(BusinessTypes);
