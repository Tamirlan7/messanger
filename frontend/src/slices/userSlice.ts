import { IFriend, IMessage } from "@/types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IState {
    selectedFriend: IFriend | null,
    chatMessages: IMessage[]
}

const initialState: IState = {
    selectedFriend: null,
    chatMessages: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        selectFriend(state, action: PayloadAction<IFriend>) {
            state.selectedFriend = action.payload
        },
        addChatMessage(state, action: PayloadAction<IMessage>) {
            state.chatMessages.push(action.payload)
        },
        setMessagesFromServer(state, action: PayloadAction<IMessage[]>) {
            state.chatMessages = action.payload
        }
    }
})


export const { selectFriend, addChatMessage, setMessagesFromServer } = userSlice.actions
export default userSlice.reducer
