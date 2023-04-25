import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chatRoom: [],   // 채팅방 목록
    selectedChatRoom: null, // 선택된 채팅방
    messages: [],   // 선택된 채팅방의 메시지 목록
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChatRooms: (state, action) => {
            state.chatRooms = action.payload;
        },
        setSelectedChatRoom: (state, action) => {
            state.selectedChatRoom = action.payload;
        },
        setMessages: (state, action) => {
          state.messages = action.payload;
        },
        addMessage: (state, action) => {
          state.messages.push(action.payload);
        },
    }
});

export const { setChatRooms, setSelectedChatRoom, setMessages, addMessage } = chatSlice.actions;
export default chatSlice.reducer;