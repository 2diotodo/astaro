// Library Import
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Icons or Component Import
import Taro_back from "@assets/img/Taro_back.png";
import NavToday from "@assets/navigation/NavToday.jpg";
import NavTaro from "@assets/navigation/NavTaro.jpg";
import NavShootingStar from "@assets/navigation/NavShootingStar.jpg";
import NavBlackhole from "@assets/navigation/NavBlackhole.jpg";
import NavMypage from "@assets/navigation/NavMypage.jpg";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

// Styled Component : Rotate animation
const Rotate = keyframes`
  0% {
    background-image: url(${Taro_back});
    opacity:1;
    transform: rotateY(-180deg);
  }
  25% {
    opacity:1;
  }
  50% {
    opacity:0;
    background-image: url(${Taro_back});
    transform: rotateY(-90deg);
  }
  100% {
    opacity:1;
    transform: rotateY(0deg);
  }
`;

const CircleAni = keyframes`
  0%  {
    transform: scale(0) translateY(0px);
    opacity:0;
  }
  50% {
    transform: scale(0.65) translateY(-25px);
    opacity:1;
  }
  100% {
    transform: scale(1.3) translateY(-50px);
    opacity:0;
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

  width: 100%;
  height: 100%;

  animation: ${Rotate} 1.2s linear forwards;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 60%;
  height: 20%;
  margin-bottom: 3%;

  opacity: 0;

  font-size: 24px;
  font-weight: 700;

  color: white;
  animation: ${FadeIn} 0.8s 0.4s linear forwards;
`;

// Styled Component : Card div
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 55%;
  aspect-ratio: 1/1;

  border: 2px solid white;
  opacity: 1;
  z-index: 1;

  border-radius: 50%;
  box-shadow: inset 0 0 40px white, 0 0 20px white, 0 0 30px white,
    0 0 70px white;

  animation: ${Rotate} 1.2s linear forwards;

  background-image: url(${(props) => props.image});
  background-position: center;
  background-size: cover;
`;

const Circle = styled.div`
  width: 60%;
  aspect-ratio: 2/1;

  opacity: 0;
  border: 10px solid gray;
  border-radius: 50%;
  box-shadow: inset 0 0 40px gray, 0 0 20px gray, 0 0 30px gray, 0 0 70px gray;

  position fixed;
  top: 65%;
  left: 18%;
  z-index: -10;

  animation: ${CircleAni} 3s ${(props) => props.delay}s linear infinite;
`;

// Component 정의
const CardNav = () => {
  const navigate = useNavigate();
  const [touchedX, setTochedX] = useState(0);
  const [touchedY, setTochedY] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const isLoginState = useSelector((state) => state.loginCheck.isLogin);

  const clickCardBtn = (url) => {
    if (url === "/todaytaro") {
      navigate(url);
    } else if (isLoginState === true) {
      navigate(url);
    } else {
      alert("로그인이 필요한 기능입니다.");
      navigate("/login");
    }
  };

  const clickLeftArrowBtn = () => {
    if (activeCard === 0) {
      setActiveCard(4);
    } else {
      setActiveCard(activeCard - 1);
    }
  };

  const clickRightArrowBtn = () => {
    if (activeCard === 4) {
      setActiveCard(0);
    } else {
      setActiveCard(activeCard + 1);
    }
  };

  const onTouchStart = (e) => {
    setTochedX(e.changedTouches[0].screenX);
    setTochedY(e.changedTouches[0].screenY);
  };

  const onTouchEnd = (e) => {
    const distanceX = touchedX - e.changedTouches[0].screenX;
    const distanceY = touchedY - e.changedTouches[0].screenY;
    const vector = Math.abs(distanceX / distanceY);
    if (distanceX < -30 && vector > 2) {
      if (activeCard === 0) setActiveCard(4);
      else setActiveCard(activeCard - 1);
    } else if (distanceX > 30 && vector > 2) {
      if (activeCard === 4) setActiveCard(0);
      else setActiveCard(activeCard + 1);
    }
  };

  const cardSrc = [
    {
      text: "오늘의 운세",
      src: NavToday,
      navigate: "/todaytaro",
    },
    {
      text: "고민 타로",
      src: NavTaro,
      navigate: "/tarot",
    },
    {
      text: "별똥별",
      src: NavShootingStar,
      navigate: "/star",
    },
    {
      text: "블랙홀",
      src: NavBlackhole,
      navigate: "/star/black-hole",
    },
    {
      text: "마이 페이지",
      src: NavMypage,
      navigate: "/mypage",
    },
  ];

  return (
    <Wrapper>
      <Title>
        <HiChevronLeft onClick={clickLeftArrowBtn} size={40} />
        {cardSrc[activeCard].text}
        <HiChevronRight onClick={clickRightArrowBtn} size={40} />
      </Title>
      <Card
        key={activeCard}
        image={cardSrc[activeCard].src}
        onTouchEnd={onTouchEnd}
        onTouchStart={onTouchStart}
        onClick={() => clickCardBtn(cardSrc[activeCard].navigate)}
      ></Card>
      <Circle delay="0"></Circle>
      <Circle delay="1"></Circle>
      <Circle delay="2"></Circle>
    </Wrapper>
  );
};

export default CardNav;
