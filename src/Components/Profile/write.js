import React, { Component } from 'react';
import { IoMdStar } from 'react-icons/io';
import MyApp from './Calendar';
import { Container, Col, Row, Button } from 'reactstrap';
import { IoMdAddCircleOutline } from 'react-icons/io';
import * as Constants from '../../Constants';
import { connect } from 'react-redux';
import * as Review from '../../MyStore/actions/review';
import Loader from 'react-loader-spinner';

import './style.css';
import ReviewRatings from './rating';

class Write extends Component {
  constructor() {
    super();
    this.state = {
      review: {
        date: ['2020-04-02T19:00:00.000Z'],
        rating: 1,
        suitable: '',
        welcoming: '',
        revisit: '',
        comment: '',
        image: '',
        userId: '',
        venueId: '',
        username: ''
      }
    };
  }
  componentWillReceiveProps(props) {
    if (props.reviewAdded && this.props.reviewAdded !== props.reviewAdded) {
      let isOpen = false;
      this.props.onSubmitReview(isOpen);
    }
  }
  date = data => {
    let date = data.date;
    this.setState({
      review: {
        ...this.state.review,
        date: [date]
      }
    });
  };
  rating = data => {
    let ratings = data.nextValue;
    this.setState({
      review: {
        ...this.state.review,
        rating: ratings
      }
    });
  };
  onSubmitReview = e => {
    e.preventDefault();

    const userId = this.props.user.userId;
    const username = this.props.user.username;
    let selectTrending = this.props.selectTrending
    let venueId
    if(selectTrending !== null){
      let trending = this.props.trending
      let trendingUnique = trending[selectTrending]
      venueId = trendingUnique.venueId
    }
    else{
      venueId = this.props.business;
    }
    const { suitable, welcoming, revisit, } = this.state.review;
    if (suitable.length === 0) {
      alert('First Name Field is Empty');
    } else if (welcoming.length === 0) {
      alert('User Email Field is Empty');
    } else if (revisit.length === 0) {
      alert('Bussiness Field is Empty');
    } else {
      let formData = new FormData();
      let review = this.state.review;
      formData.append('date', review.date);
      formData.append('rating', review.rating);
      formData.append('image', this.state.image);
      formData.append('suitable', review.suitable);
      formData.append('welcoming', review.welcoming);
      formData.append('revisit', review.revisit);
      formData.append('comment', review.comment);
      formData.append('userId', userId);
      formData.append('venueId', venueId);
      formData.append('username', username);
      this.props.AddReview(formData);

      this.setState({
        image: ''
      });
      // this.props.history.push('/business');
    }
  };
  onChangeImage = e => {
    this.setState({
      image: e.target.files[0],
      file: URL.createObjectURL(e.target.files[0])
    });
  };
  handleInputChange = ({ currentTarget: input }) => {
    let review = { ...this.state.review };
    review[input.name] = input.value;
    this.setState({ review });
  };
  render() {
    const loading = this.props.loading
    return (
      <Container fluid={true}>
        <div className="write">
          <form encType="multipart/form-data" onSubmit={this.onSubmitReview}>
            <div className="modelProfileHeading">
              <div className="modelProfileInside">
                <h1>{Constants.WRITE_A_REVIEW}</h1>
              </div>
            </div>
            <Row>
              <Col md={{ offset: 1, size: 6 }}>
                <h4>
                  <IoMdStar className="modelStar" /> &nbsp;{Constants.DATA_VISITED}
                </h4>
                <MyApp pointerCallBack={this.date} />
              </Col>
            </Row>
            <Row>
              <Col md={{ offset: 1, size: 6 }}>
                <h2>
                  <IoMdStar className="modelStar" /> &nbsp; {Constants.HOW_YOUR_EXPERIENCE}
                </h2>
                <Row>
                  <Col md={{ offset: 1, size: 6 }}>
                    <ReviewRatings callBack={this.rating} />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={{ offset: 1, size: 11 }}>
                <h2>
                  <IoMdStar className="modelStar" /> &nbsp;{Constants.WOULD_YOU_CONSIDER_3}
                </h2>
                <Col md={{ offset: 1, size: 6 }}>
                  <Row>
                    <div className="displayColumn">
                      <input
                        type="radio"
                        name="suitable"
                        id="option1"
                        value={Constants.Yes}
                        onClick={this.handleInputChange}
                      />
                      <h4>{Constants.Yes}</h4>
                    </div>
                    <div className="displayColumn">
                      <input
                        type="radio"
                        name="suitable"
                        id="option2"
                        value={Constants.NO}
                        onClick={this.handleInputChange}
                      />
                      <h4>{Constants.NO}</h4>
                    </div>
                  </Row>
                </Col>
              </Col>
            </Row>
            <Row>
              <Col md={{ offset: 1, size: 11 }}>
                <h2>{Constants.HOW_WELCOMIN_EXPERIENCE_4}</h2>
                <Row>
                  <Col md={{ offset: 1, size: 11 }}>
                    <Row>
                      <div className="displayColumn">
                        <input
                          type="radio"
                          name="welcoming"
                          value={Constants.NOT_WELCOMING}
                          onClick={this.handleInputChange}
                        />
                        <h4>{Constants.NOT_WELCOMING}</h4>
                      </div>
                      <div className="displayColumn">
                        <input
                          type="radio"
                          name="welcoming"
                          value={Constants.SOMETHING_WELCOMING}
                          onClick={this.handleInputChange}
                        />
                        <h4>{Constants.SOMETHING_WELCOMING}</h4>
                      </div>
                      <div className="displayColumn">
                        <input
                          type="radio"
                          name="welcoming"
                          value={Constants.VERY_WELCOMING}
                          onClick={this.handleInputChange}
                        />
                        <h4>{Constants.VERY_WELCOMING}</h4>
                      </div>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={{ offset: 1, size: 11 }}>
                <h2>{Constants.HOW_LIKELY_ARE_YOU}</h2>
                <Row>
                  <Col md={{ offset: 1, size: 9 }}>
                    <Row>
                      <div className="displayColumn">
                        <input
                          type="radio"
                          name="revisit"
                          value={Constants.NOT_LIKELY}
                          onClick={this.handleInputChange}
                        />
                        <h4>{Constants.NOT_LIKELY}</h4>
                      </div>
                      <div className="displayColumn">
                        <input
                          type="radio"
                          name="revisit"
                          value={Constants.SOMETHING_LIKELY}
                          onClick={this.handleInputChange}
                        />
                        <h4>{Constants.SOMETHING_LIKELY}</h4>
                      </div>
                      <div className="displayColumn">
                        <input
                          type="radio"
                          name="revisit"
                          value={Constants.VERY_LIKELY}
                          onClick={this.handleInputChange}
                        />
                        <h4>{Constants.VERY_LIKELY}</h4>
                      </div>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={{ offset: 1, size: 11 }}>
                <h3>{Constants.COMMENTS_6}</h3>
                <Row>
                  <Col md={{ offset: 1, size: 6 }}>
                    <textarea
                      className="inputWrite"
                      rows="5"
                      cols="70"
                      name="comment"
                      form="usrform"
                      value={this.state.review.comment}
                      onChange={this.handleInputChange}
                    ></textarea>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={{ offset: 1, size: 11 }}>
                <h2>{Constants.ADD_A_PHOTO}</h2>
                <Row>
                  <Col md={{ size: 6 }}>
                    <div className="displayColumnUpload">
                      <input
                        className="listInputUpload"
                        type="file"
                        id="file"
                        onChange={event => this.onChangeImage(event)}
                      />
                      <label for="file">
                        <h4>
                          <IoMdAddCircleOutline /> {Constants.CLICK_TO_UPLOAD}
                        </h4>
                      </label>
                    </div>
                  </Col>
                </Row>
                <Row className="rowuploadimage">
                  <Col md={{ offset: 1, size: 6 }}>
                    <img style={{ width: '200px', height: 'auto' }}  src={this.state.file} alt="" />
                  </Col>
                </Row>
              </Col>
            </Row>

            {loading && (
              <div>
                <Loader
                  className="gridLoading"
                  type="Oval"
                  color="#6E6E6E"
                  height={70}
                  width={90}
                  timeout={10000}
                />
              </div>

            )}
            <Row className="modelBottom">
              {!loading && <>
                <Col md={{ offset: 1, size: 9 }}>
                  <div className="modelCheckPolicy">
                    <h3>
                      <input type="checkbox" />
                      &nbsp; {Constants.PROFILE_LOREM_IPSUM_SIT}
                  </h3>
                  </div>
                </Col>
                <Col md={{ size: 2 }} style={{padding:"23px 0px 0px 0px"}}>
                  <Button className="modelSubmitBtn">Submit</Button>
                </Col>
              </>}
            </Row>
          </form>
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    AddReview: review => dispatch(Review.AddReview(review))
  };
};

const mapStateToProps = state => {
  return {
    loading: state.review.loading,
    user: state.auth.user,
    business: state.business.slectedVanue,
    reviewAdded: state.review.reviewAdded,
    selectTrending: state.business.selectTrending,
    trending: state.business.trending
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Write);