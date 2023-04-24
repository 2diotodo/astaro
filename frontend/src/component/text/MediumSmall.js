import styled from "styled-components";

const MediumSmall = styled.div`
  font-size: ${(props) => {
    if (props.fontsize) {
      return props.fontsize;
    }
    return "17px";
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
  cursor: ${(props) => (props.cursor ? props.cursor : "default")};
`;

export default MediumSmall;
