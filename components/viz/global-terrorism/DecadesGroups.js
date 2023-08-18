import React, { useState, useEffect } from 'react';
import styles from '../../../styles/datastories/DecadesGroups.module.css';
import gnameData from '../../../data/global-terrorism/context/gname_context.json';


const DecadesGroups = ({ onGroupSelect }) => {
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
                onClick={() => onGroupSelect(gname)} // Use the provided prop here
              >
                {gname}
              </button>
            ))}
        </div>
    </div>
);
};

export default DecadesGroups;
