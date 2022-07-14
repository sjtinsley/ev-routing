import React, { useState } from 'react';
import { getPOIs } from '../hooks/getPOIs.js';
import { getRoute } from '../hooks/getroute.js';
import { useMap } from 'react-map-gl'
import * as bbox from 'geojson-bbox'
import { getWayPoints } from '../hooks/getwaypoints.js';

export default function RouteForm(props) {

  const[origin, setOrigin] = useState();
  const[destination, setDestination] = useState();
  const[vehicle, setVehicle] = useState();
  const[chargeLevel, setChargeLevel] = useState();
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
    const herewaypoints = await getWayPoints(origin, destination, vehicle, chargeLevel)
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
        <select value={vehicle} onChange={e => setVehicle(e.target.value)}>
          <option value="Audi_e_tron_55">Audi e tron 55</option>
          <option value="BMW_i3">BMW i3</option>
          <option value="BMW_i3s">BMW i3s</option>
          <option value="CITROËN_Berlingo_Electric">CITROËN Berlingo Electric</option>
          <option value="CITROËN_C_ZERO">CITROËN C ZERO</option>
          <option value="e.Go_Life_20">e.Go Life 20</option>
          <option value="e.Go_Life_40">e.Go Life 40</option>
          <option value="e.Go_Life_60">e.Go Life 60</option>
          <option value="Ford_Focus_Electric">Ford Focus Electric</option>
          <option value="Hyundai_Kona_Elektro">Hyundai Kona Elektro</option>
          <option value="Hyundai_IONIQ_Elektro">Hyundai IONIQ Elektro</option>
          <option value="Jaguar_I_PACE">Jaguar I PACE</option>
          <option value="Kia_Soul_EV">Kia Soul EV</option>
          <option value="Kia_e_Niro">Kia e Niro</option>
          <option value="Kia_e_Niro">Kia e Niro</option>
          <option value="Mercedes_Benz_B_Klasse_Sports_Tourer_B_250_e">Mercedes Benz B Klasse Sports Tourer B 250 e</option>
          <option value="Mercedes_Benz_EQC">Mercedes Benz EQC</option>
          <option value="Mercedes_Benz_eVito">Mercedes Benz eVito</option>
          <option value="Mitsubishi_i_MiEV">Mitsubishi i MiEV</option>
          <option value="NISSAN_Leaf">NISSAN Leaf</option>
          <option value="NISSAN_Leaf_ZE1">NISSAN Leaf ZE1</option>
          <option value="NISSAN_e_NV200_EVALIA">NISSAN e NV200 EVALIA</option>
          <option value="NISSAN_Ampera_e">NISSAN Ampera e</option>
          <option value="Peugeot_iOn">Peugeot iOn</option>
          <option value="Peugeot_Partner_Electric">Peugeot Partner Electric</option>
          <option value="Renault_Fluence_Z.E.">Renault Fluence Z.E.</option>
          <option value="Renault_Kangoo_Z.E._33">Renault Kangoo Z.E. 33</option>
          <option value="Renault_Twizy_80">Renault Twizy 80</option>
          <option value="Renault_ZOE_R240">Renault ZOE R240</option>
          <option value="Renault_ZOE_R90">Renault ZOE R90</option>
          <option value="Renault_ZOE_Q90">Renault ZOE Q90</option>
          <option value="smart_EQ_fortwo_electric_drive">smart EQ fortwo electric drive</option>
          <option value="smart_EQ_cabrio_electric_drive">smart EQ cabrio electric drive</option>
          <option value="smart_EQ_forfour_electric_drive">smart EQ forfour electric drive</option>
          <option value="smart_Work_L">smart Work L</option>
          <option value="Tesla_Model_S_70D">Tesla Model S 70D</option>
          <option value="Tesla_Model_S_75D">Tesla Model S 75D</option>
          <option value="Tesla_Model_S_90D">Tesla Model S 90D</option>
          <option value="Tesla_Model_S_100D">Tesla Model S 100D</option>
          <option value="Tesla_Model_S_P100D">Tesla Model S P100D</option>
          <option value="Tesla_Model_X_75D">Tesla Model X 75D</option>
          <option value="Tesla_Model_X_90D">Tesla Model X 90D</option>
          <option value="Tesla_Model_X_100D">Tesla Model X 100D</option>
          <option value="Tesla_Model_X_P100D">Tesla Model X P100D</option>
          <option value="Tesla_Model_3">Tesla Model 3</option>
          <option value="Volkswagen_e_up!">Volkswagen e up!</option>
          <option value="Volkswagen_e_Golf">Volkswagen e Golf</option>
          <option value="Volkswagen_Golf_GTE">Volkswagen Golf GTE</option>
          <option value="Volkswagen_e_Crafter">Volkswagen e Crafter</option>
          <option value="Volvo_C30_Electric">Volvo C30 Electric</option>
        </select><label htmlFor="chargeLevel">Current charge percentage</label>
        <input type="number" min="1" max="100" name="chargeLevel" value={chargeLevel} onChange={e => setChargeLevel(e.target.value)} placeholder="What's the charge %?"></input><br></br><br></br>
        <input type="submit" value="Let's go!"></input>
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