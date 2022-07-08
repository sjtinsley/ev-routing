const env = require("../../.env")

export const callHereApi = async (formData) => {
  const geoJSONS = [];

  console.log(formData.origin.value)
  console.log(formData.destination.value)
  console.log(env.here_bearer_token)

  const url = `https://router.hereapi.com/v8/routes?departureTime=any&origin=${formData.origin.value}&ev[connectorTypes]=iec62196Type2Combo&transportMode=car&destination=${formData.destination.value}&return=polyline&ev[freeFlowSpeedTable]=0,0.239,27,0.239,45,0.259,60,0.196,75,0.207,90,0.238,100,0.26,110,0.296,120,0.337,130,0.351,250,0.351&ev[trafficSpeedTable]=0,0.349,27,0.319,45,0.329,60,0.266,75,0.287,90,0.318,100,0.33,110,0.335,120,0.35,130,0.36,250,0.36&ev[auxiliaryConsumption]=1.8&ev[ascent]=9&ev[descent]=4.3&ev[makeReachable]=true&ev[initialCharge]=48&ev[maxCharge]=80&ev[chargingCurve]=0,239,32,199,56,167,60,130,64,111,68,83,72,55,76,33,78,17,80,1&ev[maxChargeAfterChargingStation]=72`;
  
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${env.here_bearer_token}`
    }
  }).then(response => {
    return response.json()
  }).then(body => {
  body.routes[0].sections.forEach((section) => {
    geoJSONS.push(`{ "type": "Point", "coordinates": [${section.arrival.place.location.lng}, ${section.arrival.place.location.lat}] }`)
  })
  return(geoJSONS);
  });
};

// api = new HereApi();
// api.callApi("52.61652854235981,0.4018294437272572","51.53664224870411,-0.3486194602017892");

// export const register = async (formData) => {
//   try {
//     const response = await fetch('https://chitter-backend-api-v2.herokuapp.com/users', {
//       headers: {'Content-Type': 'application/json'},
//       method: "POST",
//       body: JSON.stringify({
//         user: {
//           handle: formData.handle.value,
//           password: formData.password.value
//         }
//       })
//     });
//     if(response.ok) {
//       const data = await response.json();
//       return data;
//     } throw new Error('Request failed');
//   } catch (error) {
//     console.log(error);
//   }
// };