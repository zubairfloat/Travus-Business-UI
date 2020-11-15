import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import Details from './details';
import * as tripSelectors from '../../Selectors/trip.selector';
import { Redirect } from 'react-router-dom';
import { GiKnifeFork, GiMusicalNotes } from 'react-icons/gi';
import { FaHome } from 'react-icons/fa';
import TourMap from './map';
import './style.css';

class Tour extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activitiesList: [],
    }
  }
  componentDidMount() {
    const activity = this.props.activity
    this.setState({
      activitiesList: activity
    })
  }
  render() {
    const { city, state, area } = this.props.location
    const tour = this.props.trip
    if (!this.props.trip?.date) return <Redirect to="/plan" />
    return (
      <div>
        <div className="tour">
          <div className="tourHadDiv">
            <div className="tourHeading">
              <h1>{city}</h1>
            </div>
          </div>
          <div className="tourHeadCity">
            <div className="tourCity">
              <h2>{state} , {area}</h2>
            </div>
          </div>
          <div className="tourHeadDate">
            <div className="tourDate">
              <h2>{tour.date.from} - {tour.date.to} , {tour.date.xDays} Days</h2>
            </div>
          </div>
          <Details />
          <div className="tourMapDiv" >
            <TourMap />
          </div>
          <div className="tourCardActivity">
            <Row>
              <Col xl="12">
                <Row className="activity">
                  {renderMeActivityCards(this.props.trip?.date?.xDays, this.state, tour.activities)}
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

const ActivityDiv = (props) => {
  const { activities } = props
  return (
    <Col xl="5" className="tourActivityCard">
      <Row>
          <div className="activityCardDayTour">
            <h1>{`Day ${props.nDay}`}</h1>
          </div>
        <div className="activityIconsTour">
        <FaHome  className="activityIconsTourSize"/>
                  <GiKnifeFork className="activityIconsTourSize" />
                  <GiMusicalNotes className="activityIconsTourSize" />
                  <GiMusicalNotes className="activityIconsTourSize" />
                  <GiKnifeFork className="activityIconsTourSize" />
        </div>
        <div className="activityIconsTourTime">
          <h3>9:00</h3>
          <h3>12:00</h3>
          <h3>14:50</h3>
          <h3>17:00</h3>
          <h3>21:00</h3>
        </div>
          <div
            className="activityTextDivTour"
          > {
              activities.map(activity => {
                return (
                  <div>
                    <h3>  {activity.businessName}</h3>
                  </div>
                )
              })
            }

          </div>
      </Row>
    </Col>
  );
};

const renderMeActivityCards = (xDays, stateActivities, activities) => {
  let cards = [];
  for (let index = 0; index < xDays; index++) {
    cards[index] = <ActivityDiv key={index} nDay={index + 1} state={stateActivities.activitiesList[`day_${index + 1}`]} activities={activities[index]} />
  };
  return cards;
}
const mapStateToProps = state => {
  return {
    location: state.trip.location,
    trip: tripSelectors.trip(state),
    activity: state.trip.activities,
    tour: state.trip,
    venues: state.venues
  }
}
const mapDispatchToProps = dispatch => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tour);