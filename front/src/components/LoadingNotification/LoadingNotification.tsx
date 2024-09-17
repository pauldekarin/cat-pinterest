import React from "react"
import styles from './LoadingNotification.module.css'

const LoadingNotification: React.FC<{}> = () => {
    return(
        <div className={styles['loading-container']}>
            <span>...загружаем котиков...</span>
        </div>
    )
}

export default LoadingNotification;