import styled from "styled-components";

const Input = styled.input.attrs((props) => ({
  type: props.type || "text",
  placeholder: props.placeholder || "",
  name: props.name || "",
}))`
  width: ${(props) => props.width || "490px"};
  height: ${(props) => props.height || "50px"};
  color: ${(props) => props.color || "white"};
  text-indent: ${(props) => (props.textIndent ? "0" : "20px")};
  border: ${(props) => props.border || "none"};
  border-bottom: ${(props) => props.borderBottom || "1px solid white"};
  padding-left: ${(props) => props.paddingLeft || "10px"};
  background: ${(props) => props.background || "none"};
  border-radius: ${(props) => props.borderRadius || "0"};
  text-align: ${(props) => (props.centerPlaceholder ? "center" : "inherit")};
  text-justify: ${(props) => (props.justify ? props.justify : "inherit")};

  &:focus {
    outline: ${(props) => props.outline || "none"};
  }
  
  &::placeholder {
    color: ${(props) =>
      props.placeholderColor ? props.placeholderColor : "#9E9E9E"};
    text-align: ${(props) => (props.centerPlaceholder ? "center" : "inherit")};
  }
`;

export default Input;
