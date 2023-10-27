import React from 'react'
import dynamic from 'next/dynamic'
import Layout from '../../components/main/Layout'
import styles from '../../styles/Datastories.module.css'
import DataViz from '../../components/nav/DataViz'

const Locations = dynamic(
  () => import('../../components/viz/drug-policies/siv/locations'),
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
          <DataViz
            title="Supervised injection sites"
            description="Number of SIV per city"
            dataLink="https://www.start.umd.edu/gtd/"
          >
            <Locations />
          </DataViz>
        </div>
      </Layout>
    </>
  )
}

export default DrugPolicies
