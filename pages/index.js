import GalleryItem from '../components/main/GalleryItem';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const HomePage = () => {
    const galleryData = [
        { 
            title: 'Public art in canadian cities', 
            description: 'Maps of public art and year of installation', 
            imagePath: './images/datastories/canada-public-art.jpeg',
            link: '/datastories/canada-public-art'  
        },
        { 
            title: 'Exploring the Global Terrorism DataBase', 
            description: 'Maps and charts or terrorist attacks since 1970', 
            imagePath: './images/datastories/global-terrorism.jpeg',
            link: '/datastories/global-terrorism'  
        },
    ];

    return (
        <div className={styles.homecontainer}>
            <div className={styles.logo}>
                <img src="/images/logos/databroadcast-white.png" alt="Big Logo" />
            </div>
            <div className={styles.gallery}>
                {galleryData.map((item, index) => (
                    <Link href={item.link} key={index}>
                    <a className={styles.galleryLink}>
                        <GalleryItem 
                            title={item.title}
                            description={item.description}
                            imagePath={item.imagePath}
                        />
                    </a>
                </Link>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
