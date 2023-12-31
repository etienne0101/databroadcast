import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { BarChart, Bar, XAxis, Tooltip, Cell } from 'recharts';
import 'leaflet/dist/leaflet.css';
import styles from '../../../styles/Datastories.module.css'

import ArtworkData from '../../../data/canada-public-art/vancouver.json';
import ContextData from '../../../data/canada-public-art/vancouver-context.json';

function getContextForYear(year) {
  return ContextData.data.find(item => parseInt(item.year, 10) === year) || null;
}

const years = ArtworkData.map(artwork => parseInt(artwork.yearofinstallation, 10));
const minYear = Math.min(...years);
const maxYear = Math.max(...years);

const yearCounts = {};
ArtworkData.forEach(artwork => {
  const year = parseInt(artwork.yearofinstallation, 10);
  yearCounts[year] = (yearCounts[year] || 0) + 1;
});


function getColor(year) {
  const percentage = (year - minYear) / (maxYear - minYear);

  const redStart = 1, greenStart = 0, blueStart = 0;
  const redEnd = 352, greenEnd = 210, blueEnd = 4;

  const red = Math.floor(redStart + percentage * (redEnd - redStart));
  const green = Math.floor(greenStart + percentage * (greenEnd - greenStart));
  const blue = Math.floor(blueStart + percentage * (blueEnd - blueStart));

  return `rgb(${red}, ${green}, ${blue})`;
}

const CustomizedBar = (props) => {
    const { x, y, width, height, fill, value, index, onClick } = props;
    return (
      <g>
        <Rectangle x={x} y={y} width={width} height={height} fill={fill} />
        <Rectangle 
          x={x} 
          y={0} 
          width={width} 
          height={150} 
          fill="transparent" 
          cursor="pointer"
          onClick={() => onClick({ year: value })}
        />
      </g>
    );
  };

  const Histogram = ({ minYear, maxYear, onSelectYear, style }) => {
    const data = Array.from({ length: maxYear - minYear + 1 }).map((_, index) => {
        const year = minYear + index;
        const count = yearCounts[year] || 0;
        return {
            year,
            count
        };
    });

    return (
      <div style={{...style, zIndex: 1000}} onClick={e => e.stopPropagation()}>
        <BarChart 
            width={data.length * 9} 
            height={150} 
            data={data}
            margin={{ top: 2, right: 0, left: 0, bottom: 2 }}
        >
            <XAxis 
                dataKey="year" 
                tick={{ fontSize: 12 }}
            />
            <Tooltip />
            <Bar dataKey="count" onClick={(data) => onSelectYear(data.year)}>
                {
                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={getColor(entry.year)} />)
                }
            </Bar>
        </BarChart>
      </div>
    );
};

const VancouverArtworkMap = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const contextData = selectedYear ? getContextForYear(selectedYear) : null;
  
  const filteredArtworks = selectedYear
    ? ArtworkData.filter(artwork => parseInt(artwork.yearofinstallation, 10) === selectedYear)
    : ArtworkData;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      
      {/* Histogram Container */}
      <div style={{ height: '20vh', width: '100%', overflow: 'auto', zIndex: 1000 }}>
        <Histogram minYear={minYear} maxYear={maxYear} onSelectYear={setSelectedYear} />
      </div>
      
      {/* Map Container */}
      <div style={{ height: '80vh', width: '100%', position: 'relative' }}>
      <MapContainer 
              center={[49.231185, -123.113918]} 
              zoom={12} 
              style={{ height: "100%", width: "100%" }}
              keyboard={false}
              onClick={e => e.originalEvent.stopPropagation()}
            >
          <TileLayer
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {filteredArtworks.map((artwork) => {
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
                fillOpacity={1} 
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
      </div>
        {/* Context Data Container */}
        <div 
          className={`${styles.contextContainer} ${contextData ? styles.contextContainerVisible : styles.contextContainerHidden}`}
        >
          {contextData && (
            <>
              <h2>{contextData.context_title}</h2>
              <p>{contextData.context_description}</p>
              <a 
                href={contextData.context_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.learnMoreButton}
              >
                Learn More
              </a>
            </>
          )}
        </div>
    </div>
  );
}

export default VancouverArtworkMap;
