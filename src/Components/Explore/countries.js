import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import { connect } from 'react-redux';
import axios from 'axios';
import * as businessAc from '../../MyStore/actions/businessAc';

const Base_URL = `${process.env.REACT_APP_SERVER}/business`;
class CountrySelector extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedOption: {}
    };
  }
  searchBusiness(inputValue, callback) {
    axios
      .get(`${Base_URL}/name`, { params: { search: inputValue } })
      .then(data => {
        if (data.status === 200) {
          const selectedOption = data.data.data;
          selectedOption[3] = { label: "All Cities"}
          this.setState({ selectedOption });
          callback(null, selectedOption);
        }
      })
      .catch(error => {
        console.log('Error while prefetching concepts for navbar', error);
      });
  }
  fetchData = (inputValue, callback) => {
    return new Promise(resolve => {
      this.searchBusiness(inputValue, function (err, results) {
        resolve(results);
      });
    });
  };
  onSearchChange = selectedOption => {
    let rating = this.props.rating
    let typeOfBusiness = this.props.typeOfBusiness
    const cityName = selectedOption.label;
    let payload = { cityName, typeOfBusiness , page: 1, pagination: 15 , rating }
    this.props.homeSearch(payload);
  };
  render() {
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
      placeholder: base => ({
        ...base,
        verticalAlign: 'middle',
      }),
      menu: (base, state) => ({
        ...base,
        borderRadius: 0,
        marginTop: 0,
        backgroundColor: state.isFocused ? 'white' : 'white',
        color: "#6E6E6E",
      }),
      indicatorSeparator: base => ({
        ...base,
        display: 'none'
      }),
      dropdownIndicator: base => ({
        ...base,
        display: 'none'
      }),
      loadingIndicator: (base, state) => ({
        ...base,
        color: 'white',
        fontSize: '8px'
      }),
      menuList: (base, state) => ({
        ...base,
        padding: 3,
        fontWeight: 700,
      }),
      loadingMessage: (base, state) => ({
        ...base,
        color:"white"
      }),
      option: (base, state) => ({
        ...base,
        color: "#6E6E6E",
        backgroundColor: state.isFocused ? 'white' : 'white',
        '&:hover': {
          backgroundColor: state.isFocused ? '#D0EBFE' : '#D0EBFE'
        }
      }),
      noOptionsMessage: (base, state) => ({
        ...base,
      })
    };
    let city = this.props.city
    return (
      <AsyncSelect
        noOptionsMessage={() => null}
        styles={customStyles}
        loadOptions={this.fetchData}
        placeholder={city? this.props.city : "Where"}
        onChange={e => {
          this.onSearchChange(e);
        }}
        defaultOptions={false}
      />
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    homeSearch: payload => dispatch(businessAc.homeSearch(payload))
  };
};
const mapStateToProps = state => {
  return {
    city: state.business.city,
    rating : state.business.sortRating,
    typeOfBusiness: state.business.typeOfBusiness,
    business: state.business
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CountrySelector);