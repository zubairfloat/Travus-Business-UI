import React, { Component } from 'react';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { connect } from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';
import './style.css';

class ReviewCard extends Component {
  render() {
    let review = this.props.review;
    return (
      <div className="reviewCard">
        <div>
          <h4>
            <FaUserCircle className="reviewUserIcon" /> &ensp;{review.username}
          </h4>
        </div>
        <div className="reviewCardTitleDiv">
          <h3>{review.comment}</h3>
        </div>
        <div className="reviewCardIconseDiv">
          <div>
            <StarRatingComponent
              className="reviewStarnonEdit"
              name="rate2"
              editing={false}
              starCount={5}
              starColor="#6E6E6E"
              emptyStarColor="#DEDEDE"
              value={review.rating}
            />
          </div>
          <div>
            <AiOutlineLike /> <AiOutlineDislike />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps)(ReviewCard);
