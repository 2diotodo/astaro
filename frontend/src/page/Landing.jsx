// Library Import
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Icons or Component Import
import { HiChevronDown } from "react-icons/hi";
import GapH from "@component/layout/GapH";

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

const Shadow = keyframes`
  0% {
    box-shadow: 0 0 0 white;
  }
  50% {
    box-shadow: 0 0 20px white;
  }
  100% {
    box-shadow: 0 0 0 white;
  }
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
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
  justify-content: center;
  align-items: center;

  margin-bottom: 10px;
  width: 80%;
  max-width: 300px;

  & > span {
    opacity: 0;
    filter: blur(4);
    font-size: 20px;
    font-weight: 700;
    color: white;
  }
`;

const ContentTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin-bottom: 10px;
  width: 80%;
  max-width: 300px;

  & > span {
    opacity: 0;
    filter: blur(4);
    font-size: 24px;
    font-weight: 700;
    color: white;
  }
`;

const Text = styled.span`
  margin-left: 3px;
  margin-right: 3px;

  animation: ${FadeIn} 2.5s ${(props) => props.delay}s linear forwards;
`;

const Button = styled.button`
  border-radius: 15px;
  opacity: 0;
  color: white;
  border: 1px solid white;
  background-color: transparent;

  font-size: 16px;

  width: 50%;
  max-width: 300px;
  height: 30px;
  font-family: "TAEBAEKmilkyway";
  animation: ${FadeIn} 2.5s ${(props) => props.delay}s linear forwards,
    ${Shadow} 2s 3.5s linear infinite;
`;

const Landing = (props) => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(0);
  const [touchedX, setTochedX] = useState(0);
  const [touchedY, setTochedY] = useState(0);

  const handleDownBtn = () => {
    setActivePage(activePage + 1);
  };

  const onTouchStart = (e) => {
    setTochedX(e.changedTouches[0].screenX);
    setTochedY(e.changedTouches[0].screenY);
  };

  const onTouchEnd = (e) => {
    const distanceX = touchedX - e.changedTouches[0].screenX;
    const distanceY = touchedY - e.changedTouches[0].screenY;
    const vector = Math.abs(distanceY / distanceX);
    if (distanceY > 30 && vector > 2) setActivePage(activePage - 1);
    else if (distanceY < -30 && vector > 2) setActivePage(activePage + 1);
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
      <Wrapper
        onWheel={handleOnWheel}
        onTouchEnd={onTouchEnd}
        onTouchStart={onTouchStart}
      >
        {/* 내용물 : 0번 */}
        {activePage === 0 ? (
          <Container>
            <SubTitle>
              <Text delay={0.2}>오늘도</Text>
              <Text delay={0.4}>별처럼</Text>
              <Text delay={0.6}>빛나는</Text>
              <Text delay={0.8}>당신에게</Text>
            </SubTitle>
            <Title>
              <Text delay={1}>Astaro</Text>
            </Title>
            <GapH height="10vh" />
            <Button
              delay={1}
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
        {activePage === 1 ? (
          <Container>
            <ContentTitle>
              <Text delay={0.2}>"무엇이든</Text>
              <Text delay={0.4}>들어줄게!"</Text>
            </ContentTitle>
          </Container>
        ) : null}

        {/* 내용물 : 2번 */}
        {activePage === 2 ? (
          <Container>
            <ContentTitle>
              <Text delay={0.2}>"무엇이든</Text>
              <Text delay={0.4}>들어줄게!"</Text>
            </ContentTitle>
          </Container>
        ) : null}

        {/* 내용물 : 3번 */}
        {activePage === 3 ? (
          <Container>
            <ContentTitle>
              <Text delay={0.2}>"무엇이든</Text>
              <Text delay={0.4}>들어줄게!"</Text>
            </ContentTitle>
          </Container>
        ) : null}

        {/* 내용물 : 4번 */}
        {activePage === 4 ? (
          <Container>
            <ContentTitle>
              <Text delay={0.2}>"무엇이든</Text>
              <Text delay={0.4}>들어줄게!"</Text>
            </ContentTitle>
          </Container>
        ) : null}

        {/* 내용물 : 5번 */}
        {activePage === 5 ? (
          <Container>
            <ContentTitle>
              <Text delay={0.2}>"무엇이든</Text>
              <Text delay={0.4}>들어줄게!"</Text>
            </ContentTitle>
          </Container>
        ) : null}

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
