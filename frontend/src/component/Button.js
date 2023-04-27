import styled from "styled-components";

const Button = styled.button.attrs((props) => ({}))`
  width: ${(props) => props.width || "100px"};
  height: ${(props) => props.height || "35px"};
  background-color: ${(props) => props.backgroundColor || "transparent"};
  color: ${(props) => props.color || "white"};
  border: ${(props) => props.border || "1px solid white"};
  cursor: pointer;
  font-size: ${(props) => props.fontSize || "22px"};
  font-family: "TAEBAEKmilkyway";
  letter-spacing: ${(props) => props.letterSpacing || ".2em"};
  box-shadow: 0px 8px 15px rgba(255, 255, 255, 0.1);
  &:disabled {
    color: grey;
    opacity: 0.7;
    cursor: default;
  }

  &:visited {
  }
  &:hover {
  }
`;

export default Button;
