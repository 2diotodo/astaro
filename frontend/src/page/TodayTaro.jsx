import React, { useRef, useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { Link } from "react-router-dom";

import "@css/flip.css";
import "@css/carousel.css";
import slide_image from '@assets/img/Taro_back.png';


import { EffectCoverflow, EffectFlip } from "swiper";
import styled from "styled-components";

export default function TodayTaro() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);




  // useEffect(() => {
  //   const pos = swiperRef.current;
  //   if (pos.current) {
  //     pos.current.on("slideChange", () => {
  //       setIndex(pos.current.activeIndex);
  //       console.log(pos)
  //     });
  //   }
  //   console.log(Swiper)
  //   console.log(Swiper.activeIndex)
  //   console.log(Swiper.slides)
  //   console.log(swiperRef.activeIndex)
  //   console.log(swiperRef.Index)
  //   console.log(Index)
  //   console.log(swiperRef)
  //   console.log(swiperRef.current)
  //   console.log(swiperRef.current.activeIndex)
  //   console.log(setIndex)
  //   console.log(swiperRef.Swiper)
  //   // console.log(swiperRef.current.)
  // }, [swiperRef, Index]);

  // useEffect(() => {
  //   const swiper = swiperRef.current;
  //   if (swiper) {
  //     swiper.current.on("slideChange", () => {
  //       setActiveIndex(swiper.activeIndex);
  //     });
  //   }
  // }, [swiperRef]);








  return (
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
      >
        <SwiperSlide style={activeIndex === 0 ? { transform: "rotateY(180deg)" } : {}}>
          {/* <div className="flip">  
            <div className="card">
              <div className="front">                
              </div>              
              <div className="back">                
              </div>
            </div>
          </div> */}
            <img src={slide_image} alt="pic5" className="photos" />
          0
        </SwiperSlide>
        <SwiperSlide>
          <div className="flip">  
            <div className="card">
              <div className="front">                
              </div>              
              <div className="back">                
              </div>
            </div>
          </div>
          1
        </SwiperSlide>
        <SwiperSlide>
          <div className="flip">  
            <div className="card">
              <div className="front">                
              </div>              
              <div className="back">                
              </div>
            </div>
          </div>
          2
        </SwiperSlide>
        <SwiperSlide>
        <div className="flip">  
            <div className="card">
              <div className="front">                
              </div>              
              <div className="back">                
              </div>
            </div>
          </div>
          3
        </SwiperSlide>
        <SwiperSlide>
          <div className="flip">  
            <div className="card">
              <div className="front">                
              </div>              
              <div className="back">                
              </div>
            </div>
          </div>
          4
        </SwiperSlide>
        <SwiperSlide>
          <div className="flip">  
            <div className="card">
              <div className="front">                
              </div>              
              <div className="back">                
              </div>
            </div>
          </div>
          5
        </SwiperSlide>
        <SwiperSlide>
          <div className="flip">  
            <div className="card">
              <div className="front">                
              </div>              
              <div className="back">                
              </div>
            </div>
          </div>
          6
        </SwiperSlide>
        <SwiperSlide>
          <div className="flip">  
            <div className="card">
              <div className="front">                
              </div>              
              <div className="back">                
              </div>
            </div>
          </div>
          7
        </SwiperSlide>
        <SwiperSlide>
          <div className="flip">  
            <div className="card">
              <div className="front">                
              </div>              
              <div className="back">                
              </div>
            </div>
          </div>
          8
        </SwiperSlide>
        <SwiperSlide>
          <div className="flip">  
            <div className="card">
              <div className="front">                
              </div>              
              <div className="back">                
              </div>
            </div>
          </div>
          9
        </SwiperSlide>
        <SwiperSlide>
          <div className="flip">  
            <div className="card">
              <div className="front">                
              </div>              
              <div className="back">                
              </div>
            </div>
          </div>
          10
        </SwiperSlide>
        <SwiperSlide>
          <div className="flip">  
            <div className="card">
              <div className="front">                
              </div>              
              <div className="back">                
              </div>
            </div>
          </div>
          11
        </SwiperSlide>
        <SwiperSlide>
          <div className="flip">  
            <div className="card">
              <div className="front">                
              </div>              
              <div className="back">                
              </div>
            </div>
          </div>
          12
        </SwiperSlide>
        <SwiperSlide>
          <div className="flip">  
            <div className="card">
              <div className="front">                
              </div>              
              <div className="back">                
              </div>
            </div>
          </div>
          13
        </SwiperSlide>
        <SwiperSlide style={activeIndex === 14 ? { transform: "rotateY(180deg)" } : {}}>
          <div className="flip">  
            <div className="card">
              <div className="front">                
              </div>              
              <div className="back">                
              </div>
            </div>
          </div>
          14
        </SwiperSlide>








        {/* <SwiperSlide>
          <img src={slide_image} alt="pic5" className="photos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image} alt="pic5" className="photos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image} alt="pic5" className="photos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image} alt="pic5" className="photos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image5} alt="pic5" className="photos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image4} alt="pic5" className="photos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image3} alt="pic5" className="photos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image2} alt="pic5" className="photos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image1} alt="pic5" className="photos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image} alt="pic5" className="photos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image} alt="pic5" className="photos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image} alt="pic5" className="photos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image} alt="pic5" className="photos" />
        </SwiperSlide> */}
      </Swiper>
      <LinkWrapper>
        <Link to="/todayresult">결과보기</Link>
      </LinkWrapper>
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
`
