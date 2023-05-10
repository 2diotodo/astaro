import React, { useState, useEffect, useSelector } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updateMessageList } from "@features/messageSlice/messageListSlice";
import { getMessageList } from "@features/messageSlice/messageListSlice";
import { Popper } from '@mui/material';
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const RoomContainer = styled.div`
  border-radius: 10px;
  background-color: rgba(241, 241, 241, 0.2);
  padding: 10px;
  width: 300px;
  margin: 10px;
`;

const Nickname = styled.div`
  font-size: 20px;
  margin-bottom: 5px;
  text-align: left;
  width: 300px;
`;

const LastMessage = styled.div`
  font-size: 20px;
  margin-bottom: 5px;
  text-align: left;
  line-height: 1.5;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 5px;
  margin-bottom: 5px;
  background-image: linear-gradient(
    to right,
    rgba(0, 17, 169, 0.6) ${props => props.n * 10}%,
    rgba(217, 217, 217, 1.0) ${props => props.n * 10 + 25}%,
    rgba(217, 217, 217, 1.0) ${props => 100 - props.n * 10 - 25}%,
    rgba(217, 217, 217, 1.0) ${props => 100 - props.n * 10}%
  );
`;

const RoomHeader = styled.div`
  display: flex;
  justifyContent: space-between;
`;

const PopperContent = styled.div`
  color : black;
  background-color: rgba(217, 217, 217, 0.9);
  margin-left: -85px;
`;

const MessageRoom = ({ messageRoom, setMessageRooms, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const id = open ? 'simple-popper' : undefined;

  const dispatch = useDispatch();

  const handleClick = (event) => {
    if (!isOpen && !open) {
        setOpen((prevOpen) => !prevOpen);
        setAnchorEl(event.currentTarget);
        setIsOpen(true);
    }
    if (isOpen && open) {
      setOpen(false);
      setIsOpen(false);
    }
  };

  const memberSeq = 1;

  const leaveMessageRoom = (event) => {
    if (memberSeq == messageRoom.senderSeq) {
      console.log("messageRoom.senderSeq"+messageRoom.senderSeq)
      messageRoom.isLeaveSender = true;
    } else {
      console.log("messageRoom.receiverSeq"+messageRoom.receiverSeq)
      messageRoom.isLeaveReceiver = true;
    }
    dispatch(updateMessageList(messageRoom)).then((data) => {
      console.log(data.payload); // 첫번째 payload 출력
      dispatch(getMessageList(memberSeq)).then((data) => {
        console.log(data.payload); // 첫번째 payload 출력
        setMessageRooms(data.payload);
    });
    });
    setOpen(false);
    setIsOpen(false);
  };

  const goToRoom = (event) => {
    navigate(`/star/chat/${messageRoom.seq}`);
  };

  return (
    <div>
      <RoomContainer>
        <RoomHeader>
          <Nickname>{messageRoom.nickname}</Nickname>
          <BsThreeDots onClick={handleClick}></BsThreeDots>
        </RoomHeader>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <PopperContent>
            남은시간 {messageRoom.remainedTime}
          </PopperContent>
          <PopperContent onClick={leaveMessageRoom}>
            채팅방 나가기
          </PopperContent>
        </Popper>
        <HorizontalLine n={messageRoom.n} />
        <LastMessage onClick={goToRoom}>{messageRoom.lastMessage}</LastMessage>
      </RoomContainer>
    </div>
  );
};

export default MessageRoom;