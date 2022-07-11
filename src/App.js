import React, { useRef, useEffect, useState } from 'react';
import { Container } from './components/Container'
import Map from './components/Map'



export default function App() {
  // const mapContainer = useRef(null);
  // const map = useRef(null);
  // const [lng, setLng] = useState(0);
  // const [lat, setLat] = useState(51.476853);
  // const [zoom, setZoom] = useState(14);
  
  // useEffect(() => {
  //   if (map.current) return; // initialize map only once
  //   map.current = new mapboxgl.Map({
  //   container: mapContainer.current,
  //   style: 'mapbox://styles/mapbox/streets-v11',
  //   center: [lng, lat],
  //   zoom: zoom
  //   });
  // });

  return (map
    <div>
      <>
      <Map />
      <Container />
      </>
    </div>
  );
}
