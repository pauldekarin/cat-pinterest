// Cards.tsx

import React from "react";
import { CatAPIImage } from "../../types/cat_api_image.type";
import Image from "../Image/Image"
import styles from './Cards.module.css'

const ImageList: React.FC<{images: CatAPIImage[]}> = ({ images }) =>{
    return(
        <div className={styles['cards-container']}>
            {
                images.map((image: CatAPIImage, index: number) => {
                    return(
                        <Image url={image.url} liked={image.liked} key={image.id + images.length + index} id={image.id}/>
                    )
                })
            }
        </div>
    )
}

export default ImageList;