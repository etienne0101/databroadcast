import React from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import styles from '../../../styles/games/Citypoints.module.css'

const FranceScoreMap = ({ scores, geojsonData }) => {
  const getColor = (departmentCode) => {
    const score = scores[departmentCode]
    console.log(`Score for ${departmentCode}: ${score}`) // Pour le débogage

    if (!score) return '#f8f9fa'
    if (score < -200) return 'red' // Scores très négatifs
    if (score >= -200 && score < 0) return 'orange'
    if (score >= 0 && score < 300) return 'yellow'
    if (score >= 300 && score < 5000) return 'green' // Scores positifs mais pas trop élevés
    return 'grey' // Pour des scores plus élevés
  }

  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.code) {
      layer.setStyle({
        fillColor: getColor(feature.properties.code),
        fillOpacity: 0.5,
        color: '#4a4e69',
        weight: 1,
        opacity: 0.5
      })
    }
  }

  return (
    <MapContainer
      height={800}
      center={[46.2276, 2.2137]}
      zoom={6}
      minZoom={6}
      maxZoom={6}
      className={styles.mapContainer}
      scrollWheelZoom={false}
      dragging={false}
      touchZoom={false}
      doubleClickZoom={false}
      zoomControl={false}
    >
      <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}.png" />
      <GeoJSON
        key={Object.keys(scores).length}
        data={geojsonData}
        onEachFeature={onEachFeature}
      />
    </MapContainer>
  )
}

export default FranceScoreMap
