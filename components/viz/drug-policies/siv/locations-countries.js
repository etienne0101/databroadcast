import React, { useState } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'
import data from '../../../../data/drug-policies/siv/locations.json'
import populationData from '../../../../data/drug-policies/siv/countries-population.json'
import styles from '../../../../styles/datastories/DrugPolicies.module.css'

// Create a function to sum facilities by country
const sumByCountry = (data, perMillion = false) => {
  const summedData = {}

  data.forEach((item) => {
    if (summedData[item.Country]) {
      summedData[item.Country] += item['Number of facilities']
    } else {
      summedData[item.Country] = item['Number of facilities']
    }
  })

  let summedArray = Object.keys(summedData).map((country) => ({
    Country: country,
    'Number of facilities': summedData[country]
  }))

  if (perMillion) {
    summedArray = summedArray.map((entry) => {
      const popData = populationData.find((p) => p.country === entry.Country)
      const population = popData ? popData.population : 1
      return {
        ...entry,
        'Facilities per million':
          (entry['Number of facilities'] / population) * 1e6
      }
    })
  }
  return summedArray.sort((a, b) => {
    if (perMillion) {
      return b['Facilities per million'] - a['Facilities per million']
    }
    return b['Number of facilities'] - a['Number of facilities']
  })
}

const FacilitiesByCountry = () => {
  const [perMillion, setPerMillion] = useState(false)
  const summedData = sumByCountry(data, perMillion)

  const togglePerMillion = () => {
    setPerMillion(!perMillion)
  }

  return (
    <>
      <button className={styles['toggle-button']} onClick={togglePerMillion}>
        {perMillion ? 'By countries' : 'For 1 million inhabitants'}
      </button>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={summedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Country" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey={
              perMillion ? 'Facilities per million' : 'Number of facilities'
            }
            fill="#5c677d"
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default FacilitiesByCountry
