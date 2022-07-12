import * as React from 'react';
import Map, { Source, Layer } from 'react-map-gl'
import { Container } from './components/Container'

const env = require("../.env")

const geojson = {
        type: "Feature",
        geometry: {
            type: "LineString",
            coordinates: [[0,51.4],[0, 51.5]]
        }
    };

const layerStyle = {
  id: 'route-layer',
  type: 'line',
  paint: {
    'line-color': 'rgba(0,124,191,0.6)',
    'line-width': 8,


  }
};


export default function App() {
  const [viewport, setViewport] = React.useState();
  const [data, setData] = React.useState();

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
        <SourceProvider data={geojson}>
          <Source id="my-data" type="geojson" data={props.geojson}>
            <Layer {...layerStyle} />
          </Source>
        </SourceProvider>
      </Map>
      <Container />
      </>
    </div>
  );
}
