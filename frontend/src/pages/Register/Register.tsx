import React from "react"
import cl from './Register.module.css'
import { ILogin } from "@/types"
import { useLazyCheckAuthenticatedQuery, useRegisterMutation } from "@/api/authApi"
import { useNavigate } from "react-router-dom"


const Register: React.FC = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = React.useState<ILogin>() 
    const [confirmPassword, setConfirmData] = React.useState<string>('')
    const [register, {error}] = useRegisterMutation()
    const [passwordDoesNotMatch, setPasswordDoesNotMatch] = React.useState(false)
    const [checkAuthenticated] = useLazyCheckAuthenticatedQuery()

    function passwordNotMatch() {
        setPasswordDoesNotMatch(true)
    }

    /* 
        || FUNCTIONS || 
    */

    async function onRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if(formData?.password !== confirmPassword)
            return passwordNotMatch()
        
        
        formData && await register(formData).unwrap()
        await checkAuthenticated(null)
        !error && navigate('/')
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData((prev) => ({...prev as ILogin, [e.target.name]: e.target.value}))
    }

    return (
        <div className={cl['register-page']}>
            <div className={cl['background']}>
                <div className={cl['shape']}></div>
                <div className={cl['shape']}></div>
            </div>
            <form className={cl['form']} onSubmit={onRegister}>
                <h3 className={cl['form-title']}>Register Here</h3>

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

                <label className={cl['label']} htmlFor="confirm-password">Password</label>
                <input 
                    className={cl['input']} 
                    type="password" 
                    placeholder="Confirm Password" 
                    name="confirm-password" 
                    onChange={(e) => setConfirmData(e.target.value)}
                />
                {passwordDoesNotMatch && <span style={{color: 'red'}}>Passwords does not match</span>}
                <button className={cl['button']}>Sign Up</button>
            </form>
        </div>
    )
}

export default Register
