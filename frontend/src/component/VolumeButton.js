import styled from "styled-components";

const VolumeButton = styled.button.attrs((props) => ({}))`
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  background-color: ${(props) => props.backgroundColor || "transparent"};
  color: ${(props) => props.color || "white"};
  border: ${(props) => props.border || "none"};
  cursor: pointer;
  z-index: 1;
  position: absolute;
  left: 0;
  top: 0;
  margin-left: 20px;
  margin-top: 20px;
  font-size: ${(props) => props.fontSize || "16px"};
  font-family: ${(props) => props.fontFamily || "TAEBAEKmilkyway"};
  letter-spacing: ${(props) => props.letterSpacing || ".2em"};
`;

export default VolumeButton;
