import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "@css/swiper-custom.css";
import styled from "styled-components";
import ColContainer from "@component/layout/ColContainer";
import GapH from "@component/layout/GapH";
import Small from "@component/text/Small";
import { useSelector } from "react-redux";
import TarotCard from "@component/tarot/TarotCard";
import Button from "@component/Button";
import TarotLoading from "@component/tarot/TarotLoading";
import { useNavigate } from "react-router-dom";

SwiperCore.use([Pagination]);

const SlideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const PaginationWrapper = styled.div`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledSwiper = styled(Swiper)`
  margin: 0;
  height: 100%;
`;

const ResultDiv = styled.div`
  width:80vw;
  max-width: 400px;
  bottom: 10vh;
`
function TarotResult() {
  const navigate = useNavigate();
  const [swiperIndex] = useState(0);
  const tarotResults = useSelector((state) => state.tarot.stateResults);
  const tarotCardsInfo = useSelector((state) => state.tarot.stateCardsInfo);
  const videoUrl = useSelector((state) => state.tarot.stateVideoUrl);

  useEffect(() => {
  }, [swiperIndex, videoUrl]);

  function goToStory(){
    navigate("/tarot/story");
  }
  return (
    <>
      <StyledSwiper
        spaceBetween={50}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          dynamicBullets: true,
          direction: "horizontal",
        }}
      >
      {tarotCardsInfo.map((tarotCard, index) => (
        <SwiperSlide key={tarotCard.id}>
          <SlideWrapper>
            <ColContainer height="100%">
              <TarotCard
                card={tarotCard}
                id="result-tarocard"
                className="selected-tarocard result-tarocard"
                style={{position:"relative"}}
              />
              <GapH height="20vh"/>
              <ResultDiv>
                <Small style={{lineHeight:"2em"}}>{tarotResults[index]}</Small>
              </ResultDiv>
            </ColContainer>
          </SlideWrapper>
        </SwiperSlide>)
      )}
        <SwiperSlide>
          <SlideWrapper>
            <ColContainer height="100%">
              <ResultDiv>
                <Small style={{lineHeight:"2em"}}>{tarotResults[3]}</Small>
                <GapH height="20vh"/>
                  {videoUrl ? <Button width="80%" onClick={goToStory}>이야기 보러가기</Button> : <TarotLoading/>}
              </ResultDiv>
            </ColContainer>
          </SlideWrapper>
        </SwiperSlide>
      </StyledSwiper>
      <PaginationWrapper>
        <div className="swiper-pagination" />
      </PaginationWrapper>
    </>
  );
};

export default TarotResult;