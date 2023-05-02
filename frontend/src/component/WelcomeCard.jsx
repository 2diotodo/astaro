import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 150px;
  height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: ${(props) => (props.isActive ? "pointer" : "default")};
`;

const CardImage = styled.img`
  width: ${(props) => props.width || "100%"};
  position: absolute;
  object-fit: cover;
`;

function WelcomeCard({
                       url,
                       background,
                       width,
                       style,
                       imgTop,
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
