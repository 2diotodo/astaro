import styled from "styled-components";

const Button = styled.button.attrs((props) => ({}))`
  width: ${(props) => props.width || "100px"};
  height: ${(props) => props.height || "30px"};
  background-color: ${(props) => props.backgroundColor || "transparent"};
  color: ${(props) => props.color || "white"};
  border: ${(props) => props.border || "1px solid #fff"};
  margin: ${(props) => props.margin || "0"};
  cursor: pointer;
  font-size: ${(props) => props.fontSize || "16px"};
  font-family: ${(props) => props.fontFamily || "TAEBAEKmilkyway"};
  letter-spacing: ${(props) => props.letterSpacing || ".2em"};
  box-shadow: -1px -1px 10px 0px gray, -1px -1px 5px 0px gray,
    1px 1px 10px 0px gray, 1px 1px 5px 0px gray;
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
