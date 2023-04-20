import React from "react"
import cl from './ModalWindow.module.css'


interface ModalWindowProps extends React.PropsWithChildren {
    isActive: boolean
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
    className?: string
}

const ModalWindow: React.FC<ModalWindowProps> = ({ className, isActive, setIsActive, children }) => {

    function closeModalWindow () {
        setIsActive(false)
    }

    if(!isActive) return null

    return (
            <div onClick={closeModalWindow} className={cl.modal}>
                <div 
                    onClick={(e) => e.stopPropagation()} 
                    className={className ? `${cl['modal-content']} ${className}` : cl['modal-content']}
                >
                    {children}
                </div>
            </div>
    )
}


export default ModalWindow
