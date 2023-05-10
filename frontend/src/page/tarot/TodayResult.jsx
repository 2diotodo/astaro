import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '@css/todayresult.scss';
import { useNavigate } from "react-router-dom";
import Button from "@component/Button";
import RowContainer from "@component/layout/RowContainer";
import Small from "@component/text/Small"
// import api from 'constants/api'
import axios from "axios";
import { Modal } from '@component/SNSshare';
import TarotCardArr from "@assets/TarotCardArr";

export function TodayResult(){

  const [modalOpen, setModalOpen] = useState(false);
  const tarotCardArr = TarotCardArr;

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const navigate = useNavigate()

  // const randomNum = Math.floor(Math.random() * 23 );
  const [result, setResult] = useState({});
  // console.log(randomNum); 

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/taro-service/tarot/today`)
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
                {result.cardName}<br />
                <br />
                <div>
                  <img src={tarotCardArr[0].image} alt="" width="100px"/>
                </div>
                <br />
                {result.cadrName}
              </StyledDiv>                                            
              <StyledDiv>
                운세<br/>
                <br/>
                <div>
                {result.content}
                </div>
              </StyledDiv>              
            </FlexBox>
            <FlexBox>
              <StyledDiv>
                상성이 좋은 카드<br/>
                <br />
                <div>
                  <img src={result.goodImageUrl} alt="" width="100px"/>              
                </div>
                <br />
                {result.goodCardName}
              </StyledDiv>
                {/* <imgae src={slide_image} alt="pic5" className="photos" />  */}
              <StyledDiv>
                상성이 나쁜 카드<br/>
                <br />
                <div>
                  <img src={result.badImageUrl} alt="" width="100px"/>
                </div>
                <br />
                {result.badCardName}
              </StyledDiv>              
            </FlexBox>            
            <RowContainer width="100%" style={{ justifyContent: "space-evenly" }}>
              <Button onClick={() => navigate('/')}>홈으로</Button>
              <Button onClick={ openModal }>SNS공유</Button>
              <Modal open={modalOpen} close={closeModal} />        
            </RowContainer>                                                  
          </div>
        </div>
      
    </Back>
  );

}
const Back = styled.div`
  position: relative;
`
const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  height: 55%;
  width: 100%;
`
const StyledDiv = styled.div`
  flex: 1;
  font-family:TAEBAEKmilkyway;
  text-align: center;
  font-size: 20px;
  color: white;
`




