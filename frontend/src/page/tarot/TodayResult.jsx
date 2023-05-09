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


export function TodayResult(){

  const [modalOpen, setModalOpen] = useState(false);

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
      .get("http://localhost:8083/tarot/today")
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
                {result.cadrName}<br />
                <br />
                <div>
                  {result.mainImageUrl}
                </div>
                <br />
                {result.cadrName}
              </StyledDiv>                                            
              <StyledDiv>
                운세<br/>
                <div>
                <Small>{result.content}</Small>
                </div>
              </StyledDiv>              
            </FlexBox>
            <FlexBox>
              <StyledDiv>
                상성이 좋은 카드<br/>
                <br />
                <div>
                  {result.goodImageUrl}
                </div>
                <br />
                {result.goodCardName}
              </StyledDiv>
                {/* <imgae src={slide_image} alt="pic5" className="photos" />  */}
              <StyledDiv>
                상성이 나쁜 카드<br/>
                <br />
                <div>
                  {result.badImageUrl}
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
  height: 50%;
  width: 100%;
`
const StyledDiv = styled.div`
  flex: 1;
  font-family:TAEBAEKmilkyway;
  text-align: center;
  font-size: 20px;
  color: white;
`




