import React from "react"
import cl from './Friends.module.css'
import { ReactComponent as LogoutIcon } from "@/assets/logout.svg"
import { ReactComponent as AddIcon } from "@/assets/add.svg"
import Avatar from "@/UI/Avatar/Avatar"
import Users from "@components/Users/Users"
import { useAddFriendMutation, useGetUserQuery, useLazyGetUserQuery } from "@/api/userApi"
import { useLazyCheckAuthenticatedQuery, useLogoutMutation } from "@/api/authApi"
import ModalWindow from "@/UI/ModalWindow/ModalWindow"


const Friends: React.FC = () => {
    const {data: user} = useGetUserQuery(null)
    const [logout] = useLogoutMutation()
    const [checkAuthenticated] = useLazyCheckAuthenticatedQuery()
    const [isModal, setIsModal] = React.useState<boolean>(false)
    const [friendData, setFriendData] = React.useState<string>()
    const [addFriend, { error }] = useAddFriendMutation()
    const [getUser] = useLazyGetUserQuery()

    function openModalWindow() {
        setIsModal(true)
    }

    async function handleAddFriend(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            if (!friendData) return

            const body = Object.is(Number(friendData), NaN) ? {
                username: friendData
            } : {
                id: Number(friendData)
            }

            console.log(body)

            await addFriend(body)
                .unwrap()
                .then(() => {
                    getUser(null)
                    setIsModal(false)
                })
                .catch((err) => {
                    throw new Error(err)
                })

        } catch (err) {
            console.log(err)
        } finally {
            setFriendData('')
        }
    }

    async function handleLogout() {
        try {
            await logout(null).unwrap()
        } catch (err) {
            console.log(err)
        } finally {
            await checkAuthenticated(null)
        }
    }

    return (
        <section className={cl.section}>
            <div className={cl.upper}>
                <Avatar title={user ? user.username : 'Q'} backgroundColor={user ? user.background_color : 'pink'} />
                <div className={cl.id}>Your ID: {user?.id}</div> 
                <div className={cl.icons}>
                    <figure onClick={openModalWindow} title="add friend" className={cl.add}><AddIcon /></figure>
                    <figure onClick={handleLogout} role='button' title="logout" className={cl.logout}><LogoutIcon /></figure>
                </div>

                <ModalWindow className={cl['form-block']} isActive={isModal} setIsActive={setIsModal}>
                    <p className={cl['friend-paragraph']}>Ask your friend for his <b>id</b> <br /> or <b>username</b> in order to friend with him</p>
                    
                    <form onSubmit={handleAddFriend} className={cl.form}>
                        <input value={friendData} onChange={(e) => setFriendData(e.target.value)} type="text" className={error ? `${cl.input} ${cl.invalid}` : cl.input} placeholder="friend's username or id" />
                        {error && 'status' in error && error.status === 404 && 
                        <span className={cl.error}>User not found</span>}

                        {error && 'status' in error && error.status === 400 && error.data && (error.data as {'message': string})['message'] ? (
                            <span className={cl.error}>{JSON.stringify((error.data as {'message': string})['message'])}</span> as React.ReactNode
                        ) : <></>}

                        <button className={cl.submit} type="submit">Add Friend</button>
                    </form>
                </ModalWindow>
            </div>
            <Users />
        </section>    
    )
}

export default Friends
