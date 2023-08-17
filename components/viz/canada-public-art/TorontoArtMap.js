import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { BarChart, Bar, XAxis, Tooltip, Cell, Rectangle } from 'recharts';
import 'leaflet/dist/leaflet.css';
import styles from '../../../styles/Datastories.module.css'

import ArtworkDataToronto from '../../../data/canada-public-art/toronto.json';
import ContextData from '../../../data/canada-public-art/toronto-context.json';

const validArtworkDataToronto = ArtworkDataToronto.filter(artwork => !isNaN(parseInt(artwork.YEAR_INSTALLED, 10)));

function getContextForYear(year) {
  return ContextData.data.find(item => parseInt(item.year, 10) === year) || null;
}

const yearsToronto = validArtworkDataToronto.map(artwork => parseInt(artwork.YEAR_INSTALLED, 10));
const minYearToronto = Math.min(...yearsToronto);
const maxYearToronto = Math.max(...yearsToronto);

const yearCountsToronto = {};

validArtworkDataToronto.forEach(artwork => {
    const year = parseInt(artwork.YEAR_INSTALLED, 10);
    yearCountsToronto[year] = (yearCountsToronto[year] || 0) + 1;
});
  

function getColor(year) {
    if (!year || isNaN(year)) {
        console.error("Invalid year:", year);
        return 'black'; // Default color for debugging
    }
    const percentage = (year - minYearToronto) / (maxYearToronto - minYearToronto);  

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

  const Histogram = ({ minYear, maxYear, yearCounts, onSelectYear, style }) => {
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
            width={data.length * 8} 
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

const TorontoArtworkMap = () => {
    
  const [selectedYear, setSelectedYear] = useState(null);
  const contextData = selectedYear ? getContextForYear(selectedYear) : null;
  
  const filteredArtworksToronto = selectedYear
  ? validArtworkDataToronto.filter(artwork => parseInt(artwork.YEAR_INSTALLED, 10) === selectedYear)
  : validArtworkDataToronto;

    
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      
      {/* Histogram Container */}
      <div style={{ height: '20vh', width: '100%', overflow: 'auto', zIndex: 1000 }}>
      <Histogram minYear={minYearToronto} maxYear={maxYearToronto} yearCounts={yearCountsToronto} onSelectYear={setSelectedYear} />
      </div>
      
      {/* Map Container */}
      <div style={{ height: '80vh', width: '100%', position: 'relative' }}>
      <MapContainer 
              center={[43.601185, -79.413918]} 
              zoom={11} 
              style={{ height: "100%", width: "100%" }}
              keyboard={false}
              onClick={e => e.originalEvent.stopPropagation()}
            >
          <TileLayer
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
            {filteredArtworksToronto.map((artwork) => {
            const geometry = JSON.parse(artwork.geometry.replace(/'/g, "\""));
            const coordinates = geometry.coordinates[0];
                return (
                <CircleMarker
                    key={artwork._id}
                    center={[coordinates[1], coordinates[0]]}
                    radius={2}
                    fillColor={getColor(parseInt(artwork.YEAR_INSTALLED, 10))}
                    color={getColor(parseInt(artwork.YEAR_INSTALLED, 10))}
                    fillOpacity={1} 
                >
                    <Popup>
                    <b>{artwork.Title}</b><br />
                    Year: {artwork.YEAR_INSTALLED}<br />
                    <a href={artwork.ImageURL} target="_blank" rel="noopener noreferrer">More Info</a>
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

export default TorontoArtworkMap;
