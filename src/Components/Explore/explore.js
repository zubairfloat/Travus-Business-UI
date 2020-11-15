import React, { Component } from 'react';
import Slider from 'react-slick';
import CardExplore from './card';
import { connect } from 'react-redux';
import * as businessAc from '../../MyStore/actions/businessAc';
import * as Constants from '../../Constants';
import GallaryExplore from './gallary';
import { withRouter } from 'react-router-dom';
import './style.css';

class Explore extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
     tooltip: true,
    };
  }
  componentDidMount() {
    this.props.trendingData();
  }
  businessUnique = id => {
    this.props.selectTrending(id);
    this.props.history.push('/profile');
  };
  render() {
    const settings = {
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      arrows: true,
      autoplay: false,
      speed: 2000,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 760,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    };
    const { trending = [] } = this.props.trendingbusiness
    return (
      <div className="explore">
      <div className="reviewSlide">
        <div className="headExplore">
          <div className="searchHeading">
            <div className="aboutheading">
              <h1>{Constants.EXPLORE}</h1>
            </div>
          </div>
          <div className="">
            <h2>{Constants.TRENDING_DESTINATION}</h2>
          </div>
        </div>
        <Slider {...settings}>
          {Object.keys(trending).map(key => {
            return (
              <div  onClick={() => this.businessUnique(key)}>
                <CardExplore  trendings={trending[key]} />
              </div>
            );
          })}
          {/* {this.makeMeCard(trendingbusiness)} */}
        </Slider>
      </div>
      <GallaryExplore />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trendingbusiness: state.business
  }
}
const mapDispathToProps = (dispatch) => {
  return {
    trendingData: () => dispatch(businessAc.trendingData()),
    selectTrending: id => dispatch(businessAc.selectTrending(id))
  }
}
export default withRouter(connect(mapStateToProps, mapDispathToProps)(Explore));
