import React from 'react'
import cl from './Home.module.css'
import Friends from '@components/Friends/Friends'
import Chat from '@components/Chat/Chat'
import { useLazyGetUserQuery } from '@/api/userApi'


const Home: React.FC = () => {

    const [getUser] = useLazyGetUserQuery()
    
    React.useEffect(() => {
        (async function() {
            await getUser(null)
        })()

    }, [])

    return (
        <main className={cl.main}>
            <div className={cl['inner-main']}>

                <Friends />
                <Chat />

            </div>
        </main>
    )
}

export default Home
