import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/DataViz.module.css';

const DataViz = ({ title, description, dataLink, children }) => {
  return (
    <div className={styles['parent-container']}>
      <div className={styles.container}>
        <h1 className={styles['viz-title']}>{title}</h1>
        <p className={styles['dataviz-description']}>{description}</p>
        <div className={styles['dataviz-visualization']}>
          {children}
        </div>
        {dataLink && (
          <a className={styles['data-link']} href={dataLink} target="_blank" rel="noopener noreferrer">
            📁 View Data Source
          </a>
        )}
      </div>
    </div>
  );
};

DataViz.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  dataLink: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default DataViz;
