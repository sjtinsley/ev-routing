import React from 'react';
import { RouteForm } from './RouteForm';

export const Container = (props) => {
  return (
    <div className="direction-container">
  
      <RouteForm method="POST" action="/getevroute" />

    </div>
  )
}