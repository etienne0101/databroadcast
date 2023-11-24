import React from 'react'
import dynamic from 'next/dynamic'
import Layout from '../../../components/main/Layout'
import styles from '../../../styles/Datastories.module.css'
import DataViz from '../../../components/nav/DataViz'

const YouthUse = dynamic(
  () => import('../../../components/viz/drug-policies/use/youthuse'),
  { ssr: false }
)

const DrugPolicies = () => {
  return (
    <>
      <Layout>
        <div className={styles.datastorycontainer}>
          <h1 className={styles.title}>International cooperation failure, useless drug use datasets</h1>
          <h2 className={styles.subtitle}>Standards failure</h2>
          <p className={styles.paragraph}>
          On the next dataset, only 2 countries (USA, UK) provide convincing data on several substance use, and for a long period. Other countries seem to lack constant methods and sufficient data.
          </p>
          <DataViz
            title="United Nations - Evolution of drug use among young people"
            description="Countries are ordered by data quantity provided, then substance are ordered the same way for each country"
            dataLink="/documentation/drug-policies/siv-data"
          >
            <YouthUse />
          </DataViz>
        </div>
      </Layout>
    </>
  )
}

export default DrugPolicies
