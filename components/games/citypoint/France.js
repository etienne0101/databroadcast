import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import ScoreTable from './ScoreFrance'
import CircularProgress from './CircularProgress'
import DistanceBar from './DistanceBar'
import styles from '../../../styles/games/Citypoints.module.css'

const locationIcon = new L.Icon({
  iconUrl: '/images/svg/location.svg',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35]
})

const GuessLocationGame = () => {
  const [cities, setCities] = useState([])
  const [selectedCityIndex, setSelectedCityIndex] = useState(0)
  const [selectedCity, setSelectedCity] = useState(null)
  const [distance, setDistance] = useState(null)
  const [results, setResults] = useState([])
  const [isGameFinished, setIsGameFinished] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [markerPosition, setMarkerPosition] = useState(null)
  const progress = cities.length ? selectedCityIndex : 0 // Utilise selectedCityIndex directement
  const totalCities = cities.length
  const [isNextCityButtonActive, setIsNextCityButtonActive] = useState(false)
  const [mainCities, setMainCities] = useState([]);
  const [confirmationCities, setConfirmationCities] = useState([]);
  const [totalPlayedCities, setTotalPlayedCities] = useState(14); // État pour le nombre total de villes jouées


  useEffect(() => {
    if (isGameFinished) {
      // Ajoute un délai avant d'afficher les résultats
      setTimeout(() => {
        setShowResults(true)
      }, 500) // Le délai doit correspondre à la durée de l'animation de sortie
    }
  }, [isGameFinished])

  useEffect(() => {
    fetch('/data/games/citypoints/cities-france.json')
      .then((response) => response.json())
      .then((data) => {
        const mainCities = data.filter(city => city.type === 'main');
        const confirmationCities = data.filter(city => city.type === 'confirmation');
        setMainCities(mainCities);
        setConfirmationCities(confirmationCities);
        setCities(mainCities);  // Démarre avec les villes principales
        setSelectedCity(mainCities[0]);
        setTotalPlayedCities(mainCities.length + 3);  // Fixe le total à 13 (10 principales + 3 de confirmation)
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des villes :', error);
      });
  }, []);
  

  useEffect(() => {
    if (selectedCityIndex === 11) {
      const sortedResults = [...results].sort((a, b) => a.distance - b.distance);
      const bestCities = sortedResults.slice(0, 3).map(result => result.city);
      
      const additionalCities = confirmationCities
        .filter(city => bestCities.includes(city.mainCity))
        .map(city => ({ name: city.name, lat: city.lat, lon: city.lon }));
  
      const uniqueAdditionalCities = additionalCities.filter((city, index, self) =>
        index === self.findIndex((t) => (t.name === city.name))
      );
  
      // Mettre à jour les villes et la ville sélectionnée en une seule étape
      const updatedCities = [...cities, ...uniqueAdditionalCities];
      setCities(updatedCities);
      if (uniqueAdditionalCities.length > 0) {
        setSelectedCity(uniqueAdditionalCities[0]);
      }
  
      // Mise à jour du total des villes jouées
      setTotalPlayedCities(mainCities.length + uniqueAdditionalCities.length);
    }
  }, [selectedCityIndex, results, confirmationCities, cities, mainCities]);
  

  const goToNextCity = () => {
    if (selectedCityIndex < totalPlayedCities - 1) {
      setResults([...results, { city: selectedCity.name, distance }]);
      const nextCity = cities[selectedCityIndex + 1];
      if (nextCity !== selectedCity) {
        setSelectedCity(nextCity);
      }
      setSelectedCityIndex(selectedCityIndex + 1);
      setDistance(null);
      setMarkerPosition(null);
    } else {
      setIsGameFinished(true);
      setIsNextCityButtonActive(false);
    }
  };
  

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        if (!selectedCity || isGameFinished || markerPosition) return
        const { lat, lng } = e.latlng
        setMarkerPosition([lat, lng])
        const distance = calculateDistance(
          lat,
          lng,
          selectedCity.lat,
          selectedCity.lon
        )
        setDistance(distance)
        setIsNextCityButtonActive(true)
      }
    })
    return null
  }

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Haversine formula
    const R = 6371 // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1)
    const dLon = toRad(lon2 - lon1)
    const rLat1 = toRad(lat1)
    const rLat2 = toRad(lat2)

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(rLat1) *
        Math.cos(rLat2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const toRad = (Value) => {
    return (Value * Math.PI) / 180
  }

  if (cities.length === 0 || !selectedCity) {
    return <p>Chargement des données...</p>;
  }
  
  
  return (
    <div className={styles.globalContainer}>
      {!showResults && (
        <div className={styles.gameContainer}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <span className={styles.findLabel}>Où se trouve</span>{' '}
            <span className={styles.cityName}>{selectedCity.name} ?</span>{' '}
          </div>

          <MapContainer
            center={[46.2276, 2.2137]}
            zoom={5.8}
            minZoom={5.8}
            maxZoom={5.8}
            className={styles.mapContainer}
            scrollWheelZoom={false}
            dragging={false}
            touchZoom={false}
            doubleClickZoom={false}
            zoomControl={false}
          >
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {markerPosition && (
              <Marker position={markerPosition} icon={locationIcon} />
            )}
            <MapEvents />
          </MapContainer>
          <div className={styles.progressContainer}>
            <div className={styles.buttonContainer}>
              <button
                className={`${styles.nextCityButton} ${
                  isNextCityButtonActive
                    ? styles.nextCityButtonActive
                    : styles.nextCityButtonInactive
                }`}
                onClick={() => {
                  if (isNextCityButtonActive) {
                    goToNextCity()
                    setIsNextCityButtonActive(false)
                  }
                }}
                disabled={!isNextCityButtonActive}
              >
                🏡 Ville suivante
              </button>
              {distance !== null && <DistanceBar distance={distance} />}
            </div>
            <div style={{ marginTop: '100px' }}> 
            <CircularProgress completed={progress} total={totalPlayedCities} />
            </div>
          </div>
        </div>
      )}
      {showResults && (
        <div
          className={styles.resultsContainer}
          style={{ width: '100%', height: '800px' }}
        >
          <h2 className={styles.resultsTitle}>Vous avez probablement vécu ici :</h2>
          <ScoreTable results={results} />
        </div>
      )}
    </div>
  )
}

export default GuessLocationGame
