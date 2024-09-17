// Favourite.tsx

import React from 'react'
import ImageList from '../../components/Cards/Cards';
import { useFavourites } from '../../context/FavouritesContext';


const FavouritePage: React.FC<{}> = () => {
    const { favourites } = useFavourites();

    return(
        <div>
            <ImageList images={favourites} />
        </div>
        
    )
}

export default FavouritePage;