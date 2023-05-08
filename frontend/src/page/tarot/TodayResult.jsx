import React, { useState, useEffect } from 'react';
import slide_image from '@assets/img/Taro_back.png';
import styled from 'styled-components';
import '@css/todayresult.scss';
import { useNavigate } from "react-router-dom";
import Button from "@component/Button";
import RowContainer from "@component/layout/RowContainer";
import Small from "@component/text/Small"
// import api from 'constants/api'
import axios from "axios";

export function TodayResult(){

  const navigate = useNavigate()

  // const randomNum = Math.floor(Math.random() * 23 );
  const [result, setResult] = useState({});
  // console.log(randomNum); 

  useEffect(() => {
    axios
      .get("http://localhost:8080/tarot/today")
      .then( (res) => {
        setResult(res.data);
        console.log(res);
        // setProblems(res.data.problems)
        // dispatch(setReduxProblems(res.data.problems))
      })
      .catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return( 
    <Back>
      
        <div className='wrapper'>
          <div className='content'>
            <FlexBox>
              <StyledDiv>
                카드 사진<br />
                <br />
                <div>
                  <Img src={slide_image} alt="pic5" className="photos"  />
                </div>
              </StyledDiv>                                            
              <StyledDiv>내용
                <div>
                <Small>{result.cardName}</Small>
                </div>
              </StyledDiv>              
            </FlexBox>
            <FlexBox>
              <StyledDiv>
                좋은거 이름<br/>
                좋은거 사진
              </StyledDiv>
                {/* <imgae src={slide_image} alt="pic5" className="photos" />  */}
              <StyledDiv>
                나쁜거 이름<br/>
                나쁜거 사진
              </StyledDiv>              
            </FlexBox>            
            <RowContainer width="100%" style={{ justifyContent: "space-evenly" }}>
              <Button onClick={() => navigate('/')}>홈으로</Button>
              <Button onClick={() => navigate('/todaytaro')}>SNS공유</Button>          
            </RowContainer>
                {/* <LinkWrapper>
                  <Link to="/">홈으로</Link>
                </LinkWrapper>
                <LinkWrapper>
                  <Link to="/">SNS공유</Link>
                </LinkWrapper>                 */}
            
                        
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

const Img = styled.img`
  width: 150px;
  height: 237.4px;
`

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50%;
  width: 100%;
`

const StyledDiv = styled.div`
  flex: 1;
  
  text-align: center;
  font-size: 20px;
  color: blue;
`

