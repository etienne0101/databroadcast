import React from 'react'
import dynamic from 'next/dynamic'
import Layout from '../../../components/main/Layout'
import styles from '../../../styles/Datastories.module.css'
import DataViz from '../../../components/nav/DataViz'

const Locations = dynamic(
  () => import('../../../components/viz/drug-policies/siv/locations'),
  { ssr: false }
)

const LocationsCountries = dynamic(
  () => import('../../../components/viz/drug-policies/siv/locations-countries'),
  { ssr: false }
)

const DrugPolicies = () => {
  return (
    <>
      <Layout>
        <div className={styles.datastorycontainer}>
          <h1 className={styles.title}>
            The Inequal Distribution of Supervised Injection Facilities
          </h1>
          <DataViz
            title="Supervised injection facilities accross the world"
            description="Number of facilities per city"
            dataLink="/documentation/drug-policies/siv-data"
          >
            <Locations />
          </DataViz>
          <DataViz
            title="Countries ranking"
            description="Number of facilities"
            dataLink="/documentation/drug-policies/siv-data"
          >
            <LocationsCountries />
          </DataViz>
        </div>
      </Layout>
    </>
  )
}

export default DrugPolicies
