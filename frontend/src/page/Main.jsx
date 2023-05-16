// Library Import
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Icons or Component Import
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import CardNav from "../component/CardNav.js";

const TextFadeIn = keyframes`
  from {
    opacity: 0;
    filter: blur(22px);
  }
  to {
    opacity: 1;
    filter: blur(0);
  }
`;

const FadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Scale = keyframes`
  100% {
    transform: scale(1);
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;

  width: 95%;
  height: 20%;
`;
// transform: translateY(125%);
// animation: ${Slide} 0.6s 1.8s linear forwards;
const Title = styled.div`
  margin: 5px;
  transform: scale(0.94);
  font-size: 56px;
  font-weight: 900;
  color: white;
  animation: ${Scale} 0.1s forwards cubic-bezier(0.5, 1, 0.89, 1);
`;

// animation: ${Scale} 0.1s forwards cubic-bezier(0.5, 1, 0.89, 1);
const Subtitle = styled.div`
  margin: 5px;
  transform: scale(0.94);
  font-size: 20px;
  font-weight: 500;
  color: white;
  animation: ${Scale} 0.1s forwards cubic-bezier(0.5, 1, 0.89, 1);
`;

const TextStyle = styled.span`
  opacity: 0;
  animation: ${TextFadeIn} 1s linear forwards;
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  width: 95%;
  height: 50%;
  opacity: 0;

  background-color: transparent;
  animation: ${FadeIn} 1s 1s linear forwards;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 95%;
  height: 10%;

  opacity: 0;

  background-color: transparent;
  animation: ${FadeIn} 1s 1.1s linear forwards;
`;

const Button = styled.button`
  width: 50%;
  height: 40%;

  border: 2px;
  border-radius: 24px;

  font-size: 16px;

  color: white;
  border-color: white;
  background-color: transparent;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  width: 100%;
  height: 100%;
`;

export function Main() {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(0);

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

  return (
    <>
      <Wrapper>
        <TitleContainer>
          <Subtitle>
            <TextStyle>오늘도 별처럼 빛나는 당신에게</TextStyle>
          </Subtitle>
          <Title>
            <TextStyle>ASTARO</TextStyle>
          </Title>
        </TitleContainer>
        <NavContainer>
          <div>
            <MdArrowLeft onClick={clickLeftArrowBtn} color="white" size={60} />
          </div>
          <CardNav activeCard={activeCard}></CardNav>
          <div>
            <MdArrowRight
              onClick={clickRightArrowBtn}
              color="white"
              size={60}
            />
          </div>
        </NavContainer>
        <LoginContainer>
          <Button
            onClick={() => {
              navigate("/member/login");
            }}
          >
            로그인
          </Button>
          <Button
            onClick={() => {
              navigate("/member/signup");
            }}
          >
            회원가입
          </Button>
        </LoginContainer>
      </Wrapper>
    </>
  );
}
