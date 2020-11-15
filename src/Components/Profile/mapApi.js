import React, { Component } from 'react';
import { connect } from 'react-redux';

class MapApi extends Component {
  renderMap = () => {
    loadScript(`${process.env.REACT_APP_GOOGLE_LOAD_SCRIPT}`);
    window.initMap = this.initMap;
  };
  initMap = () => {
    let select = this.props.selected;
    let selectTrending = this.props.selectTrending
    let lat;
      let lng;
      let businesslat;
      let businesslng;
      let business = {};
    if (selectTrending !== null) {
      let trending = this.props.trending
      let trendingUnique = trending[selectTrending]
      lat = trendingUnique.cityLocation.coordinates[0];
      lng = trendingUnique.cityLocation.coordinates[1];
      businesslat = trendingUnique.businessLocation.coordinates[0];
      businesslng = trendingUnique.businessLocation.coordinates[1];
    }
    else {
      if (select !== -1) {
        business = this.props.business[select];
        lat = business.cityLocation.coordinates[0];
        lng = business.cityLocation.coordinates[1];
        businesslat = business.businessLocation.coordinates[0];
        businesslng = business.businessLocation.coordinates[1];
      } else {
        businesslat = '-0.14774130664594515';
        businesslng = '51.50430866903813';
        lat = '-0.12574';
        lng = '51.50853';
      }

    }
    
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: parseFloat(lng), lng: parseFloat(lat) },
      zoom: 10
    });

    var infowindow = new window.google.maps.InfoWindow();
    var contentString = `${business.businessName}`;
    var marker = new window.google.maps.Marker({
      position: { lat: parseFloat(businesslng), lng: parseFloat(businesslat) },
      map: map,
      title: business.fullAddress
    });
    marker.addListener('click', function () {
      infowindow.setContent(contentString);
      infowindow.open(map, marker);
    });
  };
  render() {
    this.renderMap();
    return (
      <main>
        <div id="map"></div>
      </main>
    );
  }
}
function loadScript(url) {
  var index = window.document.getElementsByTagName('script')[0];
  var script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
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
export default connect(mapStateToProps)(MapApi);
