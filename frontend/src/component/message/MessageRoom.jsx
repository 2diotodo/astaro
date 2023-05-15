import React, { useState, useEffect, useSelector } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setNickname, updateMessageList } from "@features/messageSlice/messageListSlice";
import { getMessageList } from "@features/messageSlice/messageListSlice";
import { Popper } from '@mui/material';
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const RoomContainer = styled.div`
  border-radius: 10px;
  background-color: rgba(241, 241, 241, 0.2);
  color: white;
  padding: 2%;
  width: 90%;
  text-align: left;
  margin: 3%;
`;

const Nickname = styled.div`
  font-size: 100%;
  margin-bottom: 2%;
  width: 100%;
`;

const LastMessage = styled.div`
  font-size: 100%;
  margin-bottom: 2%;
  line-height: 150%;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 5%;
  margin-bottom: 2%;
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

  const leaveMessageRoom = (event) => {
    dispatch(updateMessageList(messageRoom)).then((data) => {
      console.log(data.payload); // 첫번째 payload 출력
      dispatch(getMessageList()).then((data) => {
        console.log(data.payload); // 첫번째 payload 출력
        setMessageRooms(data.payload);
    });
    });
    setOpen(false);
    setIsOpen(false);
  };

  const goToRoom = (event) => {
    dispatch(setNickname(messageRoom.nickname));
    navigate(`/star/chat/${messageRoom.seq}`);
  };

  return (
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
  );
};

export default MessageRoom;