import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '../../components/main/Layout';
import DataViz from '../../components/nav/DataViz';
import artDataVancouver from '../../data/canada-public-art/vancouver.json';
import artDataToronto from '../../data/canada-public-art/toronto.json'; 
import styles from '../../styles/Datastories.module.css';
import CodeBlock from '../../components/main/CodeBlock';

const VancouverArtMap = dynamic(
  () => import('../../components/viz/canada-public-art/VancouverArtMap'), 
  { ssr: false }  
);

const TorontoArtMap = dynamic(
  () => import('../../components/viz/canada-public-art/TorontoArtMap'), 
  { ssr: false }  
);

const CanadaPublicArt = () => {
  return (
    <>
      <Layout>
        <h1 className={styles.title}>Public Art in Canadian cities</h1>
        <p className={styles.paragraph}>
          Here are some visualizations to see where and when public art was installed in some Canadian cities. 
        </p>

          <p className={styles.hint}>
          You can chose a year and see what was installed in the city. 
          </p>

          <p className={styles.paragraph}>
          Sometimes, <strong>special events held and more public art came to the light.</strong>
        </p>

        <DataViz
          title="Vancouver"
          description="Public art in Vancouver according to year of installation"
          dataLink="https://opendata.vancouver.ca/explore/dataset/public-art/information/"
        >
          <VancouverArtMap data={artDataVancouver} />
        </DataViz>

        <DataViz
          title="Toronto"
          description="Public art in Toronto according to year of installation"
          dataLink="#YOUR-TORONTO-DATA-LINK"
        >
          <TorontoArtMap data={artDataToronto} />
        </DataViz>

<CodeBlock code={`
  #Markdown example
  
  Here it is
`}/>

      </Layout>
    </>
  );
}

export default CanadaPublicArt;
