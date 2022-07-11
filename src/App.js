import * as React from 'react';
import Map, { Source, Layer } from 'react-map-gl'
import { Container } from './components/Container'

const env = require("../.env")

const geojson = {
  type: 'FeatureCollection',
  features: [
    {type: 'Feature', geometry: {type: 'Point', coordinates: [0, 51.5]}}
  ]
};

const layerStyle = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 100,
    'circle-color': '#007cbf'
  }
};


export default function App() {
  const [viewport, setViewport] = React.useState();
  
  return (
    <div>
      <>
      <Map
        initialViewState={{
          longitude: 0,
          latitude: 51.476853,
          zoom: 14
        }}
        style={{width: 1200, height: 800}}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken = {env.mapbox_access_token}
      >
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
      <Container />
      </>
    </div>
  );
}
