import React from "react";
import { useSelector } from "react-redux";
import Small from "@component/text/Small";
function TarotStory() {
  const videoUrl = useSelector((state) => state.tarot.stateVideoUrl);
  const story = useSelector((state) => state.tarot.stateStory);
  return (
    <>
      <video controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Small>{story}</Small>
    </>
  );
};

export default TarotStory;