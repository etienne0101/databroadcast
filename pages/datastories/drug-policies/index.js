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
            Lawmakers and Drug Statistics: The Art of Ignoring the Data
          </h1>
        </div>
      </Layout>
    </>
  )
}

export default DrugPolicies
