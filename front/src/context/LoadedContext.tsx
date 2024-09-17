import { createContext, ReactNode, useContext, useState } from "react";
import { CatAPIImage } from "../types/cat_api_image.type";

interface LoadedContextType{
    loaded: CatAPIImage[];
    setLoaded: React.Dispatch<React.SetStateAction<CatAPIImage[]>>;
};

const LoadedContext = createContext<LoadedContextType | undefined>(undefined);

export const LoadedProvider:React.FC< { children: ReactNode}> = ( {children} ) => {
    const [loaded, setLoaded] = useState<CatAPIImage[]>([]);

    return(
        <LoadedContext.Provider value={{ loaded, setLoaded }}>
            {children}
        </LoadedContext.Provider>
    )
}

export const useLoaded = ():LoadedContextType => {
    const context = useContext(LoadedContext);

    if(!context){
        throw new Error('useLoaded');
    }

    return context;
}