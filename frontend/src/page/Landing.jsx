// Library Import
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Icons or Component Import
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

const Scale = keyframes`
  from {
    transform: scale(0.94);
  }
  to {
    transform: scale(1);
  }
`;

const FadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
    filter: blur(0);
  }
`;

const Blink = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;
`;

const Container = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;
  z-index: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transform: scale(0.94);
  width: 90%;
  height: 90%;

  animation: ${Scale} 1 linear forwards;
`;

const UpArrow = styled.div`
  position: absolute;
  top: 3%;
  left: 45%;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 10%;
  aspect-ratio: 1/1;
  animation: ${Blink} 2s linear infinite;
`;

const DownArrow = styled.div`
  position: absolute;
  bottom: 3%;
  left: 45%;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 10%;
  aspect-ratio: 1/1;
  animation: ${Blink} 2s linear infinite;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-bottom: 20px;

  & > span {
    opacity: 0;
    filter: blur(4);
    font-size: 70px;
    font-weight: 900;
    color: white;
  }
`;

const SubTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  margin-bottom: 10px;
  width: 80%;

  & > span {
    opacity: 0;
    filter: blur(4);
    font-size: 20px;
    font-weight: 700;
    color: white;
  }
`;

const Text = styled.span`
  animation: ${FadeIn} 2.5s ${(props) => props.delay}s linear forwards;
`;

const Button = styled.button`
  border: 1;
  border-radius: 15px;

  opacity: 0;
  color: white;
  border-color: white;
  background-color: transparent;

  font-size: 16px;

  width: 50%;
  height: 30px;

  animation: ${FadeIn} 2.5s ${(props) => props.delay}s linear forwards;
`;

const Landing = (props) => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(0);

  const handleUpBtn = () => {
    setActivePage(activePage - 1);
  };
  const handleDownBtn = () => {
    setActivePage(activePage + 1);
  };

  const handleOnWheel = (e) => {
    if (e.deltaY <= -100) {
      if (activePage > 0) setActivePage(activePage - 1);
    } else if (e.deltaY >= 100) {
      if (activePage < 5) setActivePage(activePage + 1);
    }
  };

  return (
    <>
      <Wrapper onWheel={handleOnWheel}>
        {/* 위로 가는 버튼 */}
        {activePage === 0 ? null : (
          <UpArrow onClick={handleUpBtn}>
            <HiChevronUp color="white" size={40}></HiChevronUp>
          </UpArrow>
        )}

        {/* 내용물 : 0번 */}
        {activePage === 0 ? (
          <Container>
            <SubTitle>
              <Text delay={0.1}>오늘도</Text>
              <Text delay={0.2}>별처럼</Text>
              <Text delay={0.3}>빛나는</Text>
              <Text delay={0.4}>당신에게</Text>
            </SubTitle>
            <Title>
              <Text delay={0.5}>Astaro</Text>
            </Title>
            <Button
              delay={0.6}
              onClick={() => {
                props.audio();
                navigate("/home");
              }}
            >
              서비스 바로가기
            </Button>
          </Container>
        ) : null}

        {/* 내용물 : 1번 */}
        {activePage === 1 ? <Container></Container> : null}

        {/* 내용물 : 2번 */}
        {activePage === 2 ? <Container></Container> : null}

        {/* 내용물 : 3번 */}
        {activePage === 3 ? <Container></Container> : null}

        {/* 내용물 : 4번 */}
        {activePage === 4 ? <Container></Container> : null}

        {/* 내용물 : 5번 */}
        {activePage === 5 ? <Container></Container> : null}

        {/* 아래로 가는 버튼 */}
        {activePage === 5 ? null : (
          <DownArrow onClick={handleDownBtn}>
            <HiChevronDown color="white" size={40}></HiChevronDown>
          </DownArrow>
        )}
      </Wrapper>
    </>
  );
};

export default Landing;
