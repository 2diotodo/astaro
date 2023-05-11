import React from 'react';
import ColContainer from "@component/layout/ColContainer";
import GapH from "@component/layout/GapH";
import Small from "@component/text/Small";
import Button from "@component/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function StoryPage() {
  const navigate = useNavigate();
  const dalleImgUrl = useSelector((state) => state.tarot.stateImgUrl);
  const respStory = useSelector((state) => state.tarot.stateStory);
  const SendToStar = () => {
    navigate("/star");
  }
  return (
    <>
      <ColContainer
        id="slide-from-story"
      >
        <ColContainer width="80vw" gap="35px" height="100%">
          <GapH height="5px"/>
          <div className="story-image">
            <img alt="img" src={dalleImgUrl} width="80%"/>
          </div>
          <div style={{overflowY:"scroll", height:"35vh"}}>
            <Small lineHeight="2em">{respStory}</Small>
            <GapH height="40px"/>
            <Button width="200px" onClick={SendToStar}>별똥별로 보내기</Button>
          </div>
        </ColContainer>
      </ColContainer>
    </>
  );
};

export default StoryPage;