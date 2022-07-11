import React from 'react';
import { callHereApi } from '../services/here_API.js';
import { callGeocodingApi } from '../services/geocoding_API.js'

export default function RouteForm() {

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event.target.origin.value)
    var origin = await callGeocodingApi(event.target.origin.value)
    var destination = await callGeocodingApi(event.target.destination.value)
    await callHereApi(origin, destination);
    console.log(`EV Routing API called`);
  }

  return (
    <>
    <form onSubmit={handleSubmit} className="route-form">
      <label for="origin">Origin</label>
      <input type="text" name="origin" defaultValue="" placeholder="Enter your origin"></input>
      <label for="destination">Destination</label>
      <input type="text" name="destination" defaultValue="" placeholder="Enter your destination"></input>
      <input type="submit" value="submit"></input>
    </form>
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