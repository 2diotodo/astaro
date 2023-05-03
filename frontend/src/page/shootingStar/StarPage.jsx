import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "@/css/swiper-custom.css";
import ShootingStars from "@/component/shootingStar/ShootingStarBackground";

SwiperCore.use([Pagination]);

const Category = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 2rem;
  color: white;
`;

const SlideWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const PaginationWrapper = styled.div`
  position: absolute;
  top: 5%; // 이 부분을 변경하였습니다.
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

  const handleSwiperChange = (index) => {
    setSwiperIndex(index);
  };

  useEffect(() => {
    setShootingStarsKey((prevKey) => prevKey + 1);
  }, [swiperIndex]);

  return (
    <div>
      <PaginationWrapper>
        <div className="swiper-pagination" />
      </PaginationWrapper>
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
        <SwiperSlide className='swiper-slide-page1'>
          <SlideWrapper>
            <Category>
              <p>연애</p>
            </Category>
            <ShootingStars key={shootingStarsKey} />
          </SlideWrapper>
        </SwiperSlide>
        <SwiperSlide className='swiper-slide-page1'>
          <SlideWrapper>
            <ShootingStars key={shootingStarsKey} />
            <Category>
              <p>재물</p>
            </Category>
          </SlideWrapper>
        </SwiperSlide>
        <SwiperSlide className='swiper-slide-page1'>
          <SlideWrapper>
            <ShootingStars key={shootingStarsKey} />
            <Category>
              <p>학업</p>
            </Category>
          </SlideWrapper>
        </SwiperSlide>
        <SwiperSlide className='swiper-slide-page1'>
          <SlideWrapper>
            <ShootingStars key={shootingStarsKey} />
            <Category>
              <p>진로</p>
            </Category>
          </SlideWrapper>
        </SwiperSlide>
      </StyledSwiper>
    </div>
  );
};

export default StarPage;
