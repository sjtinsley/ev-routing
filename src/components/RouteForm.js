import React, { useState } from 'react';
import { getRoute } from '../hooks/getroute.js';

export default function RouteForm(props) {

  const[origin, setOrigin] = useState();
  const[destination, setDestination] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const routegeojson = await getRoute(origin, destination);
    props.setRoute(routegeojson);
  }

  return (
    <>
    <form onSubmit={handleSubmit} className="route-form">
      <label for="origin">Origin</label>
      <input type="text" name="origin" value={origin} onChange={e => setOrigin(e.target.value)} placeholder="Enter your origin"></input>
      <label for="destination">Destination</label>
      <input type="text" name="destination" value={destination} onChange={e => setDestination(e.target.value)} placeholder="Enter your destination"></input>
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