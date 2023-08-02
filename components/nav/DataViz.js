import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/DataViz.module.css';

const DataViz = ({ title, description, children }) => {
  return (
    <div className={styles['parent-container']}>
      <div className={styles.container}>
        <h1 className={styles['viz-title']}>{title}</h1>
        <p className={styles['dataviz-description']}>{description}</p>
        <div className={styles['dataviz-visualization']}>
          {children}
        </div>
      </div>
    </div>
  );
}

DataViz.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default DataViz;
