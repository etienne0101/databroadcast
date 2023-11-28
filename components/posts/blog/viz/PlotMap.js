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
          const response = await fetch(dataUrl);
          const data = await response.json();
  
          // Process and add circle markers
          data.forEach(item => {
            const latitude = item.lat || item.latitude;
            const longitude = item.lon || item.longitude;
  
            if (latitude && longitude) {
              L.circleMarker([latitude, longitude], {
                color: 'black',      // Customize color here
                fillColor: '#ccc', // Customize fill color here
                fillOpacity: 0.9,  // Customize fill opacity here
                radius: 3          // Customize radius here
              }).addTo(map)
                .bindPopup(item.popupContent || 'No details available');
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