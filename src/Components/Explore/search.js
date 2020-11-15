import React, { Component } from 'react';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/async';
import { withRouter } from 'react-router-dom';
import * as businessAc from '../../MyStore/actions/businessAc';
import axios from 'axios';
import './style.css';

const Base_URL = `${process.env.REACT_APP_SERVER}/business`;

class SearchExplore extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedOption: {},
      pagination: 15,
      page: 1,
      value: ""
    };
  }
  searchBusiness(inputValue, callback) {
    let rating = this.props.rating
    const { distance, currentLocation, distanceValue } = this.props.business
    let { typeOfBusiness, country, city } = this.props;
    this.state = {
      selectedOption: {},
      data: {
        value: inputValue,
        typeOfBusiness,
        country,
        pagination: 15,
        page: 1,
        city,
        rating,
        distance,
        distanceValue,
        name: currentLocation
      }
    };
    const mydata = this.state.data
    axios
      .get(`${Base_URL}/exploreSearch`, { params: { search: mydata } })
      .then(data => {
        if (data.status === 200) {
          const selectedOption = data.data.data;
          this.setState({ selectedOption });
          callback(null, selectedOption);
        }
      })
      .catch(error => {
        console.log('Error while prefetching concepts for navbar', error);
      });
  }

  fetchData = (inputValue, callback) => {
    let rating = this.props.rating
    const { distance, currentLocation, distanceValue } = this.props.business
    this.state = {
      selectedOption: {},
      data: {
        value: inputValue,
        pagination: 15,
        page: 1,
        rating,
        distance,
        distanceValue,
        name: currentLocation
      }
    };
    let data = this.state.data;
    this.props.exploreSearch(data);
    return new Promise(resolve => {
      this.searchBusiness(inputValue, function (err, results) {
        resolve(results);
      });
    });
  };
  onSearchChange = selectedOption => {
    const data = selectedOption.value;
    this.props.exploreClickSearch(data);
  };
  render() {
    let searchV
    const searchValue = this.props.searchValue.value
    if (searchValue && searchValue.length > 2) {
      searchV = searchValue
    }
    const customStyles = {
      control: (base, state) => ({
        ...base,
        background: 'white',
        width: '100%',
        height: '50px',
        borderRadius: 10,
        borderColor: state.isFocused ? '#C0B6B6' : '#C0B6B6',
        border: 'solid 2px #bdb2b2',
        boxShadow: state.isFocused ? null : null,
        '&:hover': {
          borderColor: state.isFocused ? '#bdb2b2' : '#bdb2b2'
        }
      }),
      indicatorSeparator: base => ({
        ...base,
        display: 'none'
      }),
      dropdownIndicator: base => ({
        ...base,
        display: 'none'
      }),
      menu: base => ({
        ...base,
        fontSize: '16px',
        fontWeight: '700',
        color: "#6E6E6E",
        fontFamily: "sans-serif"
      }),
      loadingIndicator: (base, state) => ({
        ...base,
        color: '#6E6E6E',
        fontSize: '8px'
      }),
      placeholder: base => ({
        ...base,
        color: '#6E6E6E'
      })
    };
    return (
      <div>
        <AsyncSelect
          styles={customStyles}
          loadOptions={this.fetchData}
          placeholder={searchV ? searchV : "What"}
          // onChange={e => {
          //   this.onSearchChange(e);
          // }}
          onChange={value => {
            let isArray = value == null ? false : value.constructor == Array
            this.setState({ value: isArray ? null : value })
            const data = value;
            this.props.exploreClickSearch(data);
          }}
          defaultOptions={false}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    typeOfBusiness: state.business.typeOfBusiness,
    country: state.business.country,
    city: state.business.city,
    rating: state.business.sortRating,
    searchValue: state.business.searchValue,
    business: state.business,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    exploreSearch: data => dispatch(businessAc.exploreSearch(data)),
    exploreClickSearch: data => dispatch(businessAc.exploreClickSearch(data))
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchExplore));





