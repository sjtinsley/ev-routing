import React, { useState } from 'react';

export default function RouteResults(props) {
  ;

  const handleClick = () => {
    props.setResultsVisible(false);
    props.setInputVisible(true);
  }

  const parsePOI = (poi) => { 
    return '<div class="poi"><div class="poi-name">' + poi[0].name + '</div><div class="poi-rating">Rating: ' + (poi[0].rating == null ? 'No rating' : poi[0].rating + '/5') + '</div></div>'
  }

  const parseChunksPOI = (chunks) => { 
    var html = []
    for(var i = 0; i < chunks.length; i++) {
      html += '<div class="stop-group"><div class="stop-title">Things To Do At Stop ' + (i+1) + '</div>'
      for(var j = 0; j < 20; j++) {
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

  var poihtml = parseChunksPOI(chunkPois(props.chargingPlaces, 20))

  return (
    <>
    <div className="container">
      <div className="trip-details">
        <div className="trip-header">Trip summary</div>
        <div className="duration">Duration: {props.duration} minutes</div>
        <div className="distance">Distance: {props.distance} miles</div>
        <div className="stop-count">Stops: {chunkPois(props.chargingPlaces, 20).length}</div>
        <button onClick={handleClick}>Enter another route</button>
        </div>
      <div className="places-container" dangerouslySetInnerHTML={{__html: poihtml}}></div>
      


      
      </div>
    </>
  )
}
