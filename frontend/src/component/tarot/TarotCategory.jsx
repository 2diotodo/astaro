import React from "react";
import GapH from "@component/layout/GapH";
import UpDownContainer from "@component/layout/UpDownContainer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import Small from "@component/text/Small";

function TarotCategory() {
  return (
    <UpDownContainer width="100%">
      <div
        style={{
          margin: "50px",
          color: "white",
          fontSize: "20px",
        }}
      >
        무엇을 고민하고 있나요?
      </div>
      <GapH height="50px" />
      <Swiper
        direction={"vertical"}
        slidesPerView={3}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="tarot-category-swiper"
        style={{ height: "20vh" }}
      >
        <SwiperSlide>
          <Small>연애</Small>
        </SwiperSlide>
        <SwiperSlide>
          <Small>결혼</Small>
        </SwiperSlide>
        <SwiperSlide>
          <Small>취직</Small>
        </SwiperSlide>
        <SwiperSlide>
          <Small>사업</Small>
        </SwiperSlide>
        <SwiperSlide>
          <Small>금전</Small>
        </SwiperSlide>
        <SwiperSlide>
          <Small>건강</Small>
        </SwiperSlide>
      </Swiper>
    </UpDownContainer>
  );
}

export default TarotCategory;
