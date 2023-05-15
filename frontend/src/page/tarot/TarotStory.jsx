import React from "react";
import { useSelector } from "react-redux";
import Small from "@component/text/Small";
import ColContainer from "@component/layout/ColContainer";
import GapH from "@component/layout/GapH";
import { useNavigate } from "react-router-dom";
import Button from "@component/Button";
import UpDownContainer from "@component/layout/UpDownContainer";
import RowContainer from "@component/layout/RowContainer";
import GapW from "@component/layout/GapW";

function TarotStory() {
  const navigate = useNavigate();
  const videoUrl = useSelector((state) => state.tarot.stateVideoUrl);
  const story = useSelector((state) => state.tarot.stateStory);
  function goToHome(){
    navigate("/home");
  }

  function goToShootingStar(){
    navigate("/star");
  }
  return (
    <UpDownContainer style={{overflowY:"scroll"}}>
    <ColContainer>
      <video controls width="80%" autoPlay>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <GapH height={"30px"}/>
      <div style={{width:"80%", maxWidth:"400px"}}>
        <Small style={{lineHeight:"2em"}}>{story}</Small>
      </div>
      <GapH height={"30px"}/>
      <RowContainer>
      <Button onClick={goToHome}>홈으로</Button>
        <GapW width={"30px"}/>
        <Button onclick={goToShootingStar} width={"150px"}>별똥별로 보내기</Button>
      </RowContainer>
    </ColContainer>
    </UpDownContainer>
  );
};

export default TarotStory;