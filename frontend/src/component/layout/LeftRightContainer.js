import styled from "styled-components";

const LeftRightContainer = styled.div`
  display: flex;
  align-items: ${(props) => props.align || "auto"};
  justify-content: ${(props) => props.justify || "auto"};
  min-height: ${(props) => props.minHeight || "100vh"};
  background-color: ${(props) => props.background || "transparent"};
`;

export default LeftRightContainer;
