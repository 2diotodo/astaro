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
  bottom: 30px;
`;

const TaroStoryPage = () => {
  const handleSendMessage = (message) => {
    console.log(message);
  };

  return (
    <div>
      <TaroStory>
        <StoryVideo autoPlay muted loop source width="320" height="320">
          <source
            src="https://a101-wedding101-pjt.s3.ap-northeast-2.amazonaws.com/dudwls624/final.mp4"
            type="video/mp4"
          ></source>
        </StoryVideo>
        <Content>
          한때 멀고 먼 왕국에 제왕님이 살았습니다. 제왕님은 자신의 권위와 통치력으로 수많은 사람들…왕님은 외로움을 떨치고, 자신이 사랑하는 사람과 함께 하며 행복한 삶을 살게 되었습니다.
        </Content>    
      </TaroStory>
      <MessageContainer>
        <MessageInput onSubmit={handleSendMessage} MessageInput />
      </MessageContainer>
    </div>
    );
};

export default TaroStoryPage;