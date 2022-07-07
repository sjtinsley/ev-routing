const env = require("../../.env")

class directionsAPI {

  constructor() {
    this.geoJSON = null;
  }

  callApi = (string) => {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${string}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${env.mapbox_access_token}`;
    
    fetch(url, {
      method: "GET",
    }).then(response => {
      return response.json()
    }).then(body => {
    console.log(body);
    this.geoJSON = body;
    });
  };
};

module.exports = directionsAPI;

// api = new directionsAPI();
// api.callApi("-73.98866549245983%2C40.73152488986574%3B-73.98681711493084%2C40.733821006105444");
