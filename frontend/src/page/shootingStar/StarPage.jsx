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

const SlideWrapper = styled.div`
  width: 100%;
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

const StarPage = () => {
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [shootingStarsKey, setShootingStarsKey] = useState(0);
  const dispatch = useDispatch();
  const categories = ["결혼", "연애", "학업", "취직", "이직", "사업", "금전", "건강"];

  const handleSwiperChange = (index) => {
    setSwiperIndex(index);
    console.log(categories[index])
    dispatch(setCategory(categories[index]));
  };

  useEffect(() => {
    setShootingStarsKey((prevKey) => prevKey + 1);
  }, [swiperIndex]);

  return (
    <>
      <Category>
        {categories[swiperIndex]}
      </Category>
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
