import React, { useState, useEffect } from 'react';

const DynamicCityOrder = ({ scores }) => {
  const [cityOrder, setCityOrder] = useState([]);

  useEffect(() => {
    fetch('/data/games/citypoints/dynamicCities.json')
      .then(response => response.json())
      .then(data => {
        let orderedCities = [...data.initialCities];
        let addedCity = null;

        if (scores['75'] > 100) {
          addedCity = 'Fontainebleau';
        } else if (scores['69'] > 100) {
          addedCity = 'Chambéry';
        }

        if (!addedCity) {
          addedCity = data.conditionalCities.find(city => city.default).name;
        }

        orderedCities.push(addedCity);

        setCityOrder(orderedCities.slice(0, 10)); // Garde seulement 10 villes
      })
      .catch(error => console.error('Erreur lors du chargement des villes :', error));
  }, [scores]);

  return (
    <div>
      {cityOrder.map((city, index) => (
        <p key={index}>{city}</p>
      ))}
    </div>
  );
};

export default DynamicCityOrder;
