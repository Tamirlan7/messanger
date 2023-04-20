import React from "react"
import cl from './Chat.module.css'
import Avatar from "@/UI/Avatar/Avatar"
import { ReactComponent as SendIcon } from '@/assets/send.svg'
import { useAppDispatch, useAppSelector } from "@/hooks/useRedus"
import NoFriendImg from '@/assets/no-friend-section-img.webp'
import useWebSocket from 'react-use-websocket'
import { addChatMessage, setMessagesFromServer } from "@/slices/userSlice"
import { ChatMessage, IMessage } from "@/types"
import { useLazyGetMessagesQuery } from "@/api/chatApi"
import { useGetUserQuery } from "@/api/userApi"


const Chat: React.FC = () => {
    /* WebSockets */

    const [socketUrl, setSocketUrl] = React.useState<string>(`ws://${process.env['SERVER_HOST_NAME']}/ws/chat`)
    const [messageInput, setMessageInput] = React.useState<string>('')
    const [getMessages] = useLazyGetMessagesQuery()

    const dispatch = useAppDispatch()
    const { chatMessages, selectedFriend } = useAppSelector(state => state.user)
    const { data: user } = useGetUserQuery(null)

    const chatRef = React.useRef<HTMLDivElement>(null)

    function handleMessageReceive(message: IMessage) {
        dispatch(addChatMessage(message))
    }

    const { sendMessage, lastMessage} = useWebSocket(socketUrl)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        sendMessage(JSON.stringify({
            message: messageInput,
            to: selectedFriend?.id
        }))

        dispatch(addChatMessage({
            recipient: selectedFriend?.id as number,
            message: messageInput,
            sender: user?.id as number,
            id: Date.now(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }))

        setMessageInput('')
        console.log(chatRef?.current?.scrollHeight)
    }

    React.useEffect(() => {
        if(lastMessage && lastMessage.data) {
            const data = JSON.parse(lastMessage?.data) as ChatMessage 
            const message: IMessage = {
                id: Date.now(),
                message: data.message,
                sender: user?.id as number,
                recipient: data.to,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            }
            handleMessageReceive(message)
        }
    }, [lastMessage])

    React.useEffect(() => {
        chatRef.current?.scrollTo({ top: chatRef?.current?.scrollHeight + 100, behavior: 'auto' })
    }, [lastMessage, chatMessages])

    React.useEffect(() => {
        (async function() {
            if(selectedFriend?.id) {
                const messages = await (await getMessages(selectedFriend?.id)).data
                messages && dispatch(setMessagesFromServer(messages))        
            }
        })()
    }, [selectedFriend])


    if(!selectedFriend) {
        return (
            <section className={cl['no-friend-section']}>
                <div className={cl['inner-no-friend-section']}>
                    <img src={NoFriendImg} alt="noFriendImg" />
                    <h1>Выберите друга для общения</h1>
                </div>
            </section>
        )
    }

    return (
        <section className={cl.section}>
            <div className={cl.upper}>
                <div className={cl.user}>
                    <Avatar title={selectedFriend.username} backgroundColor={selectedFriend.background_color} />
                    <h3 className={cl.username}>{selectedFriend.username}</h3>
                </div>
            </div>
            <div className={cl.chat} ref={chatRef}>
                {chatMessages.map((message) => 
                    message.recipient === selectedFriend.id ? (
                        <div key={message.id} className={cl['my-message-wrapper']}>
                            <div className={`${cl['my-message']} ${cl.message}`}>
                                {message.message}
                            </div>
                        </div>
                    ) : (
                            <div key={message.id} className={cl['friend-message-wrapper']}>
                                <div className={`${cl['friend-message']} ${cl.message}`}>
                                    {message.message}
                                </div>
                            </div>
                        )
                    )}
            </div>
            <form onSubmit={handleSubmit} className={cl['input-block']}>
                <input value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder="send a message" className={cl.input} type="text" />
                <button type="submit" className={cl.button}><SendIcon /></button>
            </form>
        </section>    
    )
}

export default Chat
