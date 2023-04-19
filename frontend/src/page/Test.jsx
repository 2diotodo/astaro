import React, { useEffect, useState } from "react";
import "../css/default.css";
import "../css/noite.css";
import { useNavigate } from "react-router-dom";
import WelcomeCard from "../component/WelcomeCard";
import ColContainer from "../component/layout/ColContainer";
import GapH from "../component/layout/GapH";
import Planet1 from "../assets/img/planet1.png";
import Planet2 from "../assets/img/planet2.png";
import Planet3 from "../assets/img/planet3.png";

function Test() {
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

  const cards = [
    {
      src: Planet1,
    },
    {
      src: Planet2,
    },
    {
      src: Planet3,
    },
  ];

  function handleStar() {
    const script = document.createElement("script");
    script.src = "./js/status.js";
    script.async = true;
    document.body.appendChild(script);
  }
  useEffect(() => {
    handleStar();
  }, []);

  return (
    <>
      <div className="noite"></div>
      <div className="constelacao"></div>
      <ColContainer
        style={{
          position: "absolute",
          left: "50%",
          marginLeft: "-97px",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: "50px",
            opacity: "0.7",
            position: "relative",
            top: "10%",
          }}
        >
          astaro
        </div>
        <div
          style={{
            color: "white",
            fontSize: "20px",
            fontWeight: "lighter",
            opacity: "0.7",
          }}
        >
          당신은 운명을 믿습니까?
        </div>
        <ColContainer>
          {cards.map((card, index) => (
            <WelcomeCard
              key={card.url}
              title={card.title}
              content={card.content}
              url={card.src}
              width={card.width}
              background={card.background}
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
        </ColContainer>
        <button
          style={{ zIndex: "1" }}
          onClick={() => handleButtonClick("right")}
        >
          넘어가기
        </button>
        <GapH height="30px" />
      </ColContainer>
      {/*<div className="lua">*/}
      {/*  <div className="textura"></div>*/}
      {/*</div>*/}

      <div className="chuvaMeteoro"></div>
      <div className="floresta">
        <img src="bgTree.png" alt="" />
      </div>
      <script src="https://unpkg.com/@h0rn0chse/night-sky/dist/bundle.min.js" />
    </>
  );
}

export default Test;
