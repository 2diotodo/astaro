import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 258px;
  height: 308px;
  background: ${(props) => props.background || "#ffffff"};
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  position: relative;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: ${(props) => (props.isActive ? "pointer" : "default")};
`;

const CardImage = styled.img`
  width: ${(props) => props.width || "100%"};
  position: absolute;
  top: 46.02%;
  object-fit: cover;
`;

function WelcomeCard({
  title,
  content,
  url,
  background,
  width,
  style,
  titleTop,
  contentTop,
  imgTop,
  color,
  onClick,
  isActive,
}) {
  return (
    <Card
      background={background}
      style={style}
      isActive={isActive}
      onClick={isActive ? onClick : undefined}
    >
      <div
        style={{
          position: "absolute",
          top: titleTop,
          textAlign: "center",
          color,
        }}
      >
        {title}
      </div>
      <div
        style={{
          position: "absolute",
          top: contentTop,
          whiteSpace: "pre-wrap",
          textAlign: "center",
          color,
        }}
      >
        {content}
      </div>
      <CardImage
        src={url}
        alt="card"
        width={width}
        style={{
          top: imgTop,
        }}
      />
    </Card>
  );
}

export default WelcomeCard;
