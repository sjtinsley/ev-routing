import React, { useRef, useEffect, useState } from 'react';
const env = require("../../.env")
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = env.mapbox_access_token;
 
 export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(51.476853);
  const [zoom, setZoom] = useState(14);
  
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng, lat],
    zoom: zoom
    });
  });

  return  (
    <div ref={mapContainer} className="map-container" />
  )
 };
 
