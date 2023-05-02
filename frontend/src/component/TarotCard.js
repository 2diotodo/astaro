import styled from "styled-components";

const TarotCard = styled.div`
  position: absolute;
  width: 100px;
  height: 185px;
  border-radius: 5px;
  transition: box-shadow 0.2s ease-in-out, transform 0.5s ease-in-out;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 10px 5px #c8c8c8;
  }
`;

export default TarotCard;
