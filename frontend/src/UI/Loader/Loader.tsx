import React from "react"
import cl from './Loader.module.css'


const Loader: React.FC = () => {

    return (
        <div className={cl['lds-ring']}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Loader
