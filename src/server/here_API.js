const env = require("../../.env")

class HereApi {

  constructor() {
    this.geoJSONS = [];
  }

  callApi = (origin, destination) => {
    const url = `https://router.hereapi.com/v8/routes?departureTime=any&origin=${origin}&ev[connectorTypes]=iec62196Type2Combo&transportMode=car&destination=${destination}&return=polyline&ev[freeFlowSpeedTable]=0,0.239,27,0.239,45,0.259,60,0.196,75,0.207,90,0.238,100,0.26,110,0.296,120,0.337,130,0.351,250,0.351&ev[trafficSpeedTable]=0,0.349,27,0.319,45,0.329,60,0.266,75,0.287,90,0.318,100,0.33,110,0.335,120,0.35,130,0.36,250,0.36&ev[auxiliaryConsumption]=1.8&ev[ascent]=9&ev[descent]=4.3&ev[makeReachable]=true&ev[initialCharge]=48&ev[maxCharge]=80&ev[chargingCurve]=0,239,32,199,56,167,60,130,64,111,68,83,72,55,76,33,78,17,80,1&ev[maxChargeAfterChargingStation]=72`;
    
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${env.here_bearer_token}`
      }
    }).then(response => {
      return response.json()
    }).then(body => {
    this.geoJSONS.push(`{ "type": "Point", "coordinates": [${body.routes[0].sections[0].departure.place.location.lng}, ${body.routes[0].sections[0].departure.place.location.lat}]`);
    body.routes[0].sections.forEach((section) => {
      this.geoJSONS.push(`{ "type": "Point", "coordinates": [${section.arrival.place.location.lng}, ${section.arrival.place.location.lat}] }`)
    })
    console.log(this.geoJSONS);
    });
  };
};

module.exports = HereApi;

// api = new HereApi();
// api.callApi("52.61652854235981,0.4018294437272572","51.53664224870411,-0.3486194602017892");

