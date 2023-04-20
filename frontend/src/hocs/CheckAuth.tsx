import Loader from "@/UI/Loader/Loader"
import { useCheckAuthenticatedQuery } from "@/api/authApi"
import React from "react"
import { Navigate } from "react-router-dom"


const CheckAuth: React.FC<React.PropsWithChildren> = ({ children }) => {

    const { error, isFetching, isLoading } = useCheckAuthenticatedQuery(null) 

    if(isLoading || isFetching) {
        return (
            <div className='loader'>
                <Loader /> 
            </div>
        )
    }

    if(error && 'status' in error && error.status === 401 && window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        return <Navigate to={'/login'} replace />
    }

    if(!error && (window.location.pathname === '/login' || window.location.pathname === '/register')) {
        return <Navigate to={'/'} replace />
    }

    return (
        <>
            {children}
        </>
    )
}

export function wrapCheckAuth(Component: React.ReactNode) {
    return (
        <CheckAuth> 
            {Component}
        </CheckAuth>
    )
}

export default CheckAuth
