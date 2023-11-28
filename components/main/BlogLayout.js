import React from 'react';
import styles from '../../styles/BlogLayout.module.css';

const BlogLayout = ({ children }) => { // Accept children as a prop
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav>
          <ul className={styles.navList}>
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>
      </header>
      <main className={styles.mainContent}>
        {children} {/* Render children here */}
      </main>
      <footer className={styles.footer}>
        Data Broadcast - 2023
      </footer>
    </div>
  );
};

export default BlogLayout;
