import React, { useRef, useState, useEffect } from 'react';
import slide_image from '@assets/img/Taro_back.png';
import styled from 'styled-components';
import '@css/todayresult.scss';
import { Link } from "react-router-dom";

export function TodayResult(){

  const randomNum = Math.floor(Math.random() * 23 );
  console.log(randomNum); 

  


  return(
    <Back>
      
        <div className='wrapper'>
          <div className='content'>
            <FlexBox>
              <StyledDiv>카드 사진</StyledDiv>
              <Img src={slide_image} alt="pic5" className="photos"  />
                
              
              <StyledDiv>내용{randomNum}</StyledDiv>
              
            </FlexBox>
            <FlexBox>
              <StyledDiv>
                좋은거 이름<br/>
                좋은거 사진
              </StyledDiv>
                <Img src={slide_image} alt="pic5" className="photos" /> 
              <StyledDiv>
                나쁜거 이름<br/>
                나쁜거 사진
              </StyledDiv>
              
            </FlexBox>
            <div>
                <LinkWrapper>
                  <Link to="/">홈으로</Link>
                </LinkWrapper>
                <LinkWrapper>
                  <Link to="/">SNS공유</Link>
                </LinkWrapper>                
            </div>
                        
          </div>
        </div>
      
    </Back>
  );

}
const Back = styled.div`
  position: relative;
`


const Luck = styled.div`
  width: 50px;
  height: 90px;
`

const Good = styled.div`
  width: 50px;
  height: 90px;
`

const Bad = styled.div`
  width: 50px;
  height: 90px;
`

const Img = styled.image`
  width: 25px;
  height: 45px;
`

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50%;
  width: 100%;
`

const StyledDiv = styled.div`
  flex: 1;
  
  text-align: start;
  font-size: 20px;
  color: blue;
`

const LinkWrapper = styled.button`
  color: palevioletred;
  font-size: 1rem;
  margin: 1rem;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  z-index: 1;
  position: relative;
`
