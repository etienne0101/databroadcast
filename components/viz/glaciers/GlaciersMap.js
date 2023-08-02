import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import glaciers from '../../../data/glaciers/glaciers.json';

const MapGlaciers = () => {
  const extractCoordinates = (coorStr) => {
    if (!coorStr) {
      console.error("Invalid coordinate string");
      return [0, 0];
    }
    const coords = coorStr.replace('Point(', '').replace(')', '').split(' ');
    return [parseFloat(coords[1]), parseFloat(coords[0])];
  }

  return (
    <MapContainer center={[30.505, -0.09]} zoom={4} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {glaciers.map((glacier, idx) => (
        <CircleMarker
          key={idx}
          center={extractCoordinates(glacier.coor)}
          radius={1}
          fillColor="white"
          color="white"
        >
          <Popup>
            <b>{glacier.itemLabel}</b><br/>
            Area: {glacier.area_sqkm} sqkm
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}

export default MapGlaciers;
