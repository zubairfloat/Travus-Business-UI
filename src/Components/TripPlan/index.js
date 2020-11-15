import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { MdLocationOn, MdDateRange } from 'react-icons/md';
import DateSelect from './date';
// import TitlebarGridList from './grid';
import { connect } from 'react-redux';
import * as businessAc from '../../MyStore/actions/businessAc';
import Map from './pickLocation';
import * as tripActions from '../../MyStore/actions/trip.actions';
import CustomButton from '../CustomBtn';
import * as tripSelectors from '../../Selectors/trip.selector';
import { toast } from 'react-toastify';
import './style.css';

class SelectPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: undefined,
      setAllBusiness: {
        city: ''
      }
    };
  }

  componentDidMount() {
    // this.setState({date: this.props.trip.date})
  }

  handleDate = (from, to, xDays) => {
    const date = { from, to, xDays }
    this.props.setDate(date)
    this.setState({ date })
  }

  dateSelector = () => {
    return (
      <div className="venueSelect">
        <h3>
          Select Your Trip Date <MdDateRange />{' '}
        </h3>
        <DateSelect handleDate={this.handleDate} />
      </div>
    )
  }


  mapSelector = () => {
    return (
      <div className="venueSelect">
        <h1>
          Select your venue for GO ! <MdLocationOn />
        </h1>
        <Map
          pointerCallBack={this.addressComplete}
          google={this.props.google}
          height="300px"
          zoom={14}
        />
      </div>
    )
  }

  addressComplete = locate => {
    this.setState({
      businessUser: {
        ...this.state.businessUser,
        city: locate.city,
        state: locate.state,
        area: locate.area
      }
    });
    this.props.venueBusiness(locate.area);
  };

  handleTrip = () => {
    if (!this.props.auth?.isAuthenticated) return toast.error("Login required");
    this.props.setLocation(this.state.businessUser);
    this.props.history.push("/trip")
  }
  render() {
    // this.state.date && alert(this.state.date.from)
    return (
      <div>
        <div className="selectPlan">
          <div className="searchHeading">
            <div className="aboutheading">
              <h1>Plan Your Trip</h1>
            </div>
          </div>
          <Container>
            {!this.state.date && this.dateSelector()}
            {this.state.date && this.mapSelector()}
            <div className="tripPlanLocationBtnDiv">{
              this.state.date &&
              <CustomButton name={'Submit'} onClick={this.handleTrip} />
            }</div>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    trip: tripSelectors.trip(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    venueBusiness: setAllBusiness => dispatch(businessAc.venueBusiness(setAllBusiness)),
    setDate: date => dispatch(tripActions.updateTripDate(date)),
    setLocation: location => dispatch(tripActions.updateTripLocation(location)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectPlan);
