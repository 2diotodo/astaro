import styled from "styled-components";

const BoldSmall = styled.div`
  font-size: ${(props) => {
    if (props.fontsize) {
      return props.fontsize;
    }
    return "14px";
  }};
  font-weight: bold;
  font-family: ${(props) => {
    if (props.font) {
      return props.font;
    }
    if (props.theme && props.theme.font) {
      return props.theme.font;
    }
    return "NanumSquareEB";
  }};
  color: ${(props) => (props.color ? props.color : "black")};
`;

export default BoldSmall;
