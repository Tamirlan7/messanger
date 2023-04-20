import React from "react"
import cl from './Login.module.css'
import { ILogin } from "@/types"
import { useLazyCheckAuthenticatedQuery, useLoginMutation } from "@/api/authApi"
import { useNavigate } from "react-router-dom"



const Login: React.FC = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = React.useState<ILogin>() 
    const [login] = useLoginMutation()
    const [checkAuthenticated] = useLazyCheckAuthenticatedQuery()

    /* 
        || FUNCTIONS || 
    */

    async function onLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            formData && await login(formData).unwrap()
            await checkAuthenticated(null)
            navigate('/')
        } catch(err) {
            console.log(err)
        }
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData((prev) => ({...prev as ILogin, [e.target.name]: e.target.value}))
    }

    return (
        <>
            <div className={cl['login-page']}>
                <div className={cl['background']}>
                    <div className={cl['shape']}></div>
                    <div className={cl['shape']}></div>
                </div>
                <form className={cl['form']} onSubmit={onLogin}>
                    <h3 className={cl['form-title']}>Login Here</h3>

                    <label className={cl['label']} htmlFor="username">Username</label>
                    <input 
                        onChange={onChange} 
                        className={cl['input']} 
                        type="text" 
                        placeholder="Username" 
                        name="username" 
                    />

                    <label className={cl['label']} htmlFor="password">Password</label>
                    <input 
                        onChange={onChange} 
                        className={cl['input']} 
                        type="password" 
                        placeholder="Password" 
                        name="password" 
                    />

                    <button className={cl['button']}>Log In</button>
                </form>
            </div>
        </>
    )
}

export default Login
