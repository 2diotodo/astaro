import React from 'react';
import styled, { keyframes } from 'styled-components';
import BlackHoleInput from '@/component/shootingStar/BlackHoleInput';
import { AiOutlineSend } from "react-icons/ai";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  &:before {
    content: '';
    background-image: url('/img/blackhole.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 100vh;
    height: 100%;
    position: absolute;
    z-index: 0;
    animation: ${rotate} 10s linear infinite;
  }
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 1rem;
  z-index: 1;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const SendButton = styled.button`
  z-index: 1;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 1.5rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
`;


const SendText = styled.span`
  margin-left: 0.5rem;
  font-size: 1rem;
`;

const SendButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
	margin-right: 5rem;
`;

const BlackHolePage = () => {
  return (
    <Container>
      <Title>블랙홀</Title>
      <InputContainer>
        <BlackHoleInput placeholder="여기에 고민을 적어주세요..." />
      </InputContainer>
      <SendButtonContainer>
        <SendButton>
          <AiOutlineSend />
          <SendText>Send</SendText>
        </SendButton>
      </SendButtonContainer>
    </Container>
  );
};

export default BlackHolePage;
