import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stars: [], // 선택된 채팅방의 메시지 목록
};

const starSlice = createSlice({
    name: "star",
    initialState,
    reducers: {
    }
});

export const { setChatRooms, setSelectedChatRoom, setMessages, addMessage } = starSlice.actions;
export default starSlice.reducer;