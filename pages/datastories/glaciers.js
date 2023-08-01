import React from 'react';
import dynamic from 'next/dynamic';
import DataViz from '../../components/nav/Dataviz';

const MapGlaciers = dynamic(
  () => import('../../components/viz/glaciers/GlaciersMap'), 
  { ssr: false }  
);

const GlaciersPage = () => {
  return (
    <DataViz title="Glaciers" description="A map visualization of glaciers">
      <MapGlaciers />
    </DataViz>
  );
}

export default GlaciersPage;
