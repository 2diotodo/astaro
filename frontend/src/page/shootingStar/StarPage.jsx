import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "@/css/swiper-custom.css";

import { Background } from "@component/Background";
import ShootingStars from "@/component/shootingStar/ShootingStarBackground";

SwiperCore.use([Pagination]);

const Category = styled.div`
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
  bottom: 88%;
  left: 50%;
  transform: translateX(-50%);
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
      <Background />
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={(swiper) => handleSwiperChange(swiper.activeIndex)}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          dynamicBullets: true,
          direction: 'horizontal'
        }}
      >
        <SwiperSlide>
          <SlideWrapper>
            <ShootingStars key={shootingStarsKey} />
            <Category>
              <p>연애</p>
            </Category>
          </SlideWrapper>
        </SwiperSlide>
        <SwiperSlide>
          <SlideWrapper>
            <ShootingStars key={shootingStarsKey} />
            <Category>
              <p>재물</p>
            </Category>
          </SlideWrapper>
        </SwiperSlide>
        <SwiperSlide>
          <SlideWrapper>
            <ShootingStars key={shootingStarsKey} />
            <Category>
              <p>학업</p>
            </Category>
          </SlideWrapper>
        </SwiperSlide>
        <SwiperSlide>
          <SlideWrapper>
           <ShootingStars key={shootingStarsKey} />
            <Category>
              <p>진로</p>
            </Category>
          </SlideWrapper>
        </SwiperSlide>
      </Swiper>
      <PaginationWrapper>
        <div className="swiper-pagination" />
      </PaginationWrapper>
    </div>
  );
};

export default StarPage;
