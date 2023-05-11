import React, { useState, useEffect} from "react";
import styled from "styled-components";
import MessageInput from "../../component/shootingStar/MessageInput";

const TaroStory = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -10%);
  color: white;
  text-align: center;
`;

const StoryVideo = styled.video`
  transform: translate(0%, 20%);
`;

const Content = styled.div`
  transform: translate(0%, 50%);
  font-size: 20px;
  margin-bottom: 5px;
  text-align: left;
  line-height: 1.5;
`;

const MessageContainer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 20%;
`;

const Container = styled.div`
  width: 100%;
  transform: translate(0%, -20%);
  max-width: 60em;
  margin: 0 auto;
  padding-bottom: 5em;
  background: black;
  perspective: 100em;
`;

const Carousel = styled.div`
  width: 20em;
  height: 20em;
  margin: 0 auto;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
  transform: rotateY(${props => (props.n) *(-90)}deg)
`;

const Slide = styled.div`
  width: 100%;
  position: absolute;
  width: 20em;
  height: 50em;
  background: black;
  overflow: hidden;
`;

const Back = styled(Slide)`
  transform: translateZ(-10em) rotateY(180deg);
`;

const Right = styled(Slide)`
  transform: rotateY(90deg) translateX(10em);
  transform-origin: top right;
`;

const Left = styled(Slide)`
  transform: rotateY(-90deg) translateX(-10em);
  transform-origin: center left;
`;

const Front = styled(Slide)`
  transform: translateZ(10em);
`;

function TaroStoryPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextSlide, setNextSlide] = useState(null);
  const [TouchX, setTouchX] = useState(null);

  const handleSendMessage = (message) => {
    console.log(message);
  };

  const handleTouchStart = (event) => {
    const initialTouchX = event.touches[0].clientX;
    setTouchX(initialTouchX);
  };

  const handleTouchMove = (event) => {
    console.log(TouchX);
    if (TouchX === null) {
      return;
    }
    
    const currentTouchX = event.touches[0].clientX;
    const diffX = TouchX - currentTouchX;

    if (diffX > 0) {
      setNextSlide(currentSlide + 1);
    } else {
      if (currentSlide > 0) {
        console.log(currentSlide);
        setNextSlide(currentSlide - 1);
      }
    }
    setTouchX(null);
  };
  
  const handleTouchEnd = () => {
    setCurrentSlide(nextSlide);
    setNextSlide(null);
  };

  return (
    <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <Container>
        <Carousel n={currentSlide}>
          <Front>
          <div>
      <TaroStory>
        <StoryVideo autoPlay muted loop source width="320" height="320">
          <source
            src="https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/dudwls624/final.mp4"
            type="video/mp4"
          ></source>
        </StoryVideo>
        <Content>
          1한때 멀고 먼 왕국에 제왕님이 살았습니다. 제왕님은 자신의 권위와 통치력으로 수많은 사람들…왕님은 외로움을 떨치고, 자신이 사랑하는 사람과 함께 하며 행복한 삶을 살게 되었습니다.
        </Content>
      </TaroStory>
      <MessageContainer>
        <MessageInput onSubmit={handleSendMessage} MessageInput />
      </MessageContainer>
    </div>          </Front>
          <Right>
          <div>
      <TaroStory>
        <StoryVideo autoPlay muted loop source width="320" height="320">
          <source
            src="https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/dudwls624/final.mp4"
            type="video/mp4"
          ></source>
        </StoryVideo>
        <Content>
          2한때 멀고 먼 왕국에 제왕님이 살았습니다. 제왕님은 자신의 권위와 통치력으로 수많은 사람들…왕님은 외로움을 떨치고, 자신이 사랑하는 사람과 함께 하며 행복한 삶을 살게 되었습니다.
        </Content>
      </TaroStory>
      <MessageContainer>
        <MessageInput onSubmit={handleSendMessage} MessageInput />
      </MessageContainer>
    </div>          </Right>
          <Back>
          <div>
      <TaroStory>
        <StoryVideo autoPlay muted loop source width="320" height="320">
          <source
            src="https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/dudwls624/final.mp4"
            type="video/mp4"
          ></source>
        </StoryVideo>
        <Content>
          3한때 멀고 먼 왕국에 제왕님이 살았습니다. 제왕님은 자신의 권위와 통치력으로 수많은 사람들…왕님은 외로움을 떨치고, 자신이 사랑하는 사람과 함께 하며 행복한 삶을 살게 되었습니다.
        </Content>
      </TaroStory>
      <MessageContainer>
        <MessageInput onSubmit={handleSendMessage} MessageInput />
      </MessageContainer>
    </div>          </Back>
          <Left>
          <div>
      <TaroStory>
        <StoryVideo autoPlay muted loop source width="320" height="320">
          <source
            src="https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/dudwls624/final.mp4"
            type="video/mp4"
          ></source>
        </StoryVideo>
        <Content>
          4한때 멀고 먼 왕국에 제왕님이 살았습니다. 제왕님은 자신의 권위와 통치력으로 수많은 사람들…왕님은 외로움을 떨치고, 자신이 사랑하는 사람과 함께 하며 행복한 삶을 살게 되었습니다.
        </Content>
      </TaroStory>
      <MessageContainer>
        <MessageInput onSubmit={handleSendMessage} MessageInput />
      </MessageContainer>
    </div>          </Left>
        </Carousel>
      </Container>   
    </div>
  );
}

export default TaroStoryPage;