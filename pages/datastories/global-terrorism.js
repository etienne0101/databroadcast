import React from 'react';
import DataViz from '../../components/nav/DataViz';
import dynamic from 'next/dynamic';
import Layout from '../../components/main/Layout';
import styles from '../../styles/Datastories.module.css';

// Dynamic import the TerrorismMap component
const TerrorismMap = dynamic(() => import('../../components/viz/global-terrorism/TerrorismMap'), { 
  ssr: false, // This will make sure it is only rendered on client side 
  loading: () => <p>Loading...</p>
});

const GlobalTerrorism = () => {
  return (
    <>
    <Layout>
    <div className={styles.datastorycontainer}>
    <h1 className={styles.title}>Visualizing 50 years of terrorism</h1>
      <DataViz title="Title" description="Description">
        <TerrorismMap />
      </DataViz>
    </div>
    </Layout>
    </>
  );
}

export default GlobalTerrorism;
