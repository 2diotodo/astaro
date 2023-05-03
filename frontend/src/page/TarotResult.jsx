import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "@/css/swiper-custom.css";
import styled from "styled-components";
import UpDownContainer from "@component/layout/UpDownContainer";
import Medium from "@component/text/Medium";

SwiperCore.use([Pagination]);

const SlideWrapper = styled.div`
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

function TarotResult() {
  const [swiperIndex, setSwiperIndex] = useState(0);

  const handleSwiperChange = (index) => {
    setSwiperIndex(index);
  };

  useEffect(() => {
  }, [swiperIndex]);

  return (
    <UpDownContainer>
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
        <SwiperSlide>
          <SlideWrapper>
            <Medium>ㅎ1</Medium>
          </SlideWrapper>
        </SwiperSlide>
        <SwiperSlide>
          <SlideWrapper>
            <Medium>ㅎ2</Medium>
          </SlideWrapper>
        </SwiperSlide>
        <SwiperSlide>
          <SlideWrapper>
            <p>학업</p>
          </SlideWrapper>
        </SwiperSlide>
        <SwiperSlide>
          <SlideWrapper>
            <p>진로</p>
          </SlideWrapper>
        </SwiperSlide>
      </StyledSwiper>
      <PaginationWrapper>
        <div className="swiper-pagination" />
      </PaginationWrapper>
    </UpDownContainer>
  );
};

export default TarotResult;