import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import glaciers from '../../../data/glaciers/glaciers-20230814.json';
import glaciersPrev from '../../../data/glaciers/glaciers-20230801.json';

const MapGlaciers = () => {
  const extractCoordinates = (coorStr) => {
    if (!coorStr) {
      console.error("Invalid coordinate string");
      return [0, 0];
    }
    const coords = coorStr.replace('Point(', '').replace(')', '').split(' ');
    return [parseFloat(coords[1]), parseFloat(coords[0])];
  }

  const compareGlacierSize = (glacier) => {
    const glacierPrev = glaciersPrev.find(g => g.itemLabel === glacier.itemLabel);
    const glacierNow = glaciers.find(g => g.itemLabel === glacier.itemLabel);

    if (glacierPrev && glacierNow) {
      return {
        color: glacierPrev.area_sqkm > glacier.area_sqkm ? 'red' : 'white',
        diff: glacierPrev.area_sqkm - glacier.area_sqkm
      };
    } else {
      return {
        color: 'white',
        diff: 0
      };
    }
  }

  return (
    <MapContainer center={[30.505, -0.09]} zoom={4} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {glaciers.map((glacier, idx) => {
        const { color, diff } = compareGlacierSize(glacier);
        return (
          <CircleMarker
            key={idx}
            center={extractCoordinates(glacier.coor)}
            radius={1}
            fillColor={color}
            color={color}
          >
            <Popup>
              <b>{glacier.itemLabel}</b><br/>
              Area: {glacier.area_sqkm} sqkm<br/>
              Size change: {diff.toFixed(2)} sqkm
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}

export default MapGlaciers;
