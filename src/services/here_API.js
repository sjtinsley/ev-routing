const env = require("../../.env")

export const callHereApi = async (origin, destination) => {
  const geoJSONS = [];

  console.log(origin)
  console.log(destination)

  const url = `https://router.hereapi.com/v8/routes?apiKey=${env.here_api_key}&departureTime=any&origin=${origin}&ev[connectorTypes]=iec62196Type2Combo&transportMode=car&destination=${destination}&return=polyline&ev[freeFlowSpeedTable]=0,0.239,27,0.239,45,0.259,60,0.196,75,0.207,90,0.238,100,0.26,110,0.296,120,0.337,130,0.351,250,0.351&ev[trafficSpeedTable]=0,0.349,27,0.319,45,0.329,60,0.266,75,0.287,90,0.318,100,0.33,110,0.335,120,0.35,130,0.36,250,0.36&ev[auxiliaryConsumption]=1.8&ev[ascent]=9&ev[descent]=4.3&ev[makeReachable]=true&ev[initialCharge]=48&ev[maxCharge]=80&ev[chargingCurve]=0,239,32,199,56,167,60,130,64,111,68,83,72,55,76,33,78,17,80,1&ev[maxChargeAfterChargingStation]=72`;
  
  const response = await fetch(url, {
    method: "GET",
  })
  const body = await response.json()
  geoJSONS.push(`${body.routes[0].sections[0].departure.place.location.lng}%2C${body.routes[0].sections[0].departure.place.location.lat}`);
  body.routes[0].sections.forEach((section) => {
    geoJSONS.push(`${section.arrival.place.location.lng}%2C${section.arrival.place.location.lat}`)
  })
  console.log(geoJSONS.join('%3B'));
  return geoJSONS.join('%3B');
  };