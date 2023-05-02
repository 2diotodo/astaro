import styled from "styled-components";

const Text = styled.div`
  font-size: ${(props) => props.fontSize || "12px"};
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

export default Text;
