import * as React from 'react';
import Map, { Source, Layer } from 'react-map-gl'
import { Container } from './components/Container'

const env = require("../.env")



const layerStyle = {
  id: 'route-layer',
  type: 'line',
  paint: {
    'line-color': 'rgba(0, 124, 191, 0.6)',
    'line-width': 8,


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

  return (
    <div>
      <>
      <Map
        initialViewState={{
          longitude: 0,
          latitude: 51.5,
          zoom: 14
        }}
        style={{width: '100vw', height: '100vh'}}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken = {env.mapbox_access_token}
      >
        <Source id="my-data" type="geojson" data={route}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
      <Container setRoute={setRoute} />
      </>
    </div>
  );
}
