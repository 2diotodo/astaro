// Library Import
import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Icons or Component Import
import Taro_back from "@assets/img/Taro_back.png";
import Taro_front1 from "@assets/img/Taro_front1.png";

// Styled Component : Rotate animation
const Rotate = keyframes`
  from {
    background-image: url(${Taro_back});
    transform: rotateY(-180deg);
  }
  to {
    opacity:1;
    transform: rotateY(0deg);
  }
`;

// Styled Component : FadeIn animation
const FadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Styled Component : Wrapper div
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 9px;

  width: 50%;
  aspect-ratio: 7/13;

  background-image: url(${(props) => props.image});
  background-position: center;
  background-size: cover;

  animation: ${Rotate} 1.2s ease-out forwards;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 10%;

  position: absolute;
  top: 83%;

  opacity: 0;

  font-size: 16px;
  font-weight: 700;

  color: white;
  animation: ${FadeIn} 0.8s 0.4s linear forwards;
`;

// Styled Component : Card div
const Card = styled.div`
  width: 60%;
  height: 60%;

  opacity: 0;

  position: absolute;
  top: 20%;

  background-image: url(${(props) => props.image});
  background-position: center;
  background-size: cover;

  animation: ${FadeIn} 0.8s 0.4s linear forwards;
`;

// Component 정의
const CardNav = (props) => {
  const navigate = useNavigate();

  const clickCardBtn = (url) => {
    navigate(url);
  };

  const cardSrc = [
    {
      text: "[ 오늘의 운세 ]",
      src: Taro_front1,
      navigate: "/todaytaro",
    },
    {
      text: "[ 고민 타로 ]",
      src: Taro_front1,
      navigate: "/tarot",
    },
    {
      text: "[ 별똥별 ]",
      src: Taro_front1,
      navigate: "/star",
    },
    {
      text: "[ 블랙홀 ]",
      src: Taro_front1,
      navigate: "/star/black-hole",
    },
    {
      text: "[ 마이 페이지 ]",
      src: Taro_front1,
      navigate: "/member/mypage/:id",
    },
  ];

  return (
    <Wrapper
      key={props.activeCard}
      image={cardSrc[props.activeCard].src}
      onClick={() => clickCardBtn(cardSrc[props.activeCard].navigate)}
    >
      <Card image={cardSrc[props.activeCard].src}></Card>
      <Title>{cardSrc[props.activeCard].text}</Title>
    </Wrapper>
  );
};

export default CardNav;
