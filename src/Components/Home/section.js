import React, { Component } from 'react';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/async';
import * as businessAc from '../../MyStore/actions/businessAc';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './style.css';

const Base_URL = `${process.env.REACT_APP_SERVER}/business`;
class Home extends Component {
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
    const cityName = selectedOption.label;
    let payload = { cityName, typeOfBusiness: "Food", page: 1, pagination: 15 }
    this.props.homeSearch(payload);
    this.props.history.push('/explore');
  };
  render() {
    const customStyles = {
      control: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? 'rgba(245, 241, 241, 0.2)' : 'rgba(245, 241, 241, 0.2)',
        width: '100%',
        borderRadius: '20px',
        height: '60px',
        fontFamily: 'sans-serif',
        border: state.isFocused ? 'solid 1px white' : 'solid 1px white',
        padding: '5px 0px 5px 0px',
        color: 'white',
        '&:hover': {
          borderColor: state.isFocused ? 'white' : 'white'
        }
      }),
      placeholder: base => ({
        ...base,
        color: 'white',
        verticalAlign: 'middle',
        fontFamily:  'FontAwesome', 
        fontSize: '20px'
      }),
      menu: (base, state) => ({
        ...base,
        borderRadius: 0,
        marginTop: 0,
        width: '400px',
        backgroundColor: state.isFocused ? 'rgba(245, 241, 241, 0.2)' : 'rgba(245, 241, 241, 0.2)',
        "@media only screen and (max-width: 600px)": {
          ...customStyles["@media only screen and (max-width: 600px)"],
          width: "240px",
        },
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
        color: 'white'
      }),
      loadingMessage: (base, state) => ({
        ...base,
        color: 'white'
      }),
      option: (base, state) => ({
        ...base,
        color: 'white',
        backgroundColor: state.isFocused ? 'rgba(32,51,53, 0.6)' : 'wihte',
        padding: '10px 0px',
        borderBottom: 'solid 1px white',
        '&:hover': {
          backgroundColor: state.isFocused ? 'rgba(32,51,53, 0.6)' : 'rgba(32,51,53, 0.6)'
        }
      }),
      noOptionsMessage: (base, state) => ({
        ...base,
        color: 'white'
      })
    };
    return (
      <div className="home" >
        <div className="search">
          <div className="homeSearchDiv">
            <AsyncSelect
              noOptionsMessage={() => "No matching results found."}
              styles={customStyles}
              className="searchInput"
              loadOptions={this.fetchData}
              placeholder=" &#xF002; &nbsp; Search Destination " 
              onChange={e => {
                this.onSearchChange(e);
              }}
              defaultOptions={false}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    business: state.business
  };
};

const mapDispatchToProps = dispatch => {
  return {
    homeSearch: payload => dispatch(businessAc.homeSearch(payload))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));