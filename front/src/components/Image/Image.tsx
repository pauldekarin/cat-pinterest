// Image.tsx

import styles from './Image.module.css'
import { path } from './Image.links.json'
import { useFavourites } from '../../context/FavouritesContext'

const Image: React.FC<{url: string, liked: boolean, id: string}> = ({ url, id }) => {
    const { favourites, toggleFavourite } = useFavourites();

    const has_like = favourites.some(favourite => favourite.id == id);

    const handleClick = () => {
        toggleFavourite({id, url, width: 0, height: 0, liked: !has_like});
    }

    return(
        <div className={styles['cat-img-container']} onClick={handleClick}>
            <img src={url} className={styles['cat-img']}/>

            <div className={styles['cat-like-container']}>
                <img src={has_like ? path['liked'] : path['unliked']} className={styles['cat-like']}/>
            </div>
        </div>
    )
}

export default Image;