import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "@/css/swiper-custom.css";
import styled from "styled-components";
import Medium from "@component/text/Medium";
import ColContainer from "@component/layout/ColContainer";
import GapH from "@component/layout/GapH";
import Small from "@component/text/Small";
import { useSelector } from "react-redux";
import tarotCardArr from "@assets/TarotCardArr";
import TarotCard from "@component/TarotCard";

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
  bottom: 5%; // 이 부분을 변경하였습니다.
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
`


function TarotResult() {
  const [swiperIndex, setSwiperIndex] = useState(0);
  const tarotResults = useSelector((state) => state.tarot.stateResults);
  const dalleImgUrl = useSelector((state) => state.tarot.stateImgUrl);
  const respStory = useSelector((state) => state.tarot.stateStory);
  const tarotCardsInfo = useSelector((state) => state.tarot.stateCardsInfo);
  useEffect(() => {
    console.log(tarotCardsInfo);
  }, [swiperIndex]);
  return (
    <div>
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
        <SwiperSlide>
          <SlideWrapper>
            <ColContainer height={"100%"}>
              <TarotCard
                card={tarotCard}
                className="selected-tarocard result-tarocard"
              />
              <ResultDiv>
                <Small style={{lineHeight:"2em"}}>{tarotResults[index]}</Small>
              </ResultDiv>
            </ColContainer>
          </SlideWrapper>
        </SwiperSlide>)
      )}
        <SwiperSlide>
          <SlideWrapper>
            <ColContainer
              id="slide-from-story"
            >
              <ColContainer width="80vw" gap="35px" height="100%">
              <Medium>- 당신의 이야기 -</Medium>
                <div className="story-image">
                  <img alt="img" src={dalleImgUrl} width="256px" height="256px" />
                </div>
                <Small lineHeight="2em">{respStory}</Small>
              </ColContainer>
            </ColContainer>
          </SlideWrapper>
        </SwiperSlide>
      </StyledSwiper>
      <PaginationWrapper>
        <div className="swiper-pagination" />
      </PaginationWrapper>
    </div>
  );
};

export default TarotResult;