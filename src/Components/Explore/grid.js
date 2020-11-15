import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import withStyles from "@material-ui/core/styles/withStyles";
import withWidth from '@material-ui/core/withWidth';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as businessAc from '../../MyStore/actions/businessAc';
import compose from 'recompose/compose';
import StarRatingComponent from 'react-star-rating-component';
import { Row } from 'reactstrap';
import { FaCircle, FaHeart, FaRegHeart } from 'react-icons/fa';
import * as venueActions from '../../MyStore/actions/venue.actions';
import Loader from "react-loader-spinner";

const image = `${process.env.REACT_APP_IMAGE}/images`;
const styles = theme => ({});
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: '100%',
    overflow: 'scroll',
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
    height: '200px',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  }
}));
class TitlebarGridList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setAllBusiness: {
        typeOfBusiness: 'Food',
        pagination: 10,
        page: 1
      }
    };
  }
  savedPlace = (select) => {
    return <FaRegHeart style={{ cursor: 'pointer' }} className="exploreGridHeart" onClick={() => this.savedBusiness(select)} />
  }
  unSavedPlace = (unSelect) => {
    return <FaHeart style={{ cursor: 'pointer' }} className="exploreGridHeart" onClick={() => this.unSavedBusiness(unSelect)} />
  }
  businessUnique = (event, id) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      this.props.selectBusiness(id);
      this.props.history.push('/profile');
    }
  };
  savedBusiness = (select) => {
    this.props.saveVenue(select)
  }
  unSavedBusiness = (unSelect) => {
    this.props.removeVenue(unSelect)
  }
  render() {
    let loading = this.props.status.isloading;
    const classes = useStyles;
    const { list, width } = this.props;
    const venues = list.venue;
    let columns = width === 'xs' || width === 'xs' ? 1 : 3;
    let columsHeight = width === 'xs' || width === 'xs' ? 320 : 160;
    let saveVenues = this.props.venues
    if (venues && Object.keys(venues).length === 0) {
      return (
        <div className="exploreGrifNoBusiness">
          <h1>No business exists!</h1>
        </div>
      )
    }
    else {
      return (
        <div className={classes.root}>

          <GridList cellHeight={columsHeight} className={classes.gridList} cols={columns}>
            {venues &&
              Object.keys(venues).map(key => {
                let tile = venues[key];
                let select = tile._id
                let unSelect = tile._id
                let saved = false;
                saveVenues && saveVenues.filter(x => {
                  if (tile._id === x) {
                    saved = true;
                  }
                })
                return (
                  <GridListTile
                    key={tile.img}
                    cols={tile.cols || 1}
                  >
                      <div className="tileWraperDiv">
                      <img style={{ objectFit: "contain", width: '100%', height: '100%' }}
                        src={
                          tile.image ? `${image}/${tile.image}` :
                            `${tile.prefix}${'400x340'}${tile.suffiex}`
                        }
                        alt={tile.title}
                        onClick={event => this.businessUnique(event, key)}
                      />
                      </div>
                    <GridListTileBar
                      key={tile.img}
                      title={tile.businessName}
                      subtitle={
                        <div>
                          {loading && (
                            <div className="exploreSaveLocationLoader" style={{ position: "absolute", top: "45%", left: "45%" }}>
                              <Loader type="TailSpin" color="#FFD700" height={50} width={50} timeout={0} />
                            </div>
                          )}
                          <Row className="exploreGalleryHover"><span>by:{tile.option}</span></Row>
                          <Row className="exploreGalleryHoverStar"><StarRatingComponent
                            className="exploreGalleryStarsShow"
                            name="rate2"
                            editing={false}
                            starCount={5}
                            starColor="#FFD700"
                            emptyStarColor="white"
                            value={tile.rating}
                          />
                          </Row>
                          <Row className="exploreGalleryHoverStar">
                            {
                              saved ? this.unSavedPlace(unSelect)
                                :
                                this.savedPlace(select)
                            }
                            {
                              saved ? <p> Saved </p> : <p>Save place</p>
                            }
                            {/* <FaHeart className="exploreGridHeart" />
                            <p>Save Location</p> */}
                          </Row>
                        </div>}
                      actionIcon={
                        <Row className="exploreGalleryOpenNow">
                          <FaCircle className="exploreGridCircle" /><p>Open Now</p>
                        </Row>
                      }
                    />
                  </GridListTile>
                );
              })}
          </GridList>
        </div>
      );
    }
  }
}
const mapDispatchToProps = dispatch => {
  return {
    selectBusiness: id => dispatch(businessAc.selectBusiness(id)),
    saveVenue: id => dispatch(venueActions.saveVenue(id)),
    removeVenue: id => dispatch(venueActions.removeVenue(id))
  };
};

const mapStateToProps = state => {
  return {
    list: state.business.businessList,
    loading: state.business.loading,
    venues: state.venues?.venues,
    status: state.venues?.status,
  };
};

export default withRouter(compose(
  withStyles(styles, {
    name: 'TitlebarGridList',
  }),
  withWidth(),
  connect(mapStateToProps, mapDispatchToProps),
)(TitlebarGridList));