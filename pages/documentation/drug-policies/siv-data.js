import React from 'react'
import Layout from '../../../components/main/Layout'
import styles from '../../../styles/Datastories.module.css'

const GlobalTerrorismDocumentation = () => {
  return (
    <>
      <Layout>
        <div className={styles.datastorycontainer}>
          <h1 className={styles.title}>
            Data documentation : Supervised injection facilities
          </h1>
          <h1 className={styles.subtitle}>🌍 World (combined data)</h1>
          <p className={styles.paragraph}>
            I did not find any global dataset or any up to date document. So I
            combined data I found on offical government or governmental agencies
            websites. Then I made a minimalistic json dataset.
          </p>
          <a
            className={styles['data-link']}
            href="https://raw.githubusercontent.com/etienne0101/databroadcast/main/data/drug-policies/siv/locations.json"
            target="_blank"
            rel="noopener noreferrer"
          >
            📁 View Dataset
          </a>
          <h1 className={styles.subtitle}>🇪🇺 Europe</h1>
          <p className={styles.paragraph}>
            The data comes from the European Monitoring Centre for Drugs and
            Drug addiction
          </p>
          <a
            className={styles['data-link']}
            href="https://www.emcdda.europa.eu/media-library/infographic-location-and-number-drug-consumption-room-facilities-throughout-europe_en"
            target="_blank"
            rel="noopener noreferrer"
          >
            📁 View Data Source
          </a>
          <h1 className={styles.subtitle}>🇨🇦 Canada</h1>
          <p className={styles.paragraph}>
            The data comes from the Canadian government.
          </p>
          <a
            className={styles['data-link']}
            href="https://www.canada.ca/en/health-canada/services/substance-use/supervised-consumption-sites/status-application.html#wb-auto-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            📁 View Data Source
          </a>
        </div>
      </Layout>
    </>
  )
}

export default GlobalTerrorismDocumentation
