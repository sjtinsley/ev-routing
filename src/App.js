import * as React from 'react';
import { Map, Source, Layer, MapProvider, useMap } from 'react-map-gl'
import RouteForm from './components/RouteForm'

const env = require("../.env")



const layerStyle = {
  id: 'route-layer',
  type: 'line',
  paint: {
    'line-color': 'rgba(0, 124, 191, 0.6)',
    'line-width': 8,


  }
};

const mapRef = React.useRef();

export default function App() {
  const [viewport, setViewport] = React.useState();

    const [viewState, setViewState] = React.useState({
      bounds: [-7.57216793459, 49.8, 1.68153079591, 58.8]
    });

    
  return (
    <div>
      <>
      <MapProvider>
        <Map
        {...viewState}
        id="map"
        onMove={evt => setViewState(evt.viewState)}
        style={{width: "100vw", height: "100vh"}}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={env.mapbox_access_token}
      >
          <Source id="my-data" type="geojson" data={route}>
            <Layer {...layerStyle} />
          </Source>
        </Map>
        <RouteForm setRoute={setRoute} />
      </MapProvider>
      </>
    </div>
  );
}
