import React from 'react';
import Link from 'next/link';
import styles from '../../styles/Layout.module.css';

const Layout = ({ children }) => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/">
                    <a>
                        <img src="/images/logos/databroadcast-small.png" alt="Website Logo" className={styles.logo} />
                    </a>
                </Link>
                <nav>
                    <Link href="/about">
                        <a className={styles.navLink}>About</a>
                    </Link>
                </nav>
            </header>
            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
}

export default Layout;
