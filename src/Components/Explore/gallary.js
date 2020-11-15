import React, { Component } from 'react';
import { GiKnifeFork, GiMusicalNotes } from 'react-icons/gi';
import { FaBed, FaGlassMartiniAlt, FaHome, FaFoursquare, FaMapMarkerAlt } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { RiFilter3Line } from 'react-icons/ri'
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { Row, Col } from 'reactstrap';
import * as businessAc from '../../MyStore/actions/businessAc';
import SearchExplore from './search';
import * as Constants from '../../Constants';
import ToolTipGallery from './tooltip';
import TitlebarGridList from './grid';
import ExploreMap from './map';
import Loader from 'react-loader-spinner';
import CountrySelector from './countries';
import Skeleton from 'react-loading-skeleton';

class GallaryExplore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setAllBusiness: [
        { id: 1, value: "Food", isChecked: false },
        { id: 2, value: "Sleep", isChecked: false },
        { id: 3, value: "Drink", isChecked: false },
        { id: 4, value: "Party", isChecked: false },
        { id: 4, value: "Culture", isChecked: false },
        { id: 4, value: "Fun", isChecked: false }
      ],
      Food: false,
      Drink: false,
      Sleep: false,
      Culture: false,
      Fun: false,
      Party: false,
      Grid: true,
      Map: false,
      current: [],
      tooltip: true,
    };
  }
  componentDidMount() {
    const { distance, currentLocation, distanceValue } = this.props.business
    window.addEventListener('scroll', this.hideUpdateTooltip)
    let setAllBusiness = this.state.setAllBusiness
    const rating = this.props.rating
    const typeOfBusiness = []
    setAllBusiness.forEach(business => {
      if (business.isChecked) {
        typeOfBusiness.push(business.value)
      }
    })
    const payload = { page: 1, pagination: 15, typeOfBusiness: typeOfBusiness , distance, value: distanceValue, name: currentLocation, rating}
    this.props.getAllBusiness(payload);
  }
  hideUpdateTooltip = () => {
    let tooltip = this.state.tooltip
    if (tooltip === true) {
      this.setState({ tooltip: !tooltip })
    }
    this.setState({ tooltip: true })
  }
  checkToggle = (name) => {
    if (name === 'Food') {
      let Food = this.state.Food
      this.setState({ Food: !Food })
    }
    else if (name === 'Drink') {
      let Drink = this.state.Drink
      this.setState({ Drink: !Drink })
    }
    else if (name === 'Sleep') {
      let Sleep = this.state.Sleep
      this.setState({ Sleep: !Sleep })
    }
    else if (name === 'Party') {
      let Party = this.state.Party
      this.setState({ Party: !Party })
    }
    else if (name === 'Culture') {
      let Culture = this.state.Culture
      this.setState({ Culture: !Culture })
    }
    else if (name === 'Fun') {
      let Fun = this.state.Fun
      this.setState({ Fun: !Fun })
    }
    let setAllBusiness = this.state.setAllBusiness
    setAllBusiness.forEach(fruite => {
      if (fruite.value === name)
        fruite.isChecked = !fruite.isChecked
    })
    this.setState({ setAllBusiness: setAllBusiness });
    const typeOfBusiness = []
    setAllBusiness.forEach(business => {
      if (business.isChecked) {
        typeOfBusiness.push(business.value)
      }
    })
    const { distance, currentLocation, distanceValue } = this.props.business
    const rating = this.props.rating
    const payload = { page: 1, pagination: 15, distance, value: distanceValue, name: currentLocation, typeOfBusiness: typeOfBusiness, rating }
    this.props.getAllBusiness(payload);
    let searchChange = {
      city: "",
      page: 1,
      pagination: 15,
      rating: "",
      typeOfBusiness: "",
      value: ""
    }
    this.props.searchFalse(searchChange)
  }

  viewInputChange = (name) => {
    if (name === "grid") {
      this.setState({
        Grid: true,
        Map: false
      })
      const value = name
      this.props.setGridValue(value);
    }
    else if (name === "map") {
      this.setState({
        Map: true,
        Grid: false
      })
      const value = name;
      this.props.setMapValue(value);
    }
  }
  showToolTip = () => {
    this.setState({ tooltip: true })
  }
  messagesListRef = (node) => {
    if (node) {
      node.addEventListener("scroll", this.handleScroll.bind(this));
    }
  }

  handleScroll = (event) => {
    const { distance, currentLocation, distanceValue } = this.props.business
    const rating = this.props.rating
    const { search } = this.props;
    const valuePage = this.props.page
    var node = event.target;
    if (node.scrollHeight - parseInt(node.scrollTop) === node.clientHeight) {
      if (search === true) {
        let searchValue = this.props.searchValue;
        let data = {
          ...searchValue,
          page: searchValue.page + 1
        };
        this.props.exploreMoreSearch(data);
      }
      else {
        let setAllBusiness = this.state.setAllBusiness
        const typeOfBusiness = []
        setAllBusiness.forEach(business => {
          if (business.isChecked) {
            typeOfBusiness.push(business.value)
          }
        })
        const payload = { page: valuePage + 1, scrolling: true, pagination: 15, distance, value: distanceValue, name: currentLocation, typeOfBusiness: typeOfBusiness, rating }
        this.props.getScrollBusiness(payload);
      }
    }
  }
  render() {
    const { loading, map } = this.props;
    const { skeltonLoading} = this.props.business
    return (
      <div >
        <div className="gallaryFlex">
          <div className="exploreGllaryIcon">
            <h5>{Constants.FOOD}</h5>
            {this.state.Food ? <GiKnifeFork onClick={() => this.checkToggle('Food')} className="iconsGallaryExploreDark" /> :
              <GiKnifeFork onClick={() => this.checkToggle('Food')} className="iconsGallaryExplore" />}
          </div>
          <div className="exploreGllaryIcon">
            <h5>{Constants.SLEEP}</h5>
            {this.state.Sleep ? <FaBed onClick={() => this.checkToggle('Sleep')} className="iconsGallaryExploreDark" /> :
              <FaBed onClick={() => this.checkToggle('Sleep')} className="iconsGallaryExplore" />}
          </div>
          <div className="exploreGllaryIcon">
            <h5>{Constants.DRINK}</h5>
            {this.state.Drink ? <FaGlassMartiniAlt onClick={() => this.checkToggle('Drink')} className="iconsGallaryExploreDark" /> :
              <FaGlassMartiniAlt onClick={() => this.checkToggle('Drink')} className="iconsGallaryExplore" />}
          </div>
          <div className="exploreGllaryIcon">
            <h5>{Constants.PARTY}</h5>
            {this.state.Party ? <GiMusicalNotes onClick={() => this.checkToggle('Party')} className="iconsGallaryExploreDark" /> :
              <GiMusicalNotes onClick={() => this.checkToggle('Party')} className="iconsGallaryExplore" />}
          </div>
          <div className="exploreGllaryIcon">
            <h5>{Constants.CULTURE}</h5>
            {this.state.Culture ? <FaHome onClick={() => this.checkToggle('Culture')} className="iconsGallaryExploreDark" /> :
              <FaHome onClick={() => this.checkToggle('Culture')} className="iconsGallaryExplore" />}
          </div>
          <div className="exploreGllaryIcon">
            <h5>{Constants.FUN}</h5>
            {this.state.Fun ? <FaFoursquare onClick={() => this.checkToggle('Fun')} className="iconsGallaryExploreDark" /> :
              <FaFoursquare onClick={() => this.checkToggle('Fun')} className="iconsGallaryExplore" />}
          </div>
        </div>
        <div className="addtionalFilterRow">
          <Row style={{ justifyContent: 'center' }}>
            <Col className="exploreGallerySearchCol" xl="3" md="3">
              <SearchExplore />
            </Col>
            <Col
            style={{cursor: "pointer"}}
            data-tip="hover on me will keep the tooltip"
              onClick={this.showToolTip}
              className="gallaryCickAddition"
              xl="2" md="3"
            >
              <RiFilter3Line className="labelSearchGallery" /> &nbsp; &nbsp;
              <label className="galleryAdvanceLabel" > Advance Filter </label>
            </Col  >
            {this.state.tooltip ?
              <ReactTooltip
                className="extraClass"
                arrowColor="white"
                place="bottom"
                delayHide={300}
                effect="solid"
                event="click"
                eventOff="mouseout scroll"
              >
                <ToolTipGallery />
              </ReactTooltip>
              : <></>}
            <Col className="exploreCountrySelect" md="2" >
              <CountrySelector />
            </Col>
            <Col xl="2">
              <Row>
                <Col xs="6">
                  <div className="exploreGllaryIcon">
                    {this.state.Grid ? <BsGridFill className="iconsGallaryViewDark" onClick={() => this.viewInputChange('grid')} /> :
                      <BsGridFill className="iconsGallaryView" onClick={() => this.viewInputChange('grid')} />}
                  </div>
                </Col>
                <Col xs="6">
                  <div className="exploreGllaryIcon">
                    {this.state.Map ? <FaMapMarkerAlt className="iconsGallaryViewDark" onClick={() => this.viewInputChange('map')} /> :
                      <FaMapMarkerAlt  className="iconsGallaryView" onClick={() => this.viewInputChange('map')} />}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        {!map && (
          <>
            <div ref={this.messagesListRef} style={{ overflow: 'scroll', overflowX: 'hidden', height: '700px', }} >
              {!skeltonLoading ? <TitlebarGridList className="gridEffect" /> : <> <Skeleton count={10} height="70px" /></>}
            </div>
            {loading && (
              <Loader
                className="gridLoading"
                type="ThreeDots"
                color="#6E6E6E"
                height={80}
                width={100}
                timeout={10000}
              />
            )}
          </>
        )
        }
        {map && <ExploreMap />}
      </div >
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getAllBusiness: setAllBusiness => dispatch(businessAc.getAllBusiness(setAllBusiness)),
    searchFalse: (searchChange) => dispatch(businessAc.searchFalse(searchChange)),
    getScrollBusiness: setAllBusiness => dispatch(businessAc.getScrollBusiness(setAllBusiness)),
    setMapValue: value => dispatch(businessAc.setMapValue(value)),
    setGridValue: value => dispatch(businessAc.setGridValue(value)),
    exploreMoreSearch: data => dispatch(businessAc.exploreMoreSearch(data)),
    getCurrentLocation: location => dispatch(businessAc.getCurrentLocation(location)),
  };
};
const mapStateToProps = state => {
  return {
    loading: state.business.loading,
    map: state.business.map,
    search: state.business.search,
    searchValue: state.business.searchValue,
    page: state.business.page,
    city: state.business.city,
    typeBusiness: state.business.typeBusiness,
    rating: state.business.sortRating,
    business: state.business
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GallaryExplore);