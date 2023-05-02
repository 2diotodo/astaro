import styled from "styled-components";

const GapH = styled.div`
  width: 100%;
  height: ${(props) => {
    if (props.height) {
      return props.height;
    }
    return "10px";
  }};
`;

export default GapH;
