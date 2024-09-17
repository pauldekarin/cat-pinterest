//Home.tsx

import React, { useEffect, useState } from 'react'
import ImageList from '../../components/Cards/Cards';
import LoadingNotification from '../../components/LoadingNotification/LoadingNotification';
import { useLoaded } from '../../context/LoadedContext';

const HomePage: React.FC<{}> = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const {loaded, setLoaded} = useLoaded();

    async function refreshImages() {
        setLoading(true);

        try{
            const cat_api_key = 'live_sNtbLkBV5oIDKh7mYmXWPk4eGseVMqhpp3QT9UcvQiqpyAd1nQ3hitAQZxkg9mTN';

            if(!cat_api_key){
                console.error('Invalid Cat API Key');
                return;
            }

            const headers = new Headers({
                "Content-Type": "application/json",
                "x-api-key": cat_api_key
            });

            const response = await fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=10", {
                headers: headers,
                method: 'GET',
                redirect:'follow'
            });

            const json: Array<{id:string, url:string, width:number, height:number,breeds:[],favourite:[]}> = await response.json();
            const data = json.map(data => ({
                id: data.id,
                url: data.url,
                height: data.height,
                width: data.width,
                liked: false
            }));

            setLoaded(previous_images => [...previous_images, ...data]);
        }catch(error){

        }finally{
            setLoading(false);
        }
    }

    async function handleScroll(){
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
            await refreshImages();
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    })

    useEffect(() => {
        if(loaded.length == 0){
            refreshImages();
        }
    }, []);
    
    return(
        <div>
            <ImageList images={loaded} />
            {
                loading && <LoadingNotification/>
            }
        </div>
    )
}

export default HomePage;