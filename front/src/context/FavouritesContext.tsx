import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { CatAPIImage } from "../types/cat_api_image.type";
interface FavouritesContextType{
    favourites: CatAPIImage[];
    toggleFavourite: (image: CatAPIImage) => void;
    loadFavourites: () => void;
}

interface ImageData{
    id:number,
    cat_id:string,
    created_at:string
}

const FavouriteContext = createContext<FavouritesContextType | undefined>(undefined);

export const FavouriteProvider:React.FC<{ children: ReactNode }> = ({ children }) => {
    const [favourites, setFavorites] = useState<CatAPIImage[]>([]);

    const toggleFavourite = async (image: CatAPIImage) => {
        const has_like = favourites.some(favourite => favourite.id === image.id);
        const TOKEN = localStorage.getItem('token');

        if(has_like){
            setFavorites(previous_favourites => previous_favourites.filter(favourite => favourite.id !== image.id));

            if(TOKEN){
                const headers = new Headers({
                    'Authorization' : `Bearer ${TOKEN}`,
                });

                const response = await fetch(`/api/likes/${image.id}`,{
                    method:'DELETE',
                    headers
                });

                if(response.ok){
                    console.log(`Successfully deleted image from DB ${image.id}`);
                }
            }
            
        }else{
            setFavorites(previous_favourites => [...previous_favourites, image]);
            
            if(TOKEN){
                const headers = new Headers({
                    'Authorization' : `Bearer ${TOKEN}`,
                    'Content-Type' : 'application/json'
                });

                const response = await fetch(`/api/likes`,{
                    method:'POST',
                    headers,
                    body:JSON.stringify({
                        cat_id : image.id
                    })
                })
                
                if(response.ok){

                }

            }
        }
    }

    const loadFavourites = async () => {
        const token = localStorage.getItem('token');

        if(!token){
            return;
        }

        const cat_api_key = 'live_sNtbLkBV5oIDKh7mYmXWPk4eGseVMqhpp3QT9UcvQiqpyAd1nQ3hitAQZxkg9mTN';

        if(!cat_api_key){
            return;
        }

        const headers = new Headers({
            'Authorization' : `Bearer ${token}`
        })
        const response = await fetch(`/api/likes`,{
            method:'GET',
            headers
        });

        const json:ImageData[] = await response.json();

        const loaded_images:CatAPIImage[] = [];

        await Promise.all(
            json.map(async (data:ImageData) => {
                console.log(data);
                try{
                    const response = await fetch(`https://api.thecatapi.com/v1/images/${data.cat_id}`, {
                    headers: {
                        'x-api-key': cat_api_key!,
                    },
                    });
                    const json = await response.json();
    
                    loaded_images.push({id: json.id, url: json.url, width: json.width, height: json.height, liked: true});
                }catch(error){

                }
            })
        );
        

        
        setFavorites(loaded_images);
    }   

    useEffect(() => {
        loadFavourites();
    }, []);

    return(
        <FavouriteContext.Provider value={{favourites, toggleFavourite, loadFavourites}}>
            { children }
        </FavouriteContext.Provider>
    )
}

export const useFavourites = (): FavouritesContextType => {
    const context = useContext(FavouriteContext);

    if(!context){
        throw new Error('useFavourites');
    }
    return context;
} 