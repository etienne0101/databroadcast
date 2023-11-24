import React, { useState, useEffect } from 'react';
import styles from '../../../styles/games/Citypoints.module.css'; // Vérifie le chemin d'accès
import chroma from 'chroma-js';

const DistanceBar = ({ distance }) => {
  const [barWidth, setBarWidth] = useState(0);
  const [animatedDistance, setAnimatedDistance] = useState(0);
  const [barColor, setBarColor] = useState('green');
  const maxBarLength = 300; // Longueur maximale de la barre en pixels pour 150km

  const interpolateColor = (percentage) => {
    // Utilise un scale de couleur personnalisé avec des points précis
    const colorScale = chroma.scale(['#b5e48c', '#e56b6f'])
      .mode('lrgb')
      .correctLightness(); // Option pour équilibrer la luminosité à travers le gradient
  
    return colorScale(percentage).hex();
  };
  
  useEffect(() => {
    // Animation de la largeur de la barre
    const targetWidth = Math.min(maxBarLength, (distance / 150) * maxBarLength);
    setTimeout(() => {
      setBarWidth(targetWidth);
    }, 0); // Un délai de 0 pour déclencher l'animation

    // Animation du texte de la distance
    let start = null;
    const duration = 1000; // 1 seconde
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const currentDistance = Math.min(distance * (progress / duration), distance);
      setAnimatedDistance(currentDistance);
  
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [distance]);

  useEffect(() => {
    // Calcul du pourcentage pour la largeur actuelle de la barre
    const percentage = barWidth / maxBarLength;
    // Met à jour la couleur de la barre
    const newColor = interpolateColor(percentage);
    setBarColor(newColor);
  }, [barWidth, maxBarLength]);

  return (
    <div className={styles.distanceBarWrapper}>
      <div
        className={styles.distanceBar}
        style={{ width: `${barWidth}px`, backgroundColor: barColor }}
      ></div>
      <div className={styles.distanceText}>{animatedDistance.toFixed(2)} km</div>
    </div>
  );
};

export default DistanceBar;
