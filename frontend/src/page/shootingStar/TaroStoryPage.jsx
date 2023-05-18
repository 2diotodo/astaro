import React, { useState, useEffect,  useRef} from "react";
import styled from "styled-components";
import MessageInput from "../../component/shootingStar/MessageInput";
import { useDispatch } from "react-redux";
import { fetchTaroResult } from "@features/shootingStarSlice/starSlice"
import { sendMessage } from "@features/shootingStarSlice/chatSlice";
import { useSelector } from 'react-redux';

const TaroStory = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 120%;
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
  margin-top: 15px;
  width: 80%;
  height: 100%;
  color: white;
  font-size: 80%;
  text-align: left;
  line-height: 1.5;
  overflow-y: scroll;
`;

const MessageContainer = styled.div`
  width: 100%;
  height: 20%;
`;

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
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
  const dispatch = useDispatch();
  
  const category = useSelector(state => state.star.category);
  useEffect(() => {
    if (flag === 0) {
      setFlag(1);
      dispatch(fetchTaroResult(category)).then((data) => {
        console.log(data.payload);  
        setTaroResult(prevState => {
          const newTaroResult = [...prevState, data.payload];
          videoFrontRef.current.src = newTaroResult[currentSlide]?.videoUrl;
          setStoryFront(taroResult[currentSlide]?.story);
          return newTaroResult;
        });
        // setTaroResult(prevState => [...prevState, data.payload]);
        // videoFrontRef.current.src = taroResult[currentSlide]?.videoUrl;
        // setStoryFront(taroResult[currentSlide]?.story);
      });
      dispatch(fetchTaroResult(category)).then((data) => {
        console.log(data.payload);
        setTaroResult(prevState => [...prevState, data.payload]);
      });
    }
  }, []);

  useEffect(() => {
    if (currentSlide % 4 === 0) {
      videoFrontRef.current.src = taroResult[currentSlide]?.videoUrl;
      setStoryFront(taroResult[currentSlide]?.story);
      if (currentSlide !== 0) {
        videoLeftRef.current.src = taroResult[currentSlide - 1]?.videoUrl;
        setStoryLeft(taroResult[currentSlide - 1]?.story);
      }
      videoRightRef.current.src = taroResult[currentSlide + 1]?.videoUrl;
      setStoryRight(taroResult[currentSlide + 1]?.story);
      videoBackRef.current.src = '';
      setStoryBack('');
    }
    else if (currentSlide % 4 === 1) {
      videoRightRef.current.src = taroResult[currentSlide]?.videoUrl;
      setStoryRight(taroResult[currentSlide]?.story);
      if (currentSlide !== 0) {
        videoFrontRef.current.src = taroResult[currentSlide - 1]?.videoUrl;
        setStoryFront(taroResult[currentSlide-1]?.story);
      }
      videoBackRef.current.src = taroResult[currentSlide + 1]?.videoUrl;
      setStoryBack(taroResult[currentSlide + 1]?.story);
      videoLeftRef.current.src = '';
      setStoryLeft('');
    } else if (currentSlide % 4 === 2) {
      // videoBackRef.current.src = taroResult[currentSlide]?.videUrl;
      // setStoryBack(taroResult[currentSlide]?.story);
      if (currentSlide !== 0) {
        videoRightRef.current.src = taroResult[currentSlide - 1]?.videoUrl;
        setStoryRight(taroResult[currentSlide - 1]?.story);
      }
      videoLeftRef.current.src = taroResult[currentSlide + 1]?.videoUrl;
      setStoryLeft(taroResult[currentSlide + 1]?.story);
      videoFrontRef.current.src = '';
      setStoryFront('');
    } else if (currentSlide % 4 === 3) {
      videoLeftRef.current.src = taroResult[currentSlide]?.videoUrl;
      setStoryLeft(taroResult[currentSlide]?.story);
      if (currentSlide !== 0) {
        videoBackRef.current.src = taroResult[currentSlide - 1]?.videoUrl;
        setStoryBack(taroResult[currentSlide - 1]?.story);
      }
      videoFrontRef.current.src = taroResult[currentSlide + 1]?.videoUrl;
      setStoryFront(taroResult[currentSlide + 1]?.story);
      videoRightRef.current.src = '';
      setStoryRight('');
    }
  }, [taroResult, currentSlide]);

  const handleSendMessage = (message) => {
    console.log(taroResult[currentSlide].seq);
    dispatch(
      sendMessage({
        messageListSeq: 0,
        originalContent: message,
        resultSeq: taroResult[currentSlide].seq,
      })
    );
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
    console.log(diffX);
    if (Math.abs(diffX) > 10) {
      if (diffX > 0) {
        setNextSlide(currentSlide + 1);
      } else {
        if (currentSlide > 0) {
          setNextSlide(currentSlide - 1);
        }
      }
    }
    setTouchX(null);
  };
  
  const handleTouchEnd = () => {
    if (taroResult.length === nextSlide+1) {
      dispatch(fetchTaroResult(category)).then((data) => {
        console.log(data.payload);
        setTaroResult(prevState => [...prevState, data.payload]);
      });
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
                {storyFront}
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
                {storyRight}
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
                {storyBack}
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
                {storyLeft}
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