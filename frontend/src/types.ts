export interface ILogin {
    username: string
    password: string
}

export interface IFriend {
    id: number
    username: string
    background_color: string
}

export interface IUser extends IFriend {
    friends: IFriend[]
}

export interface ChatMessage {
    message: string
    to: number
}

export interface IMessage {
    id: number
    message: string
    sender: number
    recipient: number
    created_at: string
    updated_at: string
}