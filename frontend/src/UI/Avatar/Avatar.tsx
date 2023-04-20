import React from "react"
import cl from './Avatar.module.css'


interface AvatarProps {
    title: string,
    backgroundColor: string
}

const Avatar: React.FC<AvatarProps> = ({ backgroundColor, title }) => {

    return (
        <div className={`${cl.avatar} ${backgroundColor}`}>
            {title[0]}
        </div>
    )
}


export default Avatar
