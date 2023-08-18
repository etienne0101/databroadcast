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

const GroupsMap = dynamic(() => import('../../components/viz/global-terrorism/GroupsMap'), { 
    ssr: false, // This will make sure it is only rendered on client side 
    loading: () => <p>Loading...</p>
  });

const GlobalTerrorism = () => {
  return (
    <>
    <Layout>
    <div className={styles.datastorycontainer}>
    <h1 className={styles.title}>Exploring the Global Terrorism DataBase</h1>
      <DataViz title="50 years of terrorist attacks" description="Distribution of attacks across time"  dataLink="https://www.start.umd.edu/gtd/">
        <TerrorismMap />
      </DataViz>
      <br></br>
      <DataViz title="Perpetrators groups along decades" description="What were the terrorist groups in different decades ?" dataLink="https://www.start.umd.edu/gtd">
        <GroupsMap />
      </DataViz>
    </div>
    </Layout>
    </>
  );
}

export default GlobalTerrorism;
