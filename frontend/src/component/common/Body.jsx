import styled from "styled-components";

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  position: absolute;
  top: 10%;

  height: 85%;
  width: 100%;
`;

const Body = ({ children }) => {
  return (
    <>
      <BodyContainer>{children}</BodyContainer>
    </>
  );
};

export default Body;
