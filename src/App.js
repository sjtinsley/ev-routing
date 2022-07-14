import * as React from 'react';
import Map, { Source, Layer, MapProvider } from 'react-map-gl'
import RouteForm from './components/RouteForm'
import RouteResults from './components/RouteResults'

const env = require("../.env")



const routeStyle = {
  id: 'route-layer',
  type: 'line',
  paint: {
    'line-color': 'hsl(39, 50%, 64%)',
    'line-width': 5,
  }
};

const waypointStyle = {
  id: 'waypoint-layer',
  type: 'circle',
  paint: {
    'circle-color': 'hsl(39, 50%, 54%)',
    'circle-radius': 8,
  }
};

const markerStyle = {
  id: 'marker-layer',
  type: 'circle',
  paint: {
    'circle-color': 'rgba(0, 0, 0, 0.5)',
    'circle-radius': 2,
  }
};


export default function App() {
  const [viewport, setViewport] = React.useState();
  const [route, setRoute] = React.useState({
    type: "Feature",
    geometry: {
        type: "LineString",
        coordinates: []
    }});
    
    const [waypoints, setWaypoints] = React.useState({
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: []
        }}]
    });

    const [chargingMarkers, setChargingMarkers] = React.useState({
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: []
        }}]
    });

    const[duration, setDuration] = React.useState()
    const[distance, setDistance] = React.useState()
    const[chargingPlaces, setChargingPlaces] = React.useState()
    const[inputVisible, setInputVisible] = React.useState(true)
    const[resultsVisible, setResultsVisible] = React.useState(false)
    // const[stopCoordinates, setStopCoordinates] = React.useState()

    const [viewState, setViewState] = React.useState({
      bounds: [
        -7.57216793459, 49.8, 1.68153079591, 58.8
      ]
    });

  return (
    <>
      {/* <MapProvider> */}
      <Map
        {...viewState}
        // id="myMap"
        onMove={e => setViewState(e.viewState)}
        style={{width: '100vw', height: '100vh'}}
        mapStyle="mapbox://styles/sambutton12/cl5l0l3zy009n14nvvwxu6t0h"
        mapboxAccessToken = {env.mapbox_access_token}
      >
        <Source id="route" type="geojson" data={route}>
          <Layer {...routeStyle} />
        </Source>

        <Source id="waypoints" type="geojson" data={waypoints}>
          <Layer {...waypointStyle} />
        </Source>

        <Source id="chargingMarkers" type="geojson" data={chargingMarkers}>
          <Layer {...markerStyle} />
        </Source>

      </Map>
      {inputVisible &&
        <RouteForm 
          setRoute={setRoute} 
          setWaypoints={setWaypoints} 
          setDuration={setDuration} 
          setDistance={setDistance} 
          setInputVisible={setInputVisible} 
          setResultsVisible={setResultsVisible} 
          setChargingPlaces={setChargingPlaces}
          setChargingMarkers={setChargingMarkers} 
          // setStopCoordinates={setStopCoordinates}
        />
      }
      {resultsVisible && 
        <RouteResults 
          duration={duration} 
          distance={distance} 
          setResultsVisible={setResultsVisible} 
          setInputVisible={setInputVisible} 
          chargingPlaces={chargingPlaces} 
          // stopCoordinates={waypoints}
        />
      }
      {/* </MapProvider> */}
      </>
    
  );
}