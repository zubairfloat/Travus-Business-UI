import React, { Component } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Button, Modal, ModalHeader } from 'reactstrap';
import ReviewCard from './card';
import Write from './write';
import * as Constants from '../../Constants';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import './style.css';

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  
  toggle = () => {
    let { isAuthenticated } = this.props.user;
    if (isAuthenticated === true) {
      this.setState({
        isOpen: !this.state.isOpen
      });
    } else {
    toast.error("sign in required")
    }
  };
  handleSubmit = isOpen => {
    this.setState({ isOpen: isOpen });
  };
  render() {
    const settings = {
      slidesToShow: 3,
      infinite: false,
      speed: 500,
      arrows: true,
      responsive: [
        {
          breakpoint: 960,
          settings: {
            slidesToShow: 1,
            className: 'center',
          }
        }
      ]
    };
    const { reviews = [] } = this.props;
    if (!reviews.length)
      return (
        <div className="reviewNoReview">
          <div className="noReviewDiv">
            <h2>No Reviews Added for this Destination!</h2>
          </div>
          <div className="featureDivBtn">
          <Button className="featureInBtn" onClick={this.toggle}>
            {Constants.WRITE_A_REVIEW}
          </Button>
          </div>
          <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}></ModalHeader>
            <Write onSubmitReview={this.handleSubmit} />
          </Modal>
        </div>
      );
    return (
      <div className="review">
        <Slider {...settings}>
          {Object.keys(reviews).map(key => {
            return (
              <div>
                <ReviewCard review={reviews[key]} />
              </div>
            );
          })}
         
        </Slider>
        <div className="featureDivBtn">
          <Button className="featureInBtn" onClick={this.toggle}>
            {Constants.WRITE_A_REVIEW}
          </Button>
        </div>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}></ModalHeader>
          <Write onSubmitReview={this.handleSubmit} />
        </Modal>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {};
};
const mapStateToProps = state => {
  return {
    user: state.auth,
    reviews: state.review.review,
    loading: state.review.loading,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Review));
