import React, { Component } from 'react';
import { Col, Row, Button, Container, Modal, ModalHeader } from 'reactstrap';
import * as Constants from '../../Constants';
import { connect } from 'react-redux';
import * as businessAc from '../../MyStore/actions/businessAc';
import * as authAction from '../../MyStore/actions/authActions';
import AsyncSelect from 'react-select/async';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Submit from './Submit';
import MessageVerify from '../SignIn/message';
import SignInAuth from '../SignIn/form';
import './style.css';

const Base_URL = `${process.env.REACT_APP_SERVER}/business`;

class ClaimPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      select: {},
      isOpen: false
    };
  }
  componentDidMount() {
    this.scrollToTopStart(0);
  }
  scrollToTopStart(value) {
    window.scrollTo({
      top: value,
      behavior: 'smooth'
    });
  }
  handleSubmit = () => {
    this.toggle()
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  logout = () => {
    let user = {};
    this.props.logout(user);
  };
  searchBusiness(inputValue, callback) {
    axios
      .get(`${Base_URL}/claim`, { params: { search: inputValue } })
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
    this.setState({
      select: selectedOption.value
    });
  };
  search = e => {
    e.preventDefault();
    const businessName = this.state.select;
    this.props.searchMyClaimBusiness(businessName);
    this.scrollToTopStart(500);
  };
  createBusiness = e => {
    let { isAuthenticated } = this.props.user;
    if (isAuthenticated === true) {
      this.props.history.push('/listed');
    } else {
      toast.warn('First Login Your Account');
    }
  };
  render() {
    const customStyles = {
      control: (base, state) => ({
        ...base,
        background: 'white',
        width: '100%',
        height: '50px',
        borderRadius: 15,
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
      placeholder: base => ({
        ...base,
        color: '#6E6E6E'
      }),
      dropdownIndicator: base => ({
        ...base,
        display: 'none'
      }),
      loadingIndicator: (base, state) => ({
        ...base,
        color: '#6E6E6E',
        fontSize: '7px'
      })
    };
    let { isAuthenticated } = this.props.user;
    let { searchClaim } = this.props.searchBusiness;
    return (
      <div className="accountDiv">
        <Container fluid={true} className="accountPage">
          <div className="searchHeading">
            <div className="insideSearch">
              <h1>{Constants.CLAIM_YOUR_BUSINESS}</h1>
            </div>
          </div>
          <div className="searchItems">
            <Row>
              <Col md="3"></Col>
              <Col xl="4">
                <div style={{ display: 'flex' }}>
                  <AsyncSelect
                    className="inputSearchAccount"
                    styles={customStyles}
                    loadOptions={this.fetchData}
                    placeholder=" Search For Your Business"
                    onChange={e => {
                      this.onSearchChange(e);
                    }}
                    defaultOptions={false}
                  />
                </div>
              </Col>
              <Col xl="3">
                <Row className="btnClaimRow">
                  <Button className="accountSearchBtn" onClick={this.search}>
                    {Constants.CLAIM_YOUR_BUSINESS}
                  </Button>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xl="7"></Col>
              <Col xl="3">
                <div style={{ textAlign: 'center' }}>
                  {isAuthenticated ? <h4 onClick={this.logout} className="claimSignText"> {Constants.SIGN_OUT} </h4> : <h4 onClick={this.toggle} className="claimSignText"> {Constants.SIGN_IN} </h4>}
                  <span
                    style={{
                      color: '#6c757d',
                      display: 'inline-block',
                      margin: '0 5px',
                      padding: '0px 10px 0px 0px'
                    }}
                  >
                    {Constants.NOT_HERE}
                  </span>
                  <span
                    style={{
                      color: '#6c757d',
                      display: 'inline-block',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                    onClick={this.createBusiness}
                  >
                    {Constants.GET_LISTED}{' '}
                  </span>
                </div>
              </Col>
            </Row>
          </div>
          {searchClaim ? (
            <Submit />
          ) : (
              <></>
            )}
        </Container>
        <Modal className="signInModel" isOpen={this.state.isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}></ModalHeader>
          <div className="SingUp">
            <MessageVerify />
            <SignInAuth onUpdateUser={this.handleSubmit} />
          </div>
        </Modal>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    searchMyClaimBusiness: setAllBusiness => dispatch(businessAc.searchMyClaimBusiness(setAllBusiness)),
    logout: user => dispatch(authAction.logout(user))
  };
};

const mapStateToProps = state => {
  return {
    user: state.auth,
    searchBusiness: state.business
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClaimPage));