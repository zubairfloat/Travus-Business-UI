import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import StarIcon from '@material-ui/icons/Star';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import * as businessAc from '../../MyStore/actions/businessAc';

const image = `${process.env.REACT_APP_SERVER}/images`;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: '100%'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  }
}));
class TitlebarGridList extends Component {
  businessUnique = id => {
    this.props.selectBusiness(id);
  };
  render() {
    const classes = useStyles;
    const { list, loading } = this.props;
    const venues = list;
    return (
      <div className={classes.root}>
        {loading && (
          <Loader
            className="gridLoading"
            type="ThreeDots"
            color="#6E6E6E"
            height={100}
            width={120}
            timeout={10000} //3 secs
          />
        )}
        {!loading && (
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}></GridListTile>
            {venues &&
              Object.keys(venues).map(key => {
                let tile = venues[key];
                return (
                  <GridListTile key={tile.img} cols={tile.cols || 1}>
                    <img src={`${tile.prefix}${'580x300'}${tile.suffiex}`} alt={tile.title} />
                    <img src={`${image}/${tile.image}`} alt={tile.title} />
                    <GridListTileBar
                      key={tile.img}
                      title={tile.option}
                      subtitle={<span>by: {tile.userName}</span>}
                      cols={2}
                      actionIcon={
                        <IconButton
                          aria-label={`info about ${tile.title}`}
                          className={classes.icon}
                        >
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <InfoIcon />
                        </IconButton>
                      }
                    />
                  </GridListTile>
                );
              })}
          </GridList>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectBusiness: id => dispatch(businessAc.selectBusiness(id))
  };
};

const mapStateToProps = state => {
  return {
    list: state.business.tripBusiness,
    loading: state.business.loading
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TitlebarGridList));
