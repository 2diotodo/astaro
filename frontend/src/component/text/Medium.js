import styled from "styled-components";

const Medium = styled.div`
  font-size: ${(props) => {
    if (props.fontsize) {
      return props.fontsize;
    }
    return "28px";
  }};
  font-family: ${(props) => {
    if (props.font) {
      return props.font;
    }
    if (props.theme && props.theme.font) {
      return props.theme.font;
    }
    return "NanumSquareR";
  }};
  color: ${(props) => (props.color ? props.color : "black")};
`;

export default Medium;
