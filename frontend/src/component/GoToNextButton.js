import styled from "styled-components";

const GoToNextButton = styled.button.attrs((props) => ({}))`
  margin: 0;
  height: 30px;
  width: 100px;
  text-align: center;
  background-size: 200% auto;
  color: white;
  font-family: "TAEBAEKmilkyway";
  border: 1px solid white;
  box-shadow: 0 0 10px white;
  border-radius: 10px;
  background-image: linear-gradient(
    to right,
    white 0%,
    #231a39 50%,
    black 100%
  );
  animation: gradation 1s alternate infinite;

  @keyframes gradation {
    100% {
      background-position: right center;
    }
  }
`;

export default GoToNextButton;
