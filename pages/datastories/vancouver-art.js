import React from 'react';
import dynamic from 'next/dynamic';
import DataViz from '../../components/nav/Dataviz';
import artData from '../../data/vancouver-art/public-art.json';

const ArtMap = dynamic(
  () => import('../../components/viz/vancouver-art/ArtMap'), 
  { ssr: false }  
);

const VancouverArt = () => {
  return (
    <>
      <DataViz title="Vancouver Art" description="A map visualization of art in Vancouver">
        <ArtMap data={artData} />
      </DataViz>
    </>
  );
}

export default VancouverArt;
