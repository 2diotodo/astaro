import React, { useState, useEffect,  useRef} from "react";
import styled from "styled-components";
import MessageInput from "../../component/shootingStar/MessageInput";

const TaroStory = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 75%;
  overflow: hidden;
`;

const Head = styled.video`
  width: 100%;
  height: 5%;
`;

const StoryVideo = styled.video`
  width: 80%;
  aspect-radio: 1/1;
`;

const Content = styled.div`
  width: 80%;
  color: white;
  font-size: 16px;
  text-align: left;
  line-height: 1.5;
`;

const MessageContainer = styled.div`
  width: 100%;
  height: 20%;
`;

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
  perspective: 100em;
`;

const Carousel = styled.div`
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s linear;
  transform: rotateY(${props => (props.n) *(-90)}deg)
`;

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
  overflow: hidden;
`;

const Back = styled(Slide)`
  transform: translateZ(-10em) rotateY(180deg);
`;

const Right = styled(Slide)`
  transform: rotateY(90deg) translateX(50%);
  transform-origin: top right;
`;

const Left = styled(Slide)`
  transform: rotateY(-90deg) translateX(-50%);
  transform-origin: center left;
`;

const Front = styled(Slide)`
  transform: translateZ(10em);
`;


const TaroStoryPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextSlide, setNextSlide] = useState(null);
  const [TouchX, setTouchX] = useState(null);
  const [taroResult, setTaroResult] = useState([]);
  const [flag, setFlag] = useState(0);
  const videoFrontRef = useRef(null);
  const videoRightRef = useRef(null);
  const videoBackRef = useRef(null);
  const videoLeftRef = useRef(null);
  const [storyFront, setStoryFront] = useState("");
  const [storyRight, setStoryRight] = useState("");
  const [storyBack, setStoryBack] = useState("");
  const [storyLeft, setStoryLeft] = useState("");

  useEffect(() => {
    if (flag === 0) {
      setFlag(1);
      const newTaroResult1 = {
        story: 0,
        url: "https://astaro.s3.ap-northeast-2.amazonaws.com/drawing_process.mp4",
      };
      setTaroResult(prevState => [...prevState, newTaroResult1]);
      const newTaroResult2 = {
        story: 1,
        url: "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/dudwls624/final.mp4",
      };
      setTaroResult(prevState => [...prevState, newTaroResult2]);
    }
  }, []);

  useEffect(() => {
    if (currentSlide % 4 === 0) {
      videoFrontRef.current.src = taroResult[currentSlide]?.url;
      setStoryFront(taroResult[currentSlide]?.story);
      if (currentSlide !== 0) {
        videoLeftRef.current.src = taroResult[currentSlide - 1]?.url;
        setStoryLeft(taroResult[currentSlide - 1]?.story);
      }
      videoRightRef.current.src = taroResult[currentSlide + 1]?.url;
      setStoryRight(taroResult[currentSlide + 1]?.story);
      videoBackRef.current.src = '';
      setStoryBack('');
    }
    else if (currentSlide % 4 === 1) {
      videoRightRef.current.src = taroResult[currentSlide]?.url;
      setStoryRight(taroResult[currentSlide]?.story);
      if (currentSlide !== 0) {
        videoFrontRef.current.src = taroResult[currentSlide - 1]?.url;
        setStoryFront(taroResult[currentSlide-1]?.story);
      }
      videoBackRef.current.src = taroResult[currentSlide + 1]?.url;
      setStoryBack(taroResult[currentSlide + 1]?.story);
      videoLeftRef.current.src = '';
      setStoryLeft('');
    } else if (currentSlide % 4 === 2) {
      videoBackRef.current.src = taroResult[currentSlide]?.url;
      setStoryBack(taroResult[currentSlide]?.story);
      if (currentSlide !== 0) {
        videoRightRef.current.src = taroResult[currentSlide - 1]?.url;
        setStoryRight(taroResult[currentSlide - 1]?.story);
      }
      videoLeftRef.current.src = taroResult[currentSlide + 1]?.url;
      setStoryLeft(taroResult[currentSlide + 1]?.story);
      videoFrontRef.current.src = '';
      setStoryFront('');
    } else if (currentSlide % 4 === 3) {
      videoLeftRef.current.src = taroResult[currentSlide]?.url;
      setStoryLeft(taroResult[currentSlide]?.story);
      if (currentSlide !== 0) {
        videoBackRef.current.src = taroResult[currentSlide - 1]?.url;
        setStoryBack(taroResult[currentSlide - 1]?.story);
      }
      videoFrontRef.current.src = taroResult[currentSlide + 1]?.url;
      setStoryFront(taroResult[currentSlide + 1]?.story);
      videoRightRef.current.src = '';
      setStoryRight('');
    }
  }, [taroResult, currentSlide]);

  const handleSendMessage = (message) => {
    console.log(message);
  };

  const handleTouchStart = (event) => {
    const initialTouchX = event.touches[0].clientX;
    setTouchX(initialTouchX);
  };

  const handleTouchMove = (event) => {
    if (TouchX === null) {
      return;
    }
    
    const currentTouchX = event.touches[0].clientX;
    const diffX = TouchX - currentTouchX;

    if (diffX > 0) {
      setNextSlide(currentSlide + 1);
    } else {
      if (currentSlide > 0) {
        setNextSlide(currentSlide - 1);
      }
    }
    setTouchX(null);
  };
  
  const handleTouchEnd = () => {
    if (taroResult.length === nextSlide) {
      const newTaroResult = {
        story: nextSlide,
      };
      if (nextSlide % 2 === 0) {
        newTaroResult.url = "https://astaro.s3.ap-northeast-2.amazonaws.com/drawing_process.mp4";
      } else {
        newTaroResult.url = "https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/dudwls624/final.mp4";
      }
      setTaroResult([...taroResult, newTaroResult]);
    }
    if (nextSlide != null) {
      setCurrentSlide(nextSlide);
      setNextSlide(null);
    }
  };

  const handleVideoEnded = async () => {
    // await setNextSlide(currentSlide + 1);
    // handleTouchEnd();
  }
  return (
      <Container onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <Carousel n={currentSlide}>
        <Front>
            <Head></Head>
            <TaroStory>
              <StoryVideo
                ref={videoFrontRef}
                muted
                autoPlay
                onEnded={handleVideoEnded}
              >
                <source type="video/mp4" />
              </StoryVideo>
              <Content>
                {storyFront}한때 멀고 먼 왕국에 제왕님이 살았습니다. 제왕님은 자신의 권위와 통치력으로 수많은 사람들…왕님은 외로움을 떨치고, 자신이 사랑하는 사람과 함께 하며 행복한 삶을 살게 되었습니다.
              </Content>
            </TaroStory>
            <MessageContainer>
              <MessageInput onSubmit={handleSendMessage} MessageInput />
            </MessageContainer>
        </Front>
        <Right>
            <Head></Head>
            <TaroStory>
              <StoryVideo
                ref={videoRightRef}
                muted
                autoPlay
                onEnded={handleVideoEnded}
              >
                <source type="video/mp4" />
              </StoryVideo>
              <Content>
                {storyRight}한때 멀고 먼 왕국에 제왕님이 살았습니다. 제왕님은 자신의 권위와 통치력으로 수많은 사람들…왕님은 외로움을 떨치고, 자신이 사랑하는 사람과 함께 하며 행복한 삶을 살게 되었습니다.
              </Content>
            </TaroStory>
            <MessageContainer>
              <MessageInput onSubmit={handleSendMessage} MessageInput />
            </MessageContainer>
        </Right>
        <Back>
        <Head></Head>
            <TaroStory>
              <StoryVideo
                ref={videoBackRef}
                muted
                autoPlay
                onEnded={handleVideoEnded}
              >
                <source type="video/mp4" />
              </StoryVideo>
              <Content>
                {storyBack}한때 멀고 먼 왕국에 제왕님이 살았습니다. 제왕님은 자신의 권위와 통치력으로 수많은 사람들…왕님은 외로움을 떨치고, 자신이 사랑하는 사람과 함께 하며 행복한 삶을 살게 되었습니다.  
              </Content>
            </TaroStory>
            <MessageContainer>
              <MessageInput onSubmit={handleSendMessage} MessageInput />
            </MessageContainer>
        </Back>
        <Left>
        <Head></Head>
            <TaroStory>
              <StoryVideo
                ref={videoLeftRef}
                muted
                autoPlay
                onEnded={handleVideoEnded}
              >
                <source type="video/mp4" />
              </StoryVideo>
              <Content>
                {storyLeft}한때 멀고 먼 왕국에 제왕님이 살았습니다. 제왕님은 자신의 권위와 통치력으로 수많은 사람들…왕님은 외로움을 떨치고, 자신이 사랑하는 사람과 함께 하며 행복한 삶을 살게 되었습니다.  
              </Content>
            </TaroStory>
            <MessageContainer>
              <MessageInput onSubmit={handleSendMessage} MessageInput />
            </MessageContainer>
        </Left>
        </Carousel>
      </Container>   
  );
}

export default TaroStoryPage;