// components/GalleryItem.js
import styles from '../../styles/Home.module.css'

const GalleryItem = ({ title, description, imagePath }) => {
  return (
    <div className={styles.item}>
      <img src={imagePath} alt={title} className={styles.itemImage} />
      <h2 className={styles.itemtitle}>{title}</h2>
      <p className={styles.itemdescription}>{description}</p>
    </div>
  )
}

export default GalleryItem
