import React, {useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import Input from "../component/Input";
import ColContainer from "../component/layout/ColContainer";
import {Background} from "@component/Background";
import "@css/tarocard.css"
import Taro_back from "@assets/img/Taro_back.png";
import Taro_front1 from "@assets/img/Taro_front1.png";
import Taro_front2 from "@assets/img/Taro_front2.png";
import Taro_front3 from "@assets/img/Taro_front3.png";
import {json} from "react-router-dom";

const Wrapper = styled.div`
      height:80%;
      width:100%;
      position: relative;
      z-Index: 1;
    `

function ChatGpt() {
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("연애");
  const [taroResult, setTaroResult] = useState([]);
  const [story, setStory] = useState("");
  // const [selectedCards, setSelectedCards] = useState([]);

    useEffect(()=>{

    },[story])
  const sendToGpt = (inputMessage) => {

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.REACT_APP_OPENAI_API_KEY,
      },
    };

    function constructRequestMessage(category, msg) {
      category = "연애";
      return "- Format : JSON \n\n " +
          "- Answer me in [한국어] \n\n" +
          "당신은 타로 전문가입니다. 아래의 순서로 진행합니다. \n\n " +
          `1. 다음 질문을 이해합니다. [질문] 저는 ${category}에 대해 고민이 있습니다. ${msg} ` +
          "2. 저는 3개의 타로카드 The Empress, The Tower, Death을 뽑았습니다. " +
          "3. [질문]을 바탕으로 고른 카드를 해석한 뒤, 종합적으로 해석한 내용을 깊이있고 친절하게 작성합니다. [output.] " +
          "4. 마지막으로, 앞의 해석을 바탕으로, 500자 이내의 [동화]를 만들어주세요. 타로 내용을 직접적으로 언급하지 않고 은유적으로 작성해야합니다. [output.] " +
          "Please use the format template. Do not repeat answers. \n\n " +
          "---BEGIN FORMAT TEMPLATE--- \n\n " +
          // eslint-disable-next-line no-template-curly-in-string
          "{\"해석\": [${첫번째 카드 해석},  ${두번째 카드 해석},  ${세번째 카드 해석}, ${종합 해석}], \"동화\": ${동화}} \n\n" +
          "---END FORMAT TEMPLATE---";
    }

    function constructSummaryRequestMessage(msg){
        return "Extract keywords from this text: " + msg;
    }
    async function receiveTaroResultAndPicture(){
      const data = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: constructRequestMessage(category, inputMessage.message),
          },
        ],
        temperature: 0.7,
      };
      let jsonRes;
      await axios
          .post("https://api.openai.com/v1/chat/completions", data, config)
          .then((res) => {
            jsonRes = JSON.parse(res.data.choices[0].message.content);
            console.log(jsonRes);
            setTaroResult(jsonRes.해석);
            setStory(jsonRes.동화.trim());
            console.log(jsonRes.동화);
            console.log(jsonRes.해석);
          });

      const reqSummaryData = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: constructSummaryRequestMessage(jsonRes.동화),
          },
        ],
        temperature: 0.7,
      };
      let reqPicturePrompt = "";
      await axios
          .post("https://api.openai.com/v1/chat/completions", reqSummaryData, config)
          .then((res) => {
            reqPicturePrompt = res.data.choices[0].message.content;
            console.log(reqPicturePrompt);
          });
      const reqPictureData = {
        "prompt": reqPicturePrompt,
        "n": 1,
        "size": "512x512"
      }
      await axios
          .post("https://api.openai.com/v1/images/generations", reqPictureData, config)
          .then((res) => console.log(res));
    }

    receiveTaroResultAndPicture()

  };

  const handleMessageChange = (event) => {
    const { name, value } = event.target;
    setMessage((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCategoryChange = (event) => {
    setCategory(event.value);
  };

  return (
    <>
      <Background/>
      <Wrapper>
      <Input
        width="100%"
        placeholder="당신의 고민을 입력하세요."
        onChange={handleMessageChange}
        name="message"
      />
      <button onClick={() => sendToGpt(message)}>Send</button>
      <ColContainer>
        <div style={{color:"white"}}>당신의 이야기</div>
        <div style={{color:"white"}}>{story}</div>
      </ColContainer>
        <ColContainer>

        <div className="container">
          <div
              className="taro-card"
              style={{backgroundImage: `url(${Taro_back})`, backgroundSize: "cover"}}
          ></div>
          <div
              className="taro-card"
              style={{backgroundImage: `url(${Taro_back})`, backgroundSize: "cover"}}
          ></div>
          <div
              className="taro-card"
              style={{backgroundImage: `url(${Taro_front1})`, backgroundSize: "cover"}}
          ></div>
        </div>
        <div className="container1">
          <div className="selected-tarocard"></div>
          <div className="selected-tarocard"></div>
          <div className="selected-tarocard"></div>
          <div className="selected-tarocard"></div>
          <div className="selected-tarocard"></div>
          <div className="selected-tarocard"></div>
          <div className="selected-tarocard"></div>
          <div className="selected-tarocard"></div>
          <div className="selected-tarocard"></div>
          <div className="selected-tarocard"></div>

          <div className="selected-tarocard"></div>
          <div className="selected-tarocard"></div>
          <div className="selected-tarocard"></div>
          <div className="selected-tarocard"></div>
          <div className="selected-tarocard"></div>
          <div className="selected-tarocard"></div>
          <div className="selected-tarocard"></div>
          <div className="selected-tarocard"></div>
          <div className="selected-tarocard"></div>
          <div className="selected-tarocard"></div>

          <div className="selected-tarocard"></div>
          <div className="selected-tarocard"></div>
        </div>
        </ColContainer>
      </Wrapper>
    </>
  );
}

export default ChatGpt;
