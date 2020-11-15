
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DiOpenshift } from 'react-icons/di';
import { TiTick } from 'react-icons/ti';
import { FaAngleRight } from 'react-icons/fa';
import { Dropdown, DropdownToggle, DropdownMenu, } from 'reactstrap';
import * as businessAc from '../../MyStore/actions/businessAc';
import { Range, getTrackBackground } from 'react-range';

const STEP = 100;
const MIN = 0;
const MAX = 7000;

class ToolTipGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tick: false,
      distanceTick: false,
      location: "",
      isOpen: false,
      values: [this.props.business.distanceValue]
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  handleDistance = (newValue) => {
    let { typeOfBusiness, city, pagination, distance, sortRating } = this.props.business
    this.setState({
      values: newValue
    })
    const value = newValue[0]
    const name = window.$name;
    const payload = { name, value, distance, typeOfBusiness, city, rating: sortRating, page: 1, pagination }
    this.props.getCurrentLocation(payload)
  }
  handleDistanceOn = () => {
    let tick = this.state.distanceTick
    this.setState({ distanceTick: !tick })
    const { currentLocation, distanceValue, typeOfBusiness, sortRating } = this.props.business
    const payload = { distance: !this.state.distanceTick, page: 1, name: currentLocation, value: distanceValue, pagination: 15, typeOfBusiness: typeOfBusiness, rating: sortRating }
    this.props.getAllBusiness(payload);
    const sort = !this.state.distanceTick
    this.props.sortNearDistance(sort)
  }
  handleRating = () => {
    let tick = this.state.tick
    this.setState({ tick: !tick })
    let { typeOfBusiness, city, pagination, searchValue, distance, currentLocation, distanceValue } = this.props.business
    if (searchValue && searchValue.value.length > 2) {
      let data = {
        city: searchValue.city,
        page: 1,
        pagination: 15,
        rating: !this.state.tick,
        typeOfBusiness: searchValue.typeOfBusiness,
        value: searchValue.value,
        distance,
        distanceValue,
        name: currentLocation,
      }
      this.props.exploreSearch(data);
      const sort = !this.state.tick
      this.props.sortByViews(sort)
    }
    else {
      let payload = {
        page: 1,
        typeOfBusiness,
        city,
        pagination,
        rating: !this.state.tick,
        distance,
        name: currentLocation,
        value: distanceValue
      }
      this.props.getAllBusiness(payload);
      const sort = !this.state.tick
      this.props.sortByViews(sort)
    }

  }
  render() {
    let distance = this.props.business.distance
    let sortRating = this.props.business.sortRating
    return (
      <div className="tooltipSorted">
        <div style={{ padding: "10px 0px 0px 0px" }} className="tooltipOpen">
          <h1>Price Range </h1> <DiOpenshift className="toolTipIcon" />
        </div>
        <div className="tooltipOpen">
          <Dropdown direction="right" isOpen={this.state.isOpen} toggle={this.toggle} >
            {distance ? <DropdownToggle onClick={this.handleDistanceOn} style={{ padding: "10px 0px 0px 0px" , backgroundColor:"#C5C7C9"}} className="exploreFilterDownBtn" color="white">
              <div style={{ display: "flex", justifyContent: "space-between" }}><h1>Distance</h1><TiTick className="toolTipIcon" /> </div>
            </DropdownToggle> :
              <DropdownToggle onClick={this.handleDistanceOn} style={{ padding: "10px 0px 0px 0px" }} className="exploreFilterDownBtn" color="white">
                <div style={{ display: "flex", justifyContent: "space-between" }}><h1>Distance</h1></div>
              </DropdownToggle>
            }
            <DropdownMenu className="exploreToolTipDropDownMenu" >
              <Range
                values={this.state.values}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={values => this.handleDistance(values)}
                renderTrack={({ props, children }) => (
                  <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                      height: "36px",
                      display: "flex",
                      width: "100%",
                      padding: "0px 20px",
                    }}
                  >
                    <div
                      ref={props.ref}
                      style={{
                        height: "5px",
                        width: "300px",
                        borderRadius: "4px",
                        background: getTrackBackground({
                          values: this.state.values,
                          colors: ["#666666", "#C5C7C9"],
                          min: MIN,
                          max: MAX
                        }),
                        alignSelf: "center"
                      }}
                    >
                      {children}
                    </div>
                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "25px",
                      width: "25px",
                      borderRadius: "4px",
                      backgroundColor: "#666666",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0px 1px 1px #AAA"
                    }}
                  >
                    <div
                      style={{
                        height: "16px",
                        width: "5px",
                        backgroundColor: isDragged ? "#666666" : "#ccc"
                      }}
                    />
                  </div>
                )}
              />
              <output style={{ marginTop: "0px", display: "flex", justifyContent: "space-between", padding: "0px 40px" }} id="output">
                <h1>{this.state.values[0]} Meters</h1>
              </output>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div onClick={this.handleRating} style={{ padding: "10px 0px 0px 0px" }} className="tooltipOpen">
          <h1>Rating </h1> {sortRating ? <TiTick className="toolTipIcon" /> : <></>}
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => {
  return {
    sortByViews: (sort) => dispatch(businessAc.getSortViews(sort)),
    sortNearDistance: (sort) => dispatch(businessAc.sortNearDistance(sort)),
    getAllBusiness: setAllBusiness => dispatch(businessAc.getAllBusiness(setAllBusiness)),
    getCurrentLocation: payload => dispatch(businessAc.getCurrentLocation(payload)),
    exploreSearch: data => dispatch(businessAc.exploreSearch(data)),
  };
};
const mapStateToProps = state => {
  return {
    business: state.business
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ToolTipGallery);