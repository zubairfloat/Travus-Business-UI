import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as businessAc from '../../MyStore/actions/businessAc';
import * as Review from '../../MyStore/actions/review';
import './style.css';

const image = `${process.env.REACT_APP_IMAGE}/images`;
class Head extends Component {
  componentDidMount() {
    let select = this.props.selected;
    let business = {};
    if (select !== -1) {
      business = this.props.business[select];
      let _id = business._id
      this.props.viewsUpdate(_id);
      this.props.getReview(select);
    }
  }
  render() {
    let select = this.props.selected;
    let selectTrending = this.props.selectTrending
    let trending = this.props.trending
    let trendingUnique = trending[selectTrending]
    let business = {};
    if (select !== -1) {
      business = this.props.business[select];
      return (
        <div className="profileHeadImg">
          <div className="profileHead">
            <h1> {business.businessName} </h1> 
          <img style={{objectFit: "contain"}} src={`${business.prefix}${'1280x720'}${business.suffiex}`} alt="" />  <img src={`${image}/${business.image}`} alt="" />
          </div>
        </div>
      );
    }
    else if (selectTrending !== null) {
      return (
        <div className="profileHeadImg">
          <div className="profileHead">
            <h1>{trendingUnique.businessName}</h1>
            <img style={{objectFit: "contain"}} src={`${trendingUnique.prefix}${'1280x720'}${trendingUnique.suffiex}`} alt="" />
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    items: state.auth.user,
    business: state.business.businessList.venue,
    selected: state.business.slectedVanue,
    selectTrending: state.business.selectTrending,
    trending: state.business.trending
  };
};
const mapDispatchToProps = dispatch => {
  return {
    viewsUpdate: _id => dispatch(businessAc.viewsUpdate(_id)),
    getReview: select => dispatch(Review.getReview(select)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Head);
