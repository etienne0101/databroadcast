import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import styles from '../../../styles/datastories/GlobalTerrorism.module.css'
import DecadesGroups from './DecadesGroups';

import data1970 from '../../../data/global-terrorism/global-terrorism-1970.json';
import data1971 from '../../../data/global-terrorism/global-terrorism-1971.json';
import data1972 from '../../../data/global-terrorism/global-terrorism-1972.json';
import data1973 from '../../../data/global-terrorism/global-terrorism-1973.json';
import data1974 from '../../../data/global-terrorism/global-terrorism-1974.json';
import data1975 from '../../../data/global-terrorism/global-terrorism-1975.json';
import data1976 from '../../../data/global-terrorism/global-terrorism-1976.json';
import data1977 from '../../../data/global-terrorism/global-terrorism-1977.json';
import data1978 from '../../../data/global-terrorism/global-terrorism-1978.json';
import data1979 from '../../../data/global-terrorism/global-terrorism-1979.json';
import data1980 from '../../../data/global-terrorism/global-terrorism-1980.json';
import data1981 from '../../../data/global-terrorism/global-terrorism-1981.json';
import data1982 from '../../../data/global-terrorism/global-terrorism-1982.json';
import data1983 from '../../../data/global-terrorism/global-terrorism-1983.json';
import data1984 from '../../../data/global-terrorism/global-terrorism-1984.json';
import data1985 from '../../../data/global-terrorism/global-terrorism-1985.json';
import data1986 from '../../../data/global-terrorism/global-terrorism-1986.json';
import data1987 from '../../../data/global-terrorism/global-terrorism-1987.json';
import data1988 from '../../../data/global-terrorism/global-terrorism-1988.json';
import data1989 from '../../../data/global-terrorism/global-terrorism-1989.json';
import data1990 from '../../../data/global-terrorism/global-terrorism-1990.json';
import data1991 from '../../../data/global-terrorism/global-terrorism-1991.json';
import data1992 from '../../../data/global-terrorism/global-terrorism-1992.json';
import data1994 from '../../../data/global-terrorism/global-terrorism-1994.json';
import data1995 from '../../../data/global-terrorism/global-terrorism-1995.json';
import data1996 from '../../../data/global-terrorism/global-terrorism-1996.json';
import data1997 from '../../../data/global-terrorism/global-terrorism-1997.json';
import data1998 from '../../../data/global-terrorism/global-terrorism-1998.json';
import data1999 from '../../../data/global-terrorism/global-terrorism-1999.json';
import data2000 from '../../../data/global-terrorism/global-terrorism-2000.json';
import data2001 from '../../../data/global-terrorism/global-terrorism-2001.json';
import data2002 from '../../../data/global-terrorism/global-terrorism-2002.json';
import data2003 from '../../../data/global-terrorism/global-terrorism-2003.json';
import data2004 from '../../../data/global-terrorism/global-terrorism-2004.json';
import data2005 from '../../../data/global-terrorism/global-terrorism-2005.json';
import data2006 from '../../../data/global-terrorism/global-terrorism-2006.json';
import data2007 from '../../../data/global-terrorism/global-terrorism-2007.json';
import data2008 from '../../../data/global-terrorism/global-terrorism-2008.json';
import data2009 from '../../../data/global-terrorism/global-terrorism-2009.json';
import data2010 from '../../../data/global-terrorism/global-terrorism-2010.json';
import data2011 from '../../../data/global-terrorism/global-terrorism-2011.json';
import data2012 from '../../../data/global-terrorism/global-terrorism-2012.json';
import data2013 from '../../../data/global-terrorism/global-terrorism-2013.json';
import data2014 from '../../../data/global-terrorism/global-terrorism-2014.json';
import data2015 from '../../../data/global-terrorism/global-terrorism-2015.json';
import data2016 from '../../../data/global-terrorism/global-terrorism-2016.json';
import data2017 from '../../../data/global-terrorism/global-terrorism-2017.json';
import data2018 from '../../../data/global-terrorism/global-terrorism-2018.json';
import data2019 from '../../../data/global-terrorism/global-terrorism-2019.json';
import data2020 from '../../../data/global-terrorism/global-terrorism-2020.json';

