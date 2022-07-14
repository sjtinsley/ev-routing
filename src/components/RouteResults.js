import React, { useState } from 'react';

export default function RouteResults(props) {
  ;

  const handleClick = () => {
    props.setResultsVisible(false);
    props.setInputVisible(true);
  }

  const parsePOI = (poi) => { 
    return '<div className="poi"><div className="poi-name">' + poi[0].name + '</div><div className="poi-rating">' + (poi[0].rating == null ? 'No rating' : poi[0].rating) + '</div></div>'
  }

  const parseChunksPOI = (chunks) => { 
    var html = []
    for(var i = 0; i < chunks.length; i++) {
      html += '<div className="stop-group">Stop ' + (i+1)
      for(var j = 0; j < 20; j++) {
        // console.log(chunks[i][j])
        html += parsePOI(chunks[i][j])
      }
      html += '</div>'
    } 
    return html  
  }

  const chunkPois = (pois, chunkSize) => {
    const poisByStop = []
    for(var i = 0; i < pois.length; i+= chunkSize){
      const chunk = pois.slice(i, i + chunkSize)
      poisByStop.push(chunk)    
    }
    return poisByStop
  }

  // console.log(chunkPois(props.chargingPlaces,20))


  // console.log(props.stopCoordinates)

  // const cleanStops = (stop) => {
  //   const stops = []
  //   stop.forEach((feature) => {
  //     stops.push(feature.geometry.coordinates)
  //   })
  //   return stops
  // }

  // const stopPoints = cleanStops(props.stopCoordinates.features).slice(1, -1)

  // for(var i = 0; i < stopPoints.length; i++) {
  //   eval('const stop' + (i+1) + '= []')
  //   // const stop0 = []
  // }

  //   for(var i = 0; i < stopPoints.length; i++) {
  //     props.chargingPlaces.forEach((poi) => {
  //       if (poi[0].location.lat - 0.015 > stopPoints[i][1] + 0.015 && poi[0].location.lng - 0.015 > stopPoints[i][0] + 0.015)
  //       eval('stop' + i + '.push(poi)')
  //     })
  // }

  // console.log(stop0)

  var poihtml = parseChunksPOI(chunkPois(props.chargingPlaces, 20))

  return (
    <>
    <div className="container">
      <div>These are the bloody results</div>
      <div>Duration: {props.duration} minutes</div>
      <div>Distance: {props.distance} miles</div>
      <div className="places-container" dangerouslySetInnerHTML={{__html: poihtml}}></div>
      

    <button onClick={handleClick}>Enter another route</button>

      
      </div>
    </>
  )
}
