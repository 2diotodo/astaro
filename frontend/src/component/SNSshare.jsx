import React from 'react';
import '@css/modal.css';
import styled from "styled-components";
import Insta from "@assets/img/Insta.png"
import axios from 'axios';



import {
  InstapaperShareButton,
  InstapaperIcon,
	FacebookShareButton,
	FacebookIcon,
	TwitterIcon,
	TwitterShareButton,
} from "react-share";

import { useEffect, useState } from "react";
import { useScript } from "./kakao";
import kakaoLogo from "@assets/img/kakao.png";


export function Modal(props)  {

  const { open, close, header } = props;


	const currentUrl = window.location.href;
	const status = useScript("https://developers.kakao.com/sdk/js/kakao.js");
	useEffect(() => {
		if (status === "ready" && window.Kakao) {
			// 중복 initialization 방지
			if (!window.Kakao.isInitialized()) {
				// 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
				window.Kakao.init("539b85d3d2a6de6494e6c15874cd2332");
			}
		}
	}, [status]);

	const handleKakaoButton = () => {
		window.Kakao.Link.sendScrap({
			requestUrl: currentUrl,
		});
	};


  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>            
            <button className="close" onClick={close}>      
              &times;        
            </button>
          </header>
          <main>
          <FlexContainer>
            <Word>공유하기</Word>
            <br/>
			      <GridContainer>              
              <FacebookShareButton url="https://astaro.co.kr/todaytaro">
                <FacebookIcon size={48} round={true} borderRadius={24}></FacebookIcon>
              </FacebookShareButton>
              <TwitterShareButton url="https://astaro.co.kr/todaytaro">
                <TwitterIcon size={48} round={true} borderRadius={24}></TwitterIcon>
              </TwitterShareButton>
              <InstapaperShareButton url="https://astaro.co.kr/todaytaro">
                <InstapaperIcon size={48} round={true} borderRadius={24}></InstapaperIcon>
              </InstapaperShareButton>
              <KakaoShareButton onClick={handleKakaoButton}>
                <KakaoIcon src={kakaoLogo}></KakaoIcon>
              </KakaoShareButton>
            </GridContainer>
          </FlexContainer>
          </main>
          {/* <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer> */}
        </section>
      ) : null}
    </div>
  );
};

const Word = styled.div`
  font-family:TAEBAEKmilkyway;

`

const FlexContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
  margin: 0;
`;

const GridContainer = styled.div`
	display: flex;	
	grid-column-gap: 8px;
	justify-content: center;
	align-items: center;
`;

const KakaoShareButton = styled.a`
	cursor: pointer;
`;

const KakaoIcon = styled.img`
	width: 48px;
	height: 48px;
	border-radius: 24px;
`;