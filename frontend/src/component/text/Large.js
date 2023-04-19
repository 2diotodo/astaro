import styled from "styled-components";

const Large = styled.div`
  font-size: ${(props) => {
    if (props.fontsize) {
      return props.fontsize;
    }
    return "48px";
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

export default Large;
