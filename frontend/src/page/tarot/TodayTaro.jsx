import React, { useEffect, useRef, useState } from "react";
import Button from "@component/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";

import "@css/flip.css";
import "@css/carousel.css";

import { EffectCoverflow, EffectFlip } from "swiper";
import styled from "styled-components";
import Small from "@component/text/Small";
import GapH from "@component/layout/GapH";
import axios from "axios";
import { TodayResult } from "@page/tarot/TodayResult";
import TodayTarotFade from "@component/tarot/TodayTarotFade";

export default function TodayTaro() {
  const elements = [];
  const [fade, setFade] = useState(false);

  const [resultFlag, setResultFlag] = useState(false);
  for (let i = 0; i < 22; i++) {
    elements.push(
      <SwiperSlide className="carousel-swiper-slide">
        <div className="flip">
          <div className="card">
            <div className="front"></div>
          </div>
        </div>
      </SwiperSlide>
    );
  }

  const todayResult = () => {
    document
      .querySelector(".swiper-slide-active")
      .classList.add("selected-today");
    setTimeout(() => {
      setResultFlag(true);
    }, 5000);
    setTimeout(() => {
      setFade(true);
    }, 4000);
  };

  const swiperRef = useRef(null);

  return (
    <>
      {fade ? <TodayTarotFade /> : <></>}
      {resultFlag ? (
        <TodayResult />
      ) : (
        <>
          <Swiper
            ref={swiperRef}
            effect={"coverflow"}
            loop={true}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 30,
              depth: 70,
              modifier: 1,
              slideShadows: true,
            }}
            modules={[EffectCoverflow, EffectFlip]}
            className="mySwiper"
            initialSlide={5}
          >
            {elements}
          </Swiper>
          <Small>이 카드를 뽑으시겠습니까?</Small>
          <br />
          <Button onClick={todayResult}>결과보기</Button>
          <GapH height="15vh" />
        </>
      )}
    </>
  );
}

const LinkWrapper = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  z-index: 1;
  position: relative;
`;
