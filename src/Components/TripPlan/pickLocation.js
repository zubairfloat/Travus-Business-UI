import React from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from 'react-google-maps';
// import Autocomplete from 'react-google-autocomplete';
import Geocode from 'react-geocode';


Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_MAP_KEY}`);
Geocode.enableDebug();

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      city: 'Wyoming County',
      area: 'Cowlesville',
      state: 'New York',
      mapPosition: {
        lat: 42.80282,
        lng: -78.4289
      },
      markerPosition: {
        lat: 42.80282,
        lng: -78.4289
      }
    };
  }

  componentDidMount() {
    const { mapPosition } = this.state;
    Geocode.fromLatLng(mapPosition.lat, mapPosition.lng).then(
      response => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);
        this.setState({
          address: address ? address : '',
          area: area ? area : '',
          city: city ? city : '',
          state: state ? state : ''
        });
        this.props.pointerCallBack({ address, area, city, state });
      },
      error => {
        console.error(error);
      }
    );
  }
  getCity = addressArray => {
    let city = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };
  getArea = addressArray => {
    let area = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            'sublocality_level_1' === addressArray[i].types[j] ||
            'locality' === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };
  getState = addressArray => {
    let state = '';
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          'administrative_area_level_1' === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onPlaceSelected = place => {
    const address = place.formatted_address,
      addressArray = place.address_components,
      city = this.getCity(addressArray),
      area = this.getArea(addressArray),
      state = this.getState(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();
    this.setState({
      address: address ? address : '',
      area: area ? area : '',
      city: city ? city : '',
      state: state ? state : '',
      markerPosition: {
        lat: latValue,
        lng: lngValue
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue
      }
    });
    this.props.pointerCallBack({ address, area, city, state, latValue, lngValue });
  };
  onMarkerDragEnd = event => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();
    Geocode.fromLatLng(newLat, newLng).then(
      response => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);
        this.setState({
          address: address ? address : '',
          area: area ? area : '',
          city: city ? city : '',
          state: state ? state : '',
          markerPosition: {
            lat: newLat,
            lng: newLng
          }
        });
        this.props.pointerCallBack({ address, area, city, state, newLat, newLng });
      },
      error => {
        console.error(error);
      }
    );
  };
  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          google={this.props.google}
          defaultZoom={this.props.zoom}
          defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
        >
          {/* <Autocomplete
            style={{
              width: '100%',
              height: '40px',
              paddingLeft: '16px',
              marginTop: '2px',
              marginBottom: '100px'
            }}
            onPlaceSelected={this.onPlaceSelected}
            types={['(regions)']}
          /> */}
          {/*Marker*/}
          <Marker
            google={this.props.google}
            name={'Dolores park'}
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
          />
          <Marker />
          <InfoWindow
            position={{
              lat: this.state.markerPosition.lat + 0.0018,
              lng: this.state.markerPosition.lng
            }}
          >
            <div>
              <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
            </div>
          </InfoWindow>
        </GoogleMap>
      ))
    );
    let map;
    if (this.state.markerPosition.lat !== undefined) {
      map = (
        <div>
          <div>
            <div className="form-group">
              <label htmlFor="">City</label>
              <input
                type="text"
                name="city"
                className="form-control"
                onChange={this.onChange}
                value={this.state.city}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Area</label>
              <input
                type="text"
                name="area"
                className="form-control"
                onChange={this.onChange}
                value={this.state.area}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">State</label>
              <input
                type="text"
                name="state"
                className="form-control"
                onChange={this.onChange}
                value={this.state.state}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                onChange={this.onChange}
                value={this.state.address}
              />
            </div>
          </div>
          <AsyncMap
            googleMapURL={`${process.env.REACT_APP_GOOGLE_MAP_URL}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: this.props.height }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      );
    } else {
      map = <div style={{ height: this.props.height }} />;
    }
    return map;
  }
}
export default Map;
