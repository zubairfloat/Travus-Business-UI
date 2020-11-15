import React, { useState, useEffect } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink, NavItem } from 'reactstrap';
import logo from '../../Images/logo.png';
import { Link, withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import './style.css';
import back from '../../Images/back.png';
import { connect } from 'react-redux';
import * as authAction from '../../MyStore/actions/authActions'
import { Modal, ModalHeader } from 'reactstrap';
import SignInAuth from '../SignIn/form';

function useModalState(defaultOpen = false) {
  const [modelisOpen, setOpen] = useState(defaultOpen);
  return { modelisOpen, modeltoggle: () => setOpen(modelisOpen => !modelisOpen) };
}
const MyNavbar = props => {
  const [isOpen, toggleNavbar] = useState(true);
  const { modelisOpen, modeltoggle } = useModalState();
  const handleSubmit = () => {
    modeltoggle()
  }
  const { transparent } = props
  const toggle = () => toggleNavbar(!isOpen);
  const closetoggle = () => toggleNavbar(true);
  var sectionStyle = {
    width: '100%',
    height: '110px',
    background: transparent ? '' : `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ) , url(${back})`
  };
  const handleRouteChange = () => {
    if (props.history.location.pathname === '/') {
      props.setTransparent(true)
    }
    else {
      props.setTransparent(false)
    }
  }
  const logout = () => {
    let user = {};
    props.logout(user);
  };
  useEffect(() => {
    handleRouteChange()
    props.history.listen((location, action) => {
      handleRouteChange()
    })
  })
  const isAuthenticated = props.isAuthenticated
  return (
    <div className={transparent ? 'myNav' : 'myNavbar'} style={transparent ? {} : sectionStyle}>
      <Navbar color="transparent" className="navabrClass" light expand="md">
        <NavbarBrand onClick={closetoggle} tag={Link} to="/">
          <img className="navIcon" src={logo} alt=""></img>
          <h5 className="navbarTravus">TRAVUS</h5>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={!isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem onClick={closetoggle}>
              <NavLink style={{ color: 'white' }} tag={Link} to='/explore'>Explore</NavLink>
            </NavItem>
            {isAuthenticated ? (
              <NavItem onClick={closetoggle}>
                <NavLink style={{ color: 'white', cursor: 'pointer' }} onClick={logout} >Log out</NavLink>
              </NavItem>
            ) : (<NavItem onClick={closetoggle}>
              <NavLink style={{ color: 'white', cursor: 'pointer' }} onClick={modeltoggle} >Account</NavLink>
            </NavItem>)}
            <NavItem onClick={closetoggle}>
              <NavLink style={{ color: 'white' }} tag={Link} to='/plan'>Plan</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        <Modal className="signInModel" isOpen={modelisOpen} toggle={modeltoggle} >
          <ModalHeader toggle={modeltoggle}></ModalHeader>
          <div className="SingUp">
            <SignInAuth onUpdateUser={handleSubmit} />
          </div>
        </Modal>
      </Navbar>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    transparent: state.auth.transparent,
    isAuthenticated: state.auth.isAuthenticated
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setTransparent: (payload) => dispatch(authAction.setTransparent(payload)),
    logout: user => dispatch(authAction.logout(user))
  }
}
export default withRouter(compose(
  connect(mapStateToProps, mapDispatchToProps),
)(MyNavbar));
