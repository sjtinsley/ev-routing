import React, { useState } from 'react';

export default function RouteResults(props) {
  ;

  const handleClick = () => {
    props.setResultsVisible(false);
    props.setInputVisible(true);
  }
  
  return (
    <>
    <div className="container">
      These are the bloody results
      Duration: {props.duration} minutes
      Distance: {props.distance} miles

    <button onClick={handleClick}>Enter another route</button>

      
      </div>
    </>
  )
}
