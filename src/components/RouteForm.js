import React, { useState } from 'react';
import { getPOIs } from '../hooks/getPOIs.js';
import { getRoute } from '../hooks/getroute.js';
import { useMap } from 'react-map-gl'
import * as bbox from 'geojson-bbox'
import { getWayPoints } from '../hooks/getwaypoints.js';

export default function RouteForm(props) {

  const[origin, setOrigin] = useState();
  const[destination, setDestination] = useState();
  const[chargingPlaces, setChargingPlaces] = useState();
  const[chargingMarkers, setChargingMarkers] = useState();
  // const[stopCoordinates, setStopCoordinates] = useState();


  const {myMap} = useMap();

  const cleanWaypoints = (waypoints) => {
    const waypointCoordinates = []
    const coordinateSize = 2
    const cleanerWaypoints = waypoints.replaceAll("%2C", ",").replaceAll("%3B",",")
    const waypointNumbers = cleanerWaypoints.split(",")
    for (var i = 0; i < waypointNumbers.length; i++){
      waypointNumbers[i] = parseFloat(waypointNumbers[i]);
    }
    for(var i = 0; i < waypointNumbers.length; i+= coordinateSize){
      const chunk = waypointNumbers.slice(i, i + coordinateSize)
      waypointCoordinates.push(chunk)    
    }
    return waypointCoordinates
  }

  const cleanPois = (pois) => {
    var cleanedPois = []
    for (var i = 0 ; i < pois.length; i++) {
      cleanedPois.push([pois[i][0].location.lng, pois[i][0].location.lat])
    }
    return cleanedPois
  }

  const createGeojsonPoint = (coordinates) => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: coordinates
      }
    }
  }

  const makeMapSource = (array) => {
    var mapSource = {
      type: 'FeatureCollection',
      features: []
    };
    for (var i = 0; i<array.length; i++){
      mapSource.features[i] = createGeojsonPoint(array[i]);
    } 
    return mapSource
  }
   

  const setProps = (routeLine, routePoints, routeDuration, routeDistance, pois, chargingLocations) => {
    props.setRoute(routeLine);
    props.setWaypoints(routePoints);
    props.setDuration(routeDuration)
    props.setDistance(routeDistance)
    props.setChargingPlaces(pois)
    props.setInputVisible(false)
    props.setResultsVisible(true)
    props.setChargingMarkers(chargingLocations)
    // props.setStopCoordinates(stopCoordinates)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const hereWaypoints = await getWayPoints(origin, destination)
    const pois = await getPOIs(hereWaypoints);
    const routeOutput = await getRoute(hereWaypoints);
    const routeGeojson = routeOutput.route
    const routeDuration = routeOutput.duration
    const routeDistance = routeOutput.distance
    const routeWaypoints = makeMapSource(cleanWaypoints(hereWaypoints));
    const chargingLocations = makeMapSource(cleanPois(pois))
    // const stopCoordinates = cleanWaypoints(hereWaypoints).slice(1, -1)
    setProps(routeGeojson, routeWaypoints, routeDuration, routeDistance, pois, chargingLocations);
    


    // const routezoom = await bbox(routegeojson);
    // console.log(myMap)
    // myMap.current.fitBounds(
    //   [routezoom],
    //   {padding: 40, duration: 1000}
    // );
  };
  
  return (
    <>
    <div className="container">
  
      <form onSubmit={handleSubmit} className="route-form">
        <label htmlFor="origin">Origin</label>
        <input type="text" name="origin" value={origin} onChange={e => setOrigin(e.target.value)} placeholder="Enter your origin"></input>
        <label htmlFor="destination">Destination</label>
        <input type="text" name="destination" value={destination} onChange={e => setDestination(e.target.value)} placeholder="Enter your destination"></input>
        <input type="submit" value="submit"></input>
      </form>
      </div>
    </>
  )
}

// function Register() {

//   const nav = useNavigate();

//   const handleRegister = async (event) => {
//     event.preventDefault();
//     await register(event.target);
//     console.log('User registered');
//     nav("/login");
//   }

//   return (
//     <div>
//       <h1>This is the registration page</h1>
//       <form onSubmit={handleRegister}>
//         <input type="text" name="handle" placeholder="Username"></input>
//         <input type="password" name="password" placeholder="Password"></input>
//         <button type="submit" value="register">Register</button>
//       </form>
//     </div>
//   );
// }

// export default Register;