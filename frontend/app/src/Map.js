/*global google*/

import React from "react";
import { withRouter } from 'react-router';
/*import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"*/ 
import App from './App';
import {sendFormInformation} from './App';
/*
const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} onClick={props.onMarkerClick} />}
  </GoogleMap>
)
*/

//console.log(this.location.state.detail)

const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");



  
const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyB8pxsl2jFQSwshMT2I5Weue8CKLgxalY8&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
		const DirectionsService = new google.maps.DirectionsService();
		
      DirectionsService.route({
        origin: 'Lille',
		waypoints: [
		{
		  //location: 'Amiens, FR',
		  location : App.escales,
		  stopover: false
		},{
		  location: 'Nantes, FR',
		  stopover: false
		}],
        destination: new google.maps.LatLng(43.29337, 5.3713),
        travelMode: google.maps.TravelMode.DRIVING,
      
	 /** origin : this.state.origin,
	  waypoints : this.state.waypoints,
	  destination : this.state.arrival,
	  travelMode : this.state.mode **/
	  
	  
	  
	  
	  }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result} blabla`);
        }
      });
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={7}
    defaultCenter={new google.maps.LatLng(47.0824, 2.3985)}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
);

<MapWithADirectionsRenderer />

class Map extends React.Component {
  constructor(props) {
        super(props);
  
  this.state = {
    isMarkerShown: false,
	 origin : 'Bordeaux',
	  waypoints : [
		{
		  //location: 'Amiens, FR',
		  location : 'Montpellier',
		  stopover: false
		}],
	  destination : 'Marseille',
	  travelMode : 'driving',
  };
  this.componentDidMount = this.componentDidMount.bind(this);
  this.delayedShowMarker = this.delayedShowMarker.bind(this);
  this.handleMarkerClick = this.handleMarkerClick.bind(this);
}
	delayedShowMarker  () {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }
  
  componentDidMount () {
    this.delayedShowMarker()
  }

  

  handleMarkerClick () {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render () {
    return (
	  /*
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
	  */ 
	  <MapWithADirectionsRenderer
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
};
export default Map; 

