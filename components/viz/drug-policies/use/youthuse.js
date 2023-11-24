import React, { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'
import styles from './../../../../styles/datastories/DrugPolicies.module.css'

const DrugUseChart = () => {
  const [countries, setCountries] = useState([])
  const [substances, setSubstances] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedSubstance, setSelectedSubstance] = useState('')
  const [consumptionType, setConsumptionType] = useState('Lifetime')
  const [data, setData] = useState([])

  const sortSubstancesByCountry = (countryData, country) => {
    let substances = countryData[country]
    return substances
      ? Object.keys(substances).sort((a, b) => {
          return substances[b] - substances[a]
        })
      : []
  }

  useEffect(() => {
    import(
      '../../../../data/drug-policies/use/sorted_substance_counts_by_country.json'
    ).then((countryData) => {
      if (selectedCountry) {
        const sortedSubstances = sortSubstancesByCountry(
          countryData,
          selectedCountry
        )
        setSubstances(sortedSubstances)
      } else {
        setSubstances([])
      }
    })
  }, [selectedCountry])

  useEffect(() => {
    // Charger les pays et les substances depuis l'API
    fetch('/api/druguseyouth-lists?action=listcountries')
      .then((response) => response.json())
      .then((countriesData) => {
        // Importer les données de tri et les appliquer
        import(
          '../../../../data/drug-policies/use/sorted_countries_by_records.json'
        ).then((sortedData) => {
          const sortedCountries = countriesData.sort((a, b) => {
            return (sortedData[b] || 0) - (sortedData[a] || 0)
          })
          setCountries(sortedCountries)
        })
      })

    fetch('/api/druguseyouth-lists?action=listsubstances')
      .then((response) => response.json())
      .then((data) => setSubstances(data))
  }, [])

  useEffect(() => {
    let initialData = {}
    for (let year = 1991; year <= 2023; year++) {
      initialData[year] = { 'Year of Estimate': year.toString(), Value: null }
    }

    if (selectedCountry && selectedSubstance && consumptionType) {
      fetch(
        `/api/druguseyouth?country=${selectedCountry}&substance=${selectedSubstance}&useperiod=${consumptionType}`
      )
        .then((response) => response.json())
        .then((responseData) => {
          Object.keys(responseData).forEach((year) => {
            if (initialData.hasOwnProperty(year)) {
              let value = responseData[year]
              let numericValue =
                typeof value === 'string'
                  ? parseFloat(value.replace(',', '.'))
                  : value
              initialData[year].Value = numericValue
            }
          })

          setData(Object.values(initialData))
        })
    }
  }, [selectedCountry, selectedSubstance, consumptionType])

  return (
    <div style={{ display: 'block', justifyContent:'center', marginLeft: 'auto', marginRight: 'auto' }} >
    <select
      style={{ marginLeft: '1rem', marginBottom: '1rem' }}
      value={selectedCountry}
      onChange={(e) => setSelectedCountry(e.target.value)}
    >
      <option value="">Select Country</option>
      {countries.map((country) => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </select>

      <div>
        {selectedCountry &&
          substances.map((substance) => (
            <button
              key={substance}
              onClick={() => setSelectedSubstance(substance)}
              className={`${styles['substance-button']} ${
                selectedSubstance === substance ? styles['selected'] : ''
              }`}
            >
              {substance}
            </button>
          ))}
      </div>

      <div onChange={(e) => setConsumptionType(e.target.value)}>
        <input
          type="radio"
          value="Lifetime"
          name="consumptionType"
          defaultChecked
          style={{ marginLeft: '1rem', marginTop: '1rem' }}
        />{' '}
        Lifetime
        <input type="radio" value="Past Year" name="consumptionType" style={{ marginLeft: '1rem' }} /> Past
        Year
        <input type="radio" value="Past Month" name="consumptionType" style={{ marginLeft: '1rem' }}/> Past Month
      </div>

      {selectedCountry && selectedSubstance && data.length > 0 && (
        <LineChart
          width={1000}
          height={500}
          data={data}
          margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Year of Estimate" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Value"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            connectNulls // Ajoute ceci
          />
        </LineChart>
      )}
    </div>
  )
}

export default DrugUseChart
