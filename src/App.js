import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as Constants from './Constants/navbar';
import MyNavbar from './Components/Navbar';
import back from './Images/back2.png';
import './App.css';
import { connect } from 'react-redux';
import Footer from './Components/Footer';
import { ToastContainer } from 'react-toastify';

const App = props => {
  navigator.geolocation.watchPosition(function (position) {
    window.$name = [position.coords.longitude, position.coords.latitude]
  });
  const { transparent } = props
  return (
    <Router>
      <ToastContainer autoClose={2000} />
      <div style={{ background: !transparent ? '' : `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ) , url(${back})` }}>
        <MyNavbar />
        <Switch>
          {Constants.appRoutes.map((route, i) => {
            return <Route key={i} exact path={route.path} component={route.component} />;
          })}
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    transparent: state.auth.transparent
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


// "scripts": {
//   "dev": "react-scripts start",
//   "start": "serve -s build",
//   "build": "react-scripts build",
//   "test": "react-scripts test --env=jsdom",
//   "eject": "react-scripts eject",
//   "heroku-postbuild": "npm run build"
// },