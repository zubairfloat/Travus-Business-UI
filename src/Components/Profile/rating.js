import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import './style.css';

class ReviewRatings extends React.Component {
  constructor() {
    super();
    this.state = {
      rating: 1
    };
  }
  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
    this.props.callBack({ nextValue });
  }
  render() {
    const { rating } = this.state;
    return (
      <div>
        <StarRatingComponent
          className="writeReviewStarSelect"
          name="rate1"
          starCount={5}
          starColor="#6E6E6E"
          emptyStarColor="#DEDEDE"
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
}

export default ReviewRatings;
