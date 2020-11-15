import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.css';

class ExploreMap extends Component {
  state = {
    venues: []
  };
  renderMap = () => {
    loadScript(`${process.env.REACT_APP_GOOGLE_LOAD_SCRIPT}`);
    window.initMap = this.initMap;
  };
  initMap = () => {
    const venues = this.props.business;
    let cityLat = '';
    let cityLng = '';
    Object.keys(venues).forEach(key => {
      cityLng = venues[key].cityLocation.coordinates[0];
      cityLat = venues[key].cityLocation.coordinates[1];
    });
    var map = new window.google.maps.Map(document.getElementById('exploreMap'), {
      center: { lat: parseFloat(cityLat), lng: parseFloat(cityLng) },
      zoom: 12
    });
    var infowindow = new window.google.maps.InfoWindow();
    venues &&
      Object.keys(venues).map(key => {
        let tile = venues[key];
        var marker = new window.google.maps.Marker({
          position: {
            lat: parseFloat(tile.businessLocation.coordinates[1]),
            lng: parseFloat(tile.businessLocation.coordinates[0])
          },
          map: map,
          title: tile.businessName
        });
        marker.addListener('click', function() {
          infowindow.setContent(tile.businessName);
          infowindow.open(map, marker);
        });
      });
  };
  render() {
    this.renderMap();
    return (
      <main>
        <div id="exploreMap" style={{width: '100' , height: '100'}}></div>
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
    business: state.business.businessList.venue
  };
};
export default connect(mapStateToProps)(ExploreMap);
