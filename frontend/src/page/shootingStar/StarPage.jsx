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
  z-index: 4;
`;

const SlideWrapper = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 3;
`;

const PaginationWrapper = styled.div`
  position: absolute;
  top: 95%;
  left: 50%;
  transform: translateX(-50%);

  z-index: 1;
`;

const StyledSwiper = styled(Swiper)`
  margin: 0;
  height: 100%;

  z-index: 2;
`;

const StarPage = () => {
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [shootingStarsKey, setShootingStarsKey] = useState(0);
  const dispatch = useDispatch();

  const handleSwiperChange = (index) => {
    setSwiperIndex(index);
    const categories = ["연애", "재물", "학업", "진로"];
    dispatch(setCategory(categories[index]));
  };

  useEffect(() => {
    setShootingStarsKey((prevKey) => prevKey + 1);
  }, [swiperIndex]);

  return (
    <>
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
            <Category>
              <p>연애</p>
            </Category>
            <ShootingStars key={shootingStarsKey} />
          </SlideWrapper>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-page1">
          <SlideWrapper>
            <ShootingStars key={shootingStarsKey} />
            <Category>
              <p>재물</p>
            </Category>
          </SlideWrapper>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-page1">
          <SlideWrapper>
            <ShootingStars key={shootingStarsKey} />
            <Category>
              <p>학업</p>
            </Category>
          </SlideWrapper>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-page1">
          <SlideWrapper>
            <ShootingStars key={shootingStarsKey} />
            <Category>
              <p>진로</p>
            </Category>
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
