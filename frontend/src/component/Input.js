import styled from "styled-components";

const Input = styled.input.attrs((props) => ({
  type: props.type || "text",
  placeholder: props.placeholder || "",
  name: props.name || "",
}))`
  width: ${(props) => props.width || "490px"};
  height: ${(props) => props.height || "58px"};
  text-indent: ${(props) => (props.centerPlaceholder ? "0" : "20px")};
  border: ${(props) => props.border || "1px solid #cccccc"};
  border-radius: ${(props) => props.borderRadius || "0"};
  border-color: ${(props) => props.borderColor || "black"};
  text-align: ${(props) => (props.centerPlaceholder ? "center" : "inherit")};
  text-justify: ${(props) => (props.justify ? props.justify : "inherit")};

  &::placeholder {
    color: ${(props) =>
      props.placeholderColor ? props.placeholderColor : "#9E9E9E"};
    text-align: ${(props) => (props.centerPlaceholder ? "center" : "inherit")};
  }
`;

export default Input;
