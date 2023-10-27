// locations.js
import React from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import locationsData from '../../../../data/drug-policies/siv/locations.json'

const getRadiusSize = (numberOfFacilities) => {
  if (numberOfFacilities === 1) return 5
  if (numberOfFacilities >= 2 && numberOfFacilities <= 3) return 7
  if (numberOfFacilities >= 4 && numberOfFacilities <= 6) return 9
  if (numberOfFacilities >= 7 && numberOfFacilities <= 9) return 12
  return 15
}

const getFillColor = (numberOfFacilities) => {
  if (numberOfFacilities === 1) return '#ffba08'
  if (numberOfFacilities >= 2 && numberOfFacilities <= 3) return '#faa307' // A shade between yellow and red
  if (numberOfFacilities >= 4 && numberOfFacilities <= 6) return '#f48c06' // Another shade between yellow and red
  if (numberOfFacilities >= 7 && numberOfFacilities <= 9) return '#e85d04' // Closer to red
  return '#dc2f02'
}

const Locations = () => {
  return (
    <MapContainer
      center={[50.84, -24.35]}
      zoom={4}
      style={{ height: '700px', width: '100%' }}
    >
      <TileLayer
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locationsData.map((location, idx) => (
        <CircleMarker
          key={idx}
          center={[location.lat, location.lon]}
          radius={getRadiusSize(location['Number of facilities'])}
          fillColor={getFillColor(location['Number of facilities'])}
          color="transparent"
          weight={0}
          fillOpacity={0.6}
        >
          <Popup>
            <b>{location.City}</b>
            <br />
            Country: {location.Country}
            <br />
            Number of facilities: {location['Number of facilities']}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}

export default Locations
