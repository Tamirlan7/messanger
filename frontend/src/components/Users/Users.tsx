import React from "react"
import cl from './Users.module.css'
import Avatar from "@/UI/Avatar/Avatar"
import { useGetUserQuery } from "@/api/userApi"
import { IFriend } from "@/types"
import { useAppDispatch } from "@/hooks/useRedus"
import { selectFriend } from "@/slices/userSlice"


const Users: React.FC = () => {
    const {data: user} = useGetUserQuery(null)
    const dispatch = useAppDispatch()

    function handleSelectFriend(friend: IFriend) {
        dispatch(selectFriend(friend))
    }

    return (
        <div className={cl.users}>
            {user?.friends.map((friend) => (
                <div onClick={() => handleSelectFriend(friend)} key={friend.id} className={cl.user}>
                    <Avatar title={friend.username} backgroundColor={friend.background_color} />
                    <h3 className={cl.username}>{friend.username}</h3>
                </div>    
            ))}
        </div>
    )
}

export default Users
