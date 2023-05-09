import React, { useRef,useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import WelcomeCard from "../component/WelcomeCard";
import Taro_front1 from "@assets/img/Taro_front1.png";
import Taro_front2 from "@assets/img/Taro_front2.png";
import Taro_front3 from "@assets/img/Taro_front3.png";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "@css/carousel.css";
import { EffectCoverflow, EffectFlip } from "swiper";
// import "@css/flip.css";



const Wrapper = styled.div`
  height: 80%;
  width: 100%;
  position: absolute;
`;
const Subtitle = styled.div`
  margin: 10px;
  position: relative;
  top: 27%;
  color: white;
  font-size: 20px;
`;
const Title = styled.div`
  margin: 20px;
  color: white;
  position: relative;
  font-size: 55px;
  top: 25%;
`;
export function Main() {
  const swiperRef = useRef(null);

  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(0);
  const getTransformStyle = (index, activeCardIndex) => {
    if (index === activeCardIndex) {
      return "translateX(0)";
    }
    if (index === (activeCardIndex + 1) % cards.length) {
      return "translateX(40%)";
    }
    if (index === (activeCardIndex - 1 + cards.length) % cards.length) {
      return "translateX(-40%)";
    }
    if (index === (activeCardIndex + 2) % cards.length) {
      return "translateX(80%)";
    }
    return "translateX(-80%)";
  };
  const getOpacityStyle = (index, activeCardIndex) => {
    if (index === activeCardIndex) {
      return "1";
    }
    return "0.4";
  };

  const handleButtonClick = (direction) => {
    setActiveCard((prevIndex) =>
      direction === "left"
        ? (prevIndex - 1 + cards.length) % cards.length
        : (prevIndex + 1) % cards.length
    );
  };

  const navigateToTarot = () => {
    navigate("/tarot");
  };
  const navigateToResult = () => {
    navigate('/todaytaro')
  }
  const cards = [
    {
      src: Taro_front1,
    },
    {
      src: Taro_front2,
    },
    {
      src: Taro_front3,
    },
  ];

  return (
    <>
      <Wrapper>
        <Subtitle>당신의 생각이 운명의 설계자이다.</Subtitle>
        <Title>ASTARO</Title>
        {/* <div
          style={{
            position: "relative",
            top: "30%",
            left: "50%",
            transform: "translateX(-20%)",
          }}
        >
          {cards.map((card, index) => (
            <WelcomeCard
              url={card.src}
              width={card.width}
              titleTop={card.titleTop}
              contentTop={card.contentTop}
              imgTop={card.src}
              color={card.color}
              onClick={() => navigate(card.link)}
              isActive={index === activeCard}
              style={{
                position: "absolute",
                zIndex: index === activeCard ? 2 : 1,
                transition: "all 0.5s ease",
                transform: getTransformStyle(index, activeCard),
                opacity: getOpacityStyle(index, activeCard),
              }}
            />
          ))}
        </div>
        <button
          style={{ position: "relative", top: "80%", zIndex: "100" }}
          onClick={() => handleButtonClick("right")}
        >
          넘어가기
        </button> */}
        

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
          
          modules={[EffectCoverflow,]}
          className="mySwiper"
        >
        <SwiperSlide className="carousel-swiper-slide" >
          <div className="flip">  
              <div className="card">
                <div className="front">
                </div>
                <div className="back">                
                </div>
              </div>
            </div>
            
          </SwiperSlide>
          <SwiperSlide className="carousel-swiper-slide">
            <div className="flip">  
              <div className="card">
                <div className="front">                
                </div>              
                <div className="back">                
                </div>
              </div>
            </div>
            
          </SwiperSlide>
          <SwiperSlide className="carousel-swiper-slide">
            <div className="flip">  
              <div className="card">
                <div className="front">                
                </div>              
                <div className="back">                
                </div>
              </div>
            </div>
            
          </SwiperSlide>
          <SwiperSlide className="carousel-swiper-slide">
          <div className="flip">  
              <div className="card">
                <div className="front">                
                </div>              
                <div className="back">                
                </div>
              </div>
            </div>
            
          </SwiperSlide>
          <SwiperSlide className="carousel-swiper-slide">
          <div className="flip">  
              <div className="card">
                <div className="front">                
                </div>              
                <div className="back">                
                </div>
              </div>
            </div>
            
          </SwiperSlide>

          
          </Swiper>
        
        <button onClick={() => navigateToTarot()}>타로보러가기</button>
        <button onClick={() => navigateToResult()}>운세보러가기</button>
      </Wrapper>
    </>
  );
}

const Cont = styled.div`
  width : 300px;
  display: flex;
`