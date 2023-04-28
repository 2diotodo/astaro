import { Background } from "@/component/Background";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const Image = styled.img`
  max-width: 80%;
  max-height: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  text-align: center;
  font-size: 1.2rem;
  max-width: 80%;
  color: #ffffff;
`;

const BackButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  background-color: #1e88e5;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #1565c0;
  }
`;

const TaroResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const taroResult = location.state?.taroResult;

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  if (!taroResult) {
    return (
      <ResultContainer>
        <h2>타로 결과를 찾을 수 없습니다.</h2>
        <BackButton onClick={handleBackButtonClick}>돌아가기</BackButton>
      </ResultContainer>
    );
  }
  console.log("taroResult :", taroResult)
  const imgList = taroResult.imgList;
  const content = taroResult.input;
  console.log(content)
  const [firstImage] = imgList.split(",");

  return (
    <>
      <Background/>
      <ResultContainer style={{position:"relative"}}>
        <Image src={firstImage} alt="타로 카드 이미지" />
        <Description>{content}</Description>
        <BackButton onClick={handleBackButtonClick}>돌아가기</BackButton>
      </ResultContainer>
    </>
  );
};

export default TaroResultPage;
