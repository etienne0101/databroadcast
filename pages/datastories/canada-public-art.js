import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '../../components/main/Layout';
import DataViz from '../../components/nav/Dataviz';
import artDataVancouver from '../../data/canada-public-art/vancouver.json';

const VancouverArtMap = dynamic(
  () => import('../../components/viz/canada-public-art/VancouverArtMap'), 
  { ssr: false }  
);

const CanadaPublicArt = () => {
  return (
    <>
    <Layout>
      <DataViz
        title="Public Art in Vancouver"
        description="Public art in Vancouver according to year of installation"
        dataLink="https://opendata.vancouver.ca/explore/dataset/public-art/information/"
      >
        <VancouverArtMap data={artDataVancouver} />
      </DataViz>
      </Layout>
    </>
  );
}

export default CanadaPublicArt;
