const env = require("../../.env")

export const callHereApi = async (origin, destination, vehicle="Mercedes_Benz_eVito", startCharge=0.65) => {
  const geoJSONS = [];

  const vehicleTable = [
    {make_model: "Audi_e_tron_55", max_charge: 95},
    {make_model: "BMW_i3", max_charge: 27.2},
    {make_model: "BMW_i3s", max_charge: 27.2},
    {make_model: "CITROËN_Berlingo_Electric", max_charge: 22.5},
    {make_model: "CITROËN_C_ZERO", max_charge: 14.5},
    {make_model: "e.Go_Life_20", max_charge: 14.9},
    {make_model: "e.Go_Life_40", max_charge: 17.9},
    {make_model: "e.Go_Life_60", max_charge: 23.9},
    {make_model: "Ford_Focus_Electric", max_charge: 33.5},
    {make_model: "Hyundai_Kona_Elektro", max_charge: 64},
    {make_model: "Hyundai_IONIQ_Elektro", max_charge: 28},
    {make_model: "Jaguar_I_PACE", max_charge: 90},
    {make_model: "Kia_Soul_EV", max_charge: 30},
    {make_model: "Kia_e_Niro", max_charge: 64},
    {make_model: "Mercedes_Benz_B_Klasse_Sports_Tourer_B_250_e", max_charge: 28},
    {make_model: "Mercedes_Benz_EQC", max_charge: 80},
    {make_model: "Mercedes_Benz_eVito", max_charge: 41.4},
    {make_model: "Mitsubishi_i_MiEV", max_charge: 16},
    {make_model: "NISSAN_Leaf", max_charge: 30},
    {make_model: "NISSAN_Leaf_ZE1", max_charge: 40},
    {make_model: "NISSAN_e_NV200_EVALIA", max_charge: 24},
    {make_model: "NISSAN_Ampera_e", max_charge: 60},
    {make_model: "Peugeot_iOn", max_charge: 14.5},
    {make_model: "Peugeot_Partner_Electric", max_charge: 22.5},
    {make_model: "Renault_Fluence_Z.E.", max_charge: 22},
    {make_model: "Renault_Kangoo_Z.E._33", max_charge: 33},
    {make_model: "Renault_ZOE_R240", max_charge: 22},
    {make_model: "Renault_ZOE_R90", max_charge: 41},
    {make_model: "Renault_ZOE_Q90", max_charge: 41},
    {make_model: "smart_EQ_cabrio_electric_drive", max_charge: 17.6},
    {make_model: "smart_EQ_forfour_electric_drive", max_charge: 17.6},
    {make_model: "smart_Work_L", max_charge: 40},
    {make_model: "Tesla_Model_S_70D", max_charge: 70},
    {make_model: "Tesla_Model_S_75D", max_charge: 75},
    {make_model: "Tesla_Model_S_90D", max_charge: 90},
    {make_model: "Tesla_Model_S_100D", max_charge: 100},
    {make_model: "Tesla_Model_S_P100D", max_charge: 100},
    {make_model: "Tesla_Model_X_75D", max_charge: 75},
    {make_model: "Tesla_Model_X_90D", max_charge: 90},
    {make_model: "Tesla_Model_X_100D", max_charge: 100},
    {make_model: "Tesla_Model_X_P100D", max_charge: 100},
    {make_model: "Tesla_Model_3", max_charge: 75},
    {make_model: "Volkswagen_e_up!", max_charge: 18.7},
    {make_model: "Volkswagen_e_Golf", max_charge: 35.8},
    {make_model: "Volkswagen_e_Crafter", max_charge: 35.8},
    {make_model: "Volvo_C30_Electric", max_charge: 24}
  ]
    
  const car =  vehicleTable.find(veh => veh.make_model === vehicle);

  const curveMaxValue = ((car.max_charge)*0.85) > 80 ? ((car.max_charge)*0.85) : 80;

  const url = `https://router.hereapi.com/v8/routes?apiKey=${env.here_api_key}&departureTime=any&origin=${origin}&ev[connectorTypes]=iec62196Type2Combo&transportMode=car&destination=${destination}
&return=summary&ev[freeFlowSpeedTable]=0,0.239,27,0.239,45,0.259,60,0.196,75,0.207,90,0.238,100,0.26,110,0.296,120,0.337,130,0.351,250,0.351
&ev[trafficSpeedTable]=0,0.349,27,0.319,45,0.329,60,0.266,75,0.287,90,0.318,100,0.33,110,0.335,120,0.35,130,0.36,250,0.36&ev[auxiliaryConsumption]=1.8
&ev[ascent]=9&ev[descent]=4.3&ev[makeReachable]=true&ev[initialCharge]=${(car.max_charge)*startCharge}&ev[maxCharge]=${car.max_charge}&ev[chargingCurve]=0,239,32,199,56,167,60,130,64,111,68,83,72,55,76,33,78,17,${curveMaxValue},1
&ev[maxChargeAfterChargingStation]=${(car.max_charge)*0.85}`;
  
  const response = await fetch(url, {
    method: "GET",
  })
  const body = await response.json()
  geoJSONS.push(`${body.routes[0].sections[0].departure.place.location.lng}%2C${body.routes[0].sections[0].departure.place.location.lat}`);
  body.routes[0].sections.forEach((section) => {
    geoJSONS.push(`${section.arrival.place.location.lng}%2C${section.arrival.place.location.lat}`)
  })
  // console.log(geoJSONS.join('%3B'));
  return geoJSONS.join('%3B');
  };