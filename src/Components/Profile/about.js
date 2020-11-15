import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { FaCircle, FaHeart, FaRegHeart } from 'react-icons/fa';
import MapApi from './mapApi';
import * as Constants from '../../Constants';
import * as venueActions from '../../MyStore/actions/venue.actions';
import StarRatingComponent from 'react-star-rating-component';
import Loader from 'react-loader-spinner';
import './style.css';

class Profileabout extends Component {
  savedPlace = (select) => {
    return <FaRegHeart style={{ cursor: 'pointer' }} className="profileAboutHeart" onClick={() => this.props.saveVenue(select)} />
  }
  unSavedPlace = (unSelect) => {
    return <FaHeart style={{ cursor: 'pointer' }} className="profileAboutHeart"  onClick={() => this.props.removeVenue(unSelect)} />
  }
  render() {
    let select
    let unSelect
    let selectTrending = this.props.selectTrending
    if (selectTrending !== null) {
      let trending = this.props.trending
      let trendingUnique = trending[selectTrending]
      select = trendingUnique._id
      unSelect = trendingUnique._id
    }
    else {
      select = this.props.selected
      unSelect = this.props.selected
    }
    let trending = this.props.trending
    let trendingUnique = trending[selectTrending]
    let business = {};
    let saved = false;
    this.props.venues && this.props.venues.filter(venue => {
      if (select === venue) {
        saved = true;
      }
    })
    if (selectTrending !== null) {
      let select = trendingUnique.venueId
    }
    else {
      if (select !== -1) {
        business = this.props.business[select];
      }
      else {
      }
    }
    // } else {
    //   return <Redirect to="/explore" />
    // }
    let rating = this.props.rating
    return (
      <div className="profileabout">
        {this.props.status?.isloading && (
          <Loader
            className="gridLoadingProfile"
            type="Oval"
            color="#6E6E6E"
            height={60}
            width={80}
            timeout={10000}
          />
        )}
        <Row>
          <Col xl={{ offset: 1, size: 5 }}>
            <Col md={{ offset: 1, size: 10 }}>
              {trendingUnique ? <h1>About The {trendingUnique.businessName}</h1> : <h1>About The {business.businessName}</h1>}
              <div className="profileaboutH2">
                {/* <h3>{Constants.EXCEPTEUR_CUPIDATAT_PROIDENT}</h3> */}
                <h3>{business.option}</h3>
              </div>
              {/* <h3>{Constants.VIEW_SIMILAR_LISTINGS}</h3> */}
              <Row className="profileAbout2Input">
                {/* <input placeholder="Address" value={business.fullAddress} /> */}
                <p>
                  <span>
                    {business.fullAddress ? business.fullAddress : "Address   N/A"}
                  </span>
                </p>
              </Row>
              <Row className="profileAbout2Input">
                {trendingUnique ? <p> {trendingUnique.phone ? trendingUnique.phone : "Phone Number   N/A"} </p> : <p> {business.phone ? business.phone : "Phone Number   N/A"} </p>}
              </Row>
              <Row className="profileAbout2Input">
                {trendingUnique ? <p> {trendingUnique.workEmail ? trendingUnique.workEmail : "Email   N/A"} </p> : <p> {business.workEmail ? business.workEmail : "Email   N/A"} </p>}
              </Row>
              <Row className="profileAbout2Input">
                {trendingUnique ? <p> {trendingUnique.website ? trendingUnique.website : "Website   N/A"} </p> : <p> {business.website ? business.website : "Website   N/A"} </p>}
              </Row>
              <Row className="profileAbout2Input">
                {trendingUnique ? <p> {trendingUnique.hours ? trendingUnique.hours : "Hours   N/A"} </p> : <p> {business.hours ? business.hours : "Hours   N/A"} </p>}
              </Row>
            </Col>
          </Col>
          <Col className="aboutDivImg" xl={{ size: 5 }}>
            <Col md={{ offset: 1, size: 10 }}>
              {/* <h2>
              We are {business.option} | {business.userName} | {business.typeOfBusiness} |{' '}
              {business.city} | {business.country}
            </h2> */}
              <div>
                <Row>
                  <h4>
                    {Constants.RATTING}
                  </h4>
                  <StarRatingComponent
                    className="reviewStarnonEdit"
                    name="rate2"
                    editing={false}
                    starCount={5}
                    starColor="#6E6E6E"
                    emptyStarColor="#DEDEDE"
                    value={rating}
                  />
                  {rating? <h3>{parseFloat(rating).toFixed(2)}</h3> : <></> }
                  
                </Row>
                <Row>
                  <h4>{Constants.PRICE_RANGE}</h4>
                </Row>
                <Row>
                  <h4>
                    <FaCircle className="profileAboutCircle" /> {Constants.OPEN_NOW}
                  </h4>
                </Row>
                <Row>
                  <h4>
                    {
                      saved ? this.unSavedPlace(unSelect)
                        :
                        this.savedPlace(select)
                    }
                    {
                      saved ? " Saved" : " Save place"
                    }
                  </h4>
                </Row>
              </div>
              <div className="profileAboutMapDiv" >
                <MapApi />
              </div>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    items: state.auth.user,
    business: state.business.businessList.venue,
    selected: state.business.slectedVanue,
    venues: state.venues?.venues,
    status: state.venues?.status,
    rating: state.review.avgRating,
    selectTrending: state.business.selectTrending,
    trending: state.business.trending,
    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveVenue: id => dispatch(venueActions.saveVenue(id)),
    removeVenue: id => dispatch(venueActions.removeVenue(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profileabout);
