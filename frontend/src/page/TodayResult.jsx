import React, { useRef, useState, useEffect } from 'react';
import slide_image from '@assets/img/Taro_back.png';
import styled from 'styled-components';
import '@css/todayresult.css';


export function Result(){
  return(
    <Back>
      
        <div className='wrapper'>
          <div className='content'>
            <FlexBox>
              <StyledDiv>카드 사진</StyledDiv>
              <Img src={slide_image} alt="pic5" className="photos"  />
                
              
              <StyledDiv>내용</StyledDiv>
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