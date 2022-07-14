import React, { useState } from 'react';
import { getPOIs } from '../hooks/getPOIs.js';
import { getRoute } from '../hooks/getroute.js';
import { useMap } from 'react-map-gl'
import * as bbox from 'geojson-bbox'
import { getWayPoints } from '../hooks/getwaypoints.js';

export default function RouteForm(props) {

  const[origin, setOrigin] = useState();
  const[destination, setDestination] = useState();
  const {myMap} = useMap();

  const cleanWaypoints = (waypoints) => {
    const waypointCoordinates = []
    const coordinateSize = 2

    var waypointSource = {
      type: 'FeatureCollection',
      features: []
    };
    const cleanWaypoints = waypoints.replaceAll("%2C", ",").replaceAll("%3B",",")
    const waypointNumbers = cleanWaypoints.split(",")
    for (var i = 0; i<waypointNumbers.length; i++){
      waypointNumbers[i] = parseFloat(waypointNumbers[i]);
    }
    for(var i = 0; i< waypointNumbers.length; i+= coordinateSize){
      const chunk = waypointNumbers.slice(i, i + coordinateSize)
      waypointCoordinates.push(chunk)    
    }
    for (var i = 0; i<waypointCoordinates.length; i++){
      waypointSource.features[i] = createWaypointFeature(waypointCoordinates[i]);
    }
    return waypointSource
  }

  const createWaypointFeature = (coordinates) => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: coordinates
      }
    }
  }

  const setProps = (routeline, routepoints) => {
    props.setRoute(routeline);
    props.setWaypoints(routepoints);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const herewaypoints = await getWayPoints(origin, destination)
    const pois = await getPOIs(herewaypoints);
    const routegeojson = await getRoute(herewaypoints);
    const routewaypoints = cleanWaypoints(herewaypoints);
    setProps(routegeojson, routewaypoints);    
    // const routezoom = await bbox(routegeojson);
    // console.log(myMap)
    // myMap.current.fitBounds(
    //   [routezoom],
    //   {padding: 40, duration: 1000}
    // );
  };
  
  return (
    <>
    <div className="direction-container">
  
      <form onSubmit={handleSubmit} className="route-form">
        <label htmlFor="origin">Origin</label>
        <input type="text" name="origin" value={origin} onChange={e => setOrigin(e.target.value)} placeholder="Enter your origin"></input>
        <label htmlFor="destination">Destination</label>
        <input type="text" name="destination" value={destination} onChange={e => setDestination(e.target.value)} placeholder="Enter your destination"></input>
        <label htmlFor="vehicle">Choose your vehicle</label>

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