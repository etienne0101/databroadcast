import React from 'react';
import dynamic from 'next/dynamic';
import DataViz from '../../components/nav/DataViz';

const MapGlaciers = dynamic(
  () => import('../../components/viz/glaciers/GlaciersMap'), 
  { ssr: false }  
);

const ChartAreaChange = dynamic(
  () => import('../../components/viz/glaciers/ChartAreaChange'), 
  { ssr: false }  
);

const GlaciersPage = () => {
  return (
    <>
      <DataViz title="Glaciers Map" description="A map visualization of glaciers">
        <MapGlaciers />
      </DataViz>
      <DataViz title="Glaciers Chart" description="A chart visualization of glaciers area change">
        <ChartAreaChange />
      </DataViz>
    </>
  );
}

export default GlaciersPage;
