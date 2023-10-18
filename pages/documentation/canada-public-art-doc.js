import React from 'react'
import Layout from '../../components/main/Layout'
import styles from '../../styles/Datastories.module.css'
import CodeBlock from '../../components/main/CodeBlock'

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
}`

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
}`

const CanadaPublicArtDocumentation = () => {
  return (
    <>
      <Layout>
        <div className={styles.datastorycontainer}>
          <h1 className={styles.title}>Documentation of Canada Public Art</h1>
          <p className={styles.paragraph}>
            Some details about the code structure for this type of
            visualizations
          </p>
          <h1 className={styles.thirdtitle}>Global structure</h1>
          <p className={styles.paragraph}>
            For each city, the visualization shows <b>three main items.</b>
          </p>

          <CodeBlock
            code={`
<DataViz>
</Histogram> #The bar chart showing the years
</MapContainer> #The map with public art locations
</Context> # The info box showing for specific years
</DataViz>
`}
          />

          <h1 className={styles.thirdtitle}>
            How to add context to the visualization ?
          </h1>

          <p className={styles.paragraph}>
            For each year where many public art were installed, I tried to find
            an event or an explanation. When it was relevent I add the year and
            its context in a JSON file.
          </p>

          <CodeBlock code={contextVancouver} language="json" />

          <h1 className={styles.thirdtitle}>Libraries</h1>

          <CodeBlock
            code={`
- react #Used in every components
- recharts #Used for histogram
- react-leaflet #Used for the map
`}
          />

          <h1 className={styles.thirdtitle}>Data extract</h1>

          <CodeBlock code={dataVancouver} language="json" />
        </div>
      </Layout>
    </>
  )
}

export default CanadaPublicArtDocumentation
