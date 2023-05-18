import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "@/css/swiper-custom.css";
import ShootingStars from "@/component/shootingStar/ShootingStarBackground";
import { useDispatch } from "react-redux";
import { setCategory } from "@/features/shootingStarSlice/starSlice";
import Typist from 'react-typist';
import { keyframes } from 'styled-components';



SwiperCore.use([Pagination]);

const Category = styled.div`
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 1.5rem;
  color: white;
`;

const TypingMessage = styled(Typist)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 1.3rem;
  color: white;
`;

const SlideWrapper = styled.div`
  width: 100%;
  // height: 100%;
  z-index: 3;
  height: 100vh;
`;

const PaginationWrapper = styled.div`
  position: absolute;
  top: 95%;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledSwiper = styled(Swiper)`
  margin: 0;
  height: 100%;
`;

const blinking = keyframes`
  from {
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
  }

  to {
    background-color: rgba(255, 255, 255, 0.8);    
    box-shadow: 0 0 100px rgba(255, 255, 255, 0.8);
  }
`;

const ShowMessageButton = styled.button`
  position: absolute;
  top: 8%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 5vw;
  height: 3vh;
  margin: 30px auto;
  border-radius: 10px;
  border: 0;
  animation: ${blinking} 0.8s infinite alternate ease-in-out;
  z-index: 5;
  font-size: 1.2rem;
  font-weight: 700;
`;

const StarPage = () => {
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [shootingStarsKey, setShootingStarsKey] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const dispatch = useDispatch();
  const categories = ["결혼", "연애", "학업", "취직", "이직", "사업", "금전", "건강"];


  const handleSwiperChange = (index) => {
    setSwiperIndex(index);
    dispatch(setCategory(categories[index]));
  };

  const handleButtonClick = () => {
    setShowMessage(true);
    setIsTypingDone(false);
  };

  useEffect(() => {
    setShootingStarsKey((prevKey) => prevKey + 1);
  }, [swiperIndex]);

  return (
    <>
      <Category>
        {categories[swiperIndex]}
      </Category>
      <ShowMessageButton onClick={handleButtonClick}>
        i
      </ShowMessageButton>
      {showMessage && !isTypingDone && (
        <TypingMessage avgTypingDelay={200} onTypingDone={() => setTimeout(() => setIsTypingDone(true), 3000)}>
          쏟아지는 별똥별을 잡아 다른 이의 고민을 확인하세요
        </TypingMessage>
      )}
      <StyledSwiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={(swiper) => handleSwiperChange(swiper.activeIndex)}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          dynamicBullets: true,
          direction: "horizontal",
        }}
      >
        <SwiperSlide className="swiper-slide-page1">
          <SlideWrapper>
            <ShootingStars key={shootingStarsKey} />
          </SlideWrapper>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-page1">
          <SlideWrapper>
            <ShootingStars key={shootingStarsKey} />
          </SlideWrapper>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-page1">
          <SlideWrapper>
            <ShootingStars key={shootingStarsKey} />
          </SlideWrapper>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-page1">
          <SlideWrapper>
            <ShootingStars key={shootingStarsKey} />
          </SlideWrapper>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-page1">
          <SlideWrapper>
            <ShootingStars key={shootingStarsKey} />
          </SlideWrapper>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-page1">
          <SlideWrapper>
            <ShootingStars key={shootingStarsKey} />
          </SlideWrapper>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-page1">
          <SlideWrapper>
            <ShootingStars key={shootingStarsKey} />
          </SlideWrapper>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-page1">
          <SlideWrapper>
            <ShootingStars key={shootingStarsKey} />
          </SlideWrapper>
        </SwiperSlide>
      </StyledSwiper>
      <PaginationWrapper>
        <div className="swiper-pagination" />
      </PaginationWrapper>
    </>
  );
};

export default StarPage;
