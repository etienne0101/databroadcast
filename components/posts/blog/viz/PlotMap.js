import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const getViewCoordinates = (view) => {
  switch (view) {
    case 'europe':
      return { center: [54.5260, 0.2551], zoom: 3.3 }; // Europe's rough center and zoom level
    // Add more cases for other views if necessary
    default:
      return { center: [51.505, -0.09], zoom: 13 }; // Default view
  }
};

const PlotMap = ({ dataUrl, view }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const { center, zoom } = getViewCoordinates(view);
    const map = L.map(mapRef.current).setView(center, zoom);

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}.png', {
        maxZoom: 19,
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
    }).addTo(map);

    const fetchData = async () => {
      try {
          const fullUrl = new URL(dataUrl, window.location.href); // Construct a full URL
          const response = await fetch(fullUrl.toString());
          const data = await response.json();

          // Retrieve the plotLabel from the URL
          const urlParams = new URLSearchParams(fullUrl.search);
          const plotLabelKey = urlParams.get('plotLabel');

          // Process and add circle markers
          data.forEach(item => {
            const latitude = parseFloat(item.lat);
            const longitude = parseFloat(item.lon);

            if (!isNaN(latitude) && !isNaN(longitude)) {
                L.circleMarker([latitude, longitude], {
                    color: 'transparent',
                    fillColor: '#024788',
                    fillOpacity: 0.7,
                    radius: 4
                }).addTo(map)
                  .bindPopup(`${plotLabelKey}: ${item[plotLabelKey] || 'Details not available'}`);
            } else {
            }
          });

      } catch (error) {
        console.error('Error fetching map data:', error);
      }
    };

    fetchData();

    return () => {
        map.remove();
    };
}, [dataUrl, view]);



  return <div ref={mapRef} style={{ height: '400px', width: '100%', borderRadius: '20px' }}></div>;
};

export default PlotMap;
