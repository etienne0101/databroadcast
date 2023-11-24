import React, { useState, useEffect } from 'react';
import FranceScoreMap from './FranceScoreMap';
import styles from '../../../styles/games/Citypoints.module.css'

const ScoreTable = ({ results }) => {
    const [scores, setScores] = useState({});
    const [loading, setLoading] = useState(true);
    const [geoJsonData, setGeoJsonData] = useState(null);

    useEffect(() => {
        fetch('/data/games/citypoints/scores-france.json') // Mettre le bon chemin vers ton JSON
            .then(response => response.json())
            .then(data => {
                calculateScores(data);
            })
            .catch(error => {
                console.error("Erreur lors du chargement des scores :", error);
            });
            fetch('../../../data/games/citypoints/zones-france.geojson')
            .then(response => response.json())
            .then(data => {
                setGeoJsonData(data);
                setLoading(false); // Change l'état de chargement ici après le chargement des deux données
            })
            .catch(error => {
                console.error("Erreur lors du chargement du GeoJSON :", error);
                setLoading(false);
            });
    }, [results]);

    const calculateScores = (scoreData) => {
        let scoreTotals = {};

        results.forEach(result => {
            const cityScores = scoreData[result.city];
            if (!cityScores) return;

            Object.keys(cityScores).forEach(category => {
                const { distance, points } = cityScores[category];
                if (result.distance >= distance[0] && result.distance < distance[1]) {
                    Object.keys(points).forEach(department => {
                        scoreTotals[department] = (scoreTotals[department] || 0) + points[department];
                    });
                }
            });
        });

        setScores(scoreTotals);
        setLoading(false);
        console.log("Scores totaux :", scoreTotals);
    };

    if (loading) {
        return <p>Calcul des scores en cours...</p>;
    }

    console.log("Scores transmis à FranceScoreMap :", scores);
    return (
        <div className={styles.resultsContainer}>
            {geoJsonData && <FranceScoreMap scores={scores} geojsonData={geoJsonData} />}
        </div>
    );
    
};

export default ScoreTable;
