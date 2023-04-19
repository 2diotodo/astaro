import styled from "styled-components";

const GapW = styled.div`
  width: ${(props) => {
    if (props.width) {
      return props.width;
    }
    return "10px";
  }};
  height: 100%;
`;

export default GapW;
