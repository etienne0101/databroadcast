import React, { useState, useEffect } from 'react'

const SearchComponent = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Charger les pays au démarrage
    fetch('/api/druguseyouth-countries?action=listcountries')
      .then((response) => response.json())
      .then((data) => setCountries(data))
  }, [])

  // Filtrer les pays basés sur la saisie
  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <input
        type="text"
        placeholder="Search a country"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <ul>
          {filteredCountries.map((country, index) => (
            <li key={index}>{country}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchComponent
