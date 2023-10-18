import React, { useState, useEffect } from 'react';
import styles from '../../../styles/datastories/DecadesGroups.module.css';
import gnameData from '../../../data/global-terrorism/context/gname_context.json';


const DecadesGroups = ({ onGroupSelect, groupEventCounts }) => {
    const [data, setData] = useState(gnameData.data);
    const [selectedDecade, setSelectedDecade] = useState(null);
  

  // Fetch data from JSON
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/data/global-terrorism/context/gname_context.json'); 
      const result = await response.json();
      setData(result.data);
    }

    fetchData();
  }, []);

  const getButtonColor = (gname, groupEventCounts) => {
    const count = groupEventCounts[gname] || 0;
    if (count < 10) return '#fef4d7';
    if (count < 50) return '#fae1ca';
    if (count < 100) return '#f6cdbc';
    if (count < 200) return '#f2baaf';
    return 'e99394';
};


  return (
    <div className={styles.container}>
        <div className={styles.decades}>
            {data.map((item, index) => (
                <div
                    key={index}
                    className={styles.decade}
                    onClick={() => setSelectedDecade(item.years[0])}
                >
                    {item.years[0]} - {item.years[item.years.length - 1]}
                </div>
            ))}
        </div>
        <div className={styles.groups}>
        {selectedDecade &&
          data
            .find((item) => item.years[0] === selectedDecade)
            .gnames.map((gname, index) => (
                <button 
                key={index} 
                className={styles.groupButton}
                style={{ backgroundColor: getButtonColor(gname, groupEventCounts) }}
                onClick={() => onGroupSelect(gname)}
            >
                {gname}
            </button>
            
            ))}
        </div>
    </div>
);
};

export default DecadesGroups;