const GroupsMap = () => {
    const [events, setEvents] = useState([]);
    const [selectedGname, setSelectedGname] = useState(null); // New state

    const handleGroupSelect = (gname) => {
        setSelectedGname(gname);
    };

    useEffect(() => {
        let allEvents = Object.values(yearToDataMap).flat();
        if (selectedGname) {
            allEvents = allEvents.filter(event => event.gname === selectedGname);
        }
        setEvents(allEvents);
    }, [selectedGname]);

    const yearToDataMap = {
        1970: data1970,
        1971: data1971,
        1972: data1972,
        1973: data1973,
        1974: data1974,
        1975: data1975,
        1976: data1976,
        1977: data1977,
        1978: data1978,
        1979: data1979,
        1980: data1980,
        1981: data1981,
        1982: data1982,
        1983: data1983,
        1984: data1984,
        1985: data1985,
        1986: data1986,
        1987: data1987,
        1988: data1988,
        1989: data1989,
        1990: data1990,
        1991: data1991,
        1992: data1992,
        1994: data1994,
        1995: data1995,
        1996: data1996,
        1997: data1997,
        1998: data1998,
        1999: data1999,
        2000: data2000,
        2001: data2001,
        2002: data2002,
        2003: data2003,
        2004: data2004,
        2005: data2005,
        2006: data2006,
        2007: data2007,
        2008: data2008,
        2009: data2009,
        2010: data2010,
        2011: data2011,
        2012: data2012,
        2013: data2013,
        2014: data2014,
        2015: data2015,
        2016: data2016,
        2017: data2017,
        2018: data2018,
        2019: data2019,
        2020: data2020,
    };
    


    const handleMapClick = (e) => {
        e.nativeEvent.stopImmediatePropagation();
        console.log("Map clicked!");
      };
      

    const isValidLatLng = (lat, lng) => {
        return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
    };

    const HeatmapLayer = () => {
        const map = useMap();

        useEffect(() => {
          const handleLeafletClick = (e) => {
            console.log("Leaflet map clicked!");
          };
        
          map.on('click', handleLeafletClick);
        
          return () => {
            map.off('click', handleLeafletClick); // Cleanup
          };
        }, [map]);

        useEffect(() => {
            const points = (events || []).filter(event => isValidLatLng(event.latitude, event.longitude))
            .map(event => [event.latitude, event.longitude, 1]); // 1 can be replaced by event magnitude if available

            const gradient = {
                0.0: '#fa4210', 
                0.5: '#fa4210', 
                1.0: '#fa4210'
            };
            const radius = 2; 
            const maxZoom = 7;
            const blur = 2;

            if (points.length) {
                const heatmapLayer = L.heatLayer(points, {
                    gradient: gradient,
                    radius: radius,
                    maxZoom: maxZoom,
                    blur: blur
                }).addTo(map);

                return () => {
                    map.removeLayer(heatmapLayer);
                };
            }
        }, [map, events]);

        return null;
    };

    Object.values(yearToDataMap).forEach(data => {
        if (!Array.isArray(data)) {
            console.error("Data import issue:", data);
        }
    });
    
    return (
        <div style={{ position: 'relative', height: '100vh' }}>
            <DecadesGroups onGroupSelect={handleGroupSelect} />
            <div style={{ position: 'absolute', top: '25%', left: 0, right: 0, bottom: 0 }}>
                <MapContainer 
                    center={[20, 0]} 
                    zoom={2} 
                    style={{ width: '100%', height: '80vh' }}
                    onClick={e => e.originalEvent.stopPropagation()}
                    keyboard={false}
                >
                    <TileLayer
                        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <HeatmapLayer />
                </MapContainer>
            </div>
        </div>
    );
};

export default GroupsMap;