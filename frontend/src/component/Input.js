import styled from "styled-components";

const Input = styled.input.attrs((props) => ({
  type: props.type || "text",
  placeholder: props.placeholder || "",
  name: props.name || "",
}))`
  width: ${(props) => props.width || "490px"};
  padding: ${(props) => props.padding || "10px 0"};
  font-size: ${(props) => props.fontSize || "16px"};
  color: ${(props) => props.color || "white"};
  border: ${(props) => props.border || "none"};
  border-bottom: ${(props) => props.borderBottom || "1px solid #fff"};
  background: ${(props) => props.background || "transparent"};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "inherit")};
  text-justify: ${(props) => (props.textJustify ? props.textAlign : "inherit")};
  font-family: ${(props) => props.fontFamily || "TAEBAEKmilkyway"};
  z-index: ${(props) => props.zIndex || "inherit"};

  &:focus {
    outline: ${(props) => props.outline || "none"};
  }

  &::placeholder {
    color: ${(props) =>
      props.placeholderColor ? props.placeholderColor : "#9E9E9E"};
    text-align: ${(props) => (props.textAlign ? props.textAlign : "inherit")};
    font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "bold")};
  }
`;

export default Input;
