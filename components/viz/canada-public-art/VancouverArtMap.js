import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { BarChart, Bar, XAxis, Tooltip, Cell, Rectangle } from 'recharts';
import 'leaflet/dist/leaflet.css';

import ArtworkData from '../../../data/canada-public-art/vancouver.json';

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

  const Histogram = ({ minYear, maxYear, onSelectYear }) => {
    const data = Array.from({ length: maxYear - minYear + 1 }).map((_, index) => {
        const year = minYear + index;
        const count = yearCounts[year] || 0;
        return {
            year,
            count
        };
    });

    return (
        <BarChart 
            width={data.length * 10} 
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
    );
};

const VancouverArtworkMap = () => {
  const [selectedYear, setSelectedYear] = useState(null);

  const filteredArtworks = selectedYear
  ? ArtworkData.filter(artwork => parseInt(artwork.yearofinstallation, 10) === selectedYear)
  : ArtworkData;


  return (
    <div>
      <Histogram minYear={minYear} maxYear={maxYear} onSelectYear={setSelectedYear} />
      <MapContainer center={[49.201185, -123.113918]} zoom={12} style={{ height: "100vh", width: "100%" }}>
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
  );
}

export default VancouverArtworkMap;
