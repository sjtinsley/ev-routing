import React, { useRef, useEffect, useState } from 'react';
import { Container } from './components/Container'
import Map from './components/Map'



export default function App() {
  return (
    <div>
      <>
      <Map />
      <Container />
      </>
    </div>
  );
}
