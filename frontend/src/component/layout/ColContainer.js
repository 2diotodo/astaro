import styled from "styled-components";

const ColContainer = styled.div`
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "100%"};
  display: flex;
  flex-direction: ${(props) => props.direction || "column"};
  justify-content: ${(props) => props.justify || "center"};
  align-items: ${(props) => props.align || "center"};
  background-color: ${(props) => props.background || "transparent"};
  position: ${(props) => props.position || "static"};
  gap: ${(props) => props.gap || "0"};
  border: ${(props) => props.border || "none"};
  border-radius: ${(props) => props.borderRadius || "0"};
  border-color: ${(props) => props.borderColor || "transparent"};
  border-top: ${(props) => props.borderTop || "none"};
  border-top-color: ${(props) => props.borderTopColor || "transparent"};
  padding-left: ${(props) => props.paddingLeft || "0"};
  padding-right: ${(props) => props.paddingRight || "0"};
  cursor: ${(props) => props.cursor || "default"};
  overflow-y: ${(props) => props.overflowY || "none"};
`;

export default ColContainer;
