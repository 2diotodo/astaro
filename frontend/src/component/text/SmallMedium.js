import styled from "styled-components";

const SmallMedium = styled.div`
  font-size: ${(props) => {
    if (props.fontsize) {
      return props.fontsize;
    }
    return "18px";
  }};
  font-family: ${(props) => {
    if (props.font) {
      return props.font;
    }
    if (props.theme && props.theme.font) {
      return props.theme.font;
    }
    return "TAEBAEKmilkyway";
  }};
  color: ${(props) => (props.color ? props.color : "white")};
`;

export default SmallMedium;
