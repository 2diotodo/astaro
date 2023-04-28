import styled from "styled-components";

const MediumLarge = styled.div`
  font-size: ${(props) => {
    if (props.fontsize) {
      return props.fontsize;
    }
    return "34px";
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
  color: ${(props) => (props.color ? props.color : "#fff")};
`;

export default MediumLarge;
