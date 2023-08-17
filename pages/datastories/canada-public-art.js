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

const contextVancouver = `
{
  "data": [
    {
      "year": "1986",
      "context_title": "Expo 86",
      "context_description": "The 1986 World Exposition on Transportation and Communication was held in Vancouver",
      "context_url":"https://en.wikipedia.org/wiki/Expo_86"
    },
    {
      "year": "2010",
      "context_title": "2010 Winter Olympics",
      "context_description": "The 2010 Winter Olympics held from February 12 to 28, 2010 in Vancouver",
      "context_url":"https://en.wikipedia.org/wiki/2010_Winter_Olympics"
    },
    {
      "year":"2016",
      "context_title":"Vancouver Mural Festival",
      "context_description":"VMF was formed in 2016 with a vision to transform the way art is experienced in Vancouver",
      "context_url":"https://vanmuralfest.ca/about"
    }
  ]
}`;

const dataVancouver = `
{
  "data": [
  {
    "Source": "Public Art & Monuments Collection - City-Owned",
    "Source_ID": "596",
    "Title": "Alexander the Great",
    "ImageURL": "https://www.toronto.ca/ext/pln/publicart/alexanderthegreat.jpg",
    "YEAR_INSTALLED": "1990",
    "geometry": "{'type': 'MultiPoint', 'coordinates': [[-79.349666, 43.677967]]}"
  }
]
}`;


const CanadaPublicArt = () => {
  return (
    <>
      <Layout>
        <div className={styles.datastorycontainer}>
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

        <h1 className={styles.subtitle}>Code documentation</h1>
        <p className={styles.paragraph}>
          Some details about the code structure for this type of visualizations
        </p>
        <h1 className={styles.thirdtitle}>Global structure</h1>
        <p className={styles.paragraph}>
          For each city, the visualization shows <b>three main items.</b>
        </p>


<CodeBlock code={`
  <DataViz>
    </Histogram> #The bar chart showing the years
    </MapContainer> #The map with public art locations
    </Context> # The info box showing for specific years
  </DataViz>
`}/>

        <h1 className={styles.thirdtitle}>How to add context to the visualization ?</h1>

        <p className={styles.paragraph}>
          For each year where many public art were installed, I tried to find an event or an explanation. When it was relevent I add the year and its context in a JSON file.
        </p>

        <CodeBlock code={contextVancouver} language="json" />

        <h1 className={styles.thirdtitle}>Libraries</h1>

        <CodeBlock code={`
- react #Used in every components
- recharts #Used for histogram
- react-leaflet #Used for the map
`}/>

        <h1 className={styles.thirdtitle}>Data extract</h1>

<CodeBlock code={dataVancouver} language="json" />

      </div>
      </Layout>
    </>
  );
}

export default CanadaPublicArt;
