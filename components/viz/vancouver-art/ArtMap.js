import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import ArtworkData from '../../../data/vancouver-art/public-art.json';  // Modify the path accordingly based on the file structure

const years = ArtworkData.map(artwork => parseInt(artwork.yearofinstallation, 10));
const minYear = Math.min(...years);
const maxYear = Math.max(...years);

function getColor(year) {
  const percentage = (year - minYear) / (maxYear - minYear);

  const redStart = 89, greenStart = 0, blueStart = 4;
  const redEnd = 252, greenEnd = 186, blueEnd = 4;

  const red = Math.floor(redStart + percentage * (redEnd - redStart));
  const green = Math.floor(greenStart + percentage * (greenEnd - greenStart));
  const blue = Math.floor(blueStart + percentage * (blueEnd - blueStart));

  return `rgb(${red}, ${green}, ${blue})`;
}

const ArtworkMap = () => {
    return (
        <MapContainer center={[49.201185, -123.113918]} zoom={12} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {ArtworkData.map((artwork) => {
              if (!artwork.geom || !artwork.geom.geometry || !artwork.geom.geometry.coordinates) {
                  return null; 
              }
               const coordinates = artwork.geom.geometry.coordinates;

                          return (
                            <CircleMarker
                            key={artwork.registryid}
                            center={[coordinates[1], coordinates[0]]}
                            radius={2}
                            fillColor={getColor(parseInt(artwork.yearofinstallation, 10))}
                            color={getColor(parseInt(artwork.yearofinstallation, 10))}
                        >
                        <Popup>
                            <b>{artwork.title_of_work}</b><br />
                            Year: {artwork.yearofinstallation}<br />
                            <a href={artwork.url} target="_blank" rel="noopener noreferrer">More Info</a>
                        </Popup>
                    </CircleMarker>
                );
            })}
        </MapContainer>
    );
}

export default ArtworkMap;
