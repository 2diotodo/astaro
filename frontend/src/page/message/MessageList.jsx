import React, { useState, useEffect} from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { getMessageList } from "@features/messageSlice/messageListSlice";
import MessageRoom from "@/component/message/MessageRoom";

const MessageRoomList = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -10%);
  color: white;
  text-align: center;
`;

const MessageListPage = () => {
  const [messageRooms, setMessageRooms] = useState([]);

  const dispatch = useDispatch();
    
  useEffect(() => {
    dispatch(getMessageList(1)).then((data) => {
        console.log(data.payload); // 첫번째 payload 출력
        setMessageRooms(data.payload);
    });
  }, []);
    
  return (
    <div>
      <MessageRoomList>
        <h2>채팅방</h2>
        {messageRooms.map((messageRooms, index) => (
          <MessageRoom
            key={index}
            nickname={messageRooms.nickname}
            lastMessage={messageRooms.lastMessage}
            n={messageRooms.n}
            remainedTime={messageRooms.remainedTime}
          />
        ))}
      </MessageRoomList>
      
    </div>
  );
};

export default MessageListPage;