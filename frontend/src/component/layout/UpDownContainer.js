import styled from "styled-components";

const UpDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align || "auto"};
  justify-content: ${(props) => props.justify || "auto"};
  min-height: ${(props) => props.minHeight || "100vh"};
  height: ${(props) => props.height || "auto"};
  width: ${(props) => props.width || "auto"};
  background-color: ${(props) => props.background || "transparent"};
  position: ${(props) => props.position || "static"};
  z-index: ${(props) => props.zIndex || "auto"};
  top: ${(props) => props.top || "auto"};
  left: ${(props) => props.left || "auto"};
  transform: ${(props) => props.transform || "none"};
  box-shadow: ${(props) => props.boxShadow || "none"};
  border: ${(props) => props.border || "none"};
`;

export default UpDownContainer;
