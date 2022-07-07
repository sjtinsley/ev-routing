import React from 'react';

export const RouteForm = (props) => {
  return (
    <>
    <form onSubmit={handleSubmit} className="route-form">
      <label for="origin">Origin</label>
      <input type="text" defaultValue="" placeholder="Enter your origin"></input>
      <label for="destination">Destination</label>
      <input type="text" defaultValue="" placeholder="Enter your destination"></input>
      <input type="submit" value="submit"></input>
    </form>
    </>
  )
}

