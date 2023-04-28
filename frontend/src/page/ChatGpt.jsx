import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../component/Button";
import axios from "axios";
import Input from "../component/Input";
import ColContainer from "../component/layout/ColContainer";
import { Background } from "@component/Background";
import "@css/tarocard.css";
import TarotDeck from "@component/TarotDeck";
import GapH from "@component/layout/GapH";
import RowContainer from "@component/layout/RowContainer";

const Wrapper = styled.div`
  height: 80%;
  width: 100%;
  position: relative;
  z-index: 1;
`;

function ChatGpt() {
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("연애");
  const [taroResult, setTaroResult] = useState([]);
  const [story, setStory] = useState("");
  // const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {}, [story]);
  const sendToGpt = (inputMessage) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.REACT_APP_OPENAI_API_KEY,
      },
    };

    function constructRequestMessage(localcategory, msg) {
      localcategory = "연애";
      return (
        "- Format : JSON \n\n " +
        "- Answer me in [한국어] \n\n" +
        "당신은 타로 전문가입니다. 아래의 순서로 진행합니다. \n\n " +
        `1. 다음 질문을 이해합니다. [질문] 저는 ${localcategory}에 대해 고민이 있습니다. ${msg} ` +
        "2. 저는 3개의 타로카드 The Empress, The Tower, Death을 뽑았습니다. " +
        "3. [질문]을 바탕으로 고른 카드를 해석한 뒤, 종합적으로 해석한 내용을 깊이있고 친절하게 작성합니다. [output.] " +
        "4. 마지막으로, 앞의 해석을 바탕으로, 500자 이내의 [동화]를 만들어주세요. 타로 내용을 직접적으로 언급하지 않고 은유적으로 작성해야합니다. [output.] " +
        "Please use the format template. Do not repeat answers. \n\n " +
        "---BEGIN FORMAT TEMPLATE--- \n\n " +
        // eslint-disable-next-line no-template-curly-in-string
        '{"해석": [${첫번째 카드 해석},  ${두번째 카드 해석},  ${세번째 카드 해석}, ${종합 해석}], "동화": ${동화}} \n\n' +
        "---END FORMAT TEMPLATE---"
      );
    }

    function constructSummaryRequestMessage(msg) {
      return "Extract keywords from this text: " + msg;
    }
    async function receiveTaroResultAndPicture() {
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
          setTaroResult(jsonRes.해석);
          setStory(jsonRes.동화.trim());
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
        .post(
          "https://api.openai.com/v1/chat/completions",
          reqSummaryData,
          config
        )
        .then((res) => {
          reqPicturePrompt =
            "fairy tale style, " + res.data.choices[0].message.content;
        });
      const reqPictureData = {
        prompt: reqPicturePrompt,
        n: 1,
        size: "512x512",
      };
      await axios
        .post(
          "https://api.openai.com/v1/images/generations",
          reqPictureData,
          config
        )
        .then((res) => console.log(res));
    }

    receiveTaroResultAndPicture();
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
      <Background />
      <Wrapper>
        <ColContainer>
          <GapH height="5vw" />
          <div
            style={{
              margin: "25px",
              color: "white",
              fontSize: "30px",
            }}
          >
            무엇을 고민하고 있나요?
          </div>
          <RowContainer
            width="300px"
            style={{ justifyContent: "space-evenly" }}
          >
            <Button>결혼</Button>
            <Button>연애</Button>
          </RowContainer>
          <GapH height="2vh" />
          <div style={{ color: "white" }}>{story}</div>
          <RowContainer
            width="300px"
            style={{ justifyContent: "space-evenly" }}
          >
            <Button>학업</Button>
            <Button>취직</Button>
          </RowContainer>

          <GapH height="250px" />
          <TarotDeck />
          <GapH height="1vh" />
          <Input
            width="80%"
            placeholder="당신의 고민을 입력하세요."
            onChange={handleMessageChange}
            name="message"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendToGpt(message);
              }
            }}
            style={{ textAlign: "left" }}
          />
          <GapH height="20px" />
          <Button width="120px">전송하기</Button>
        </ColContainer>
      </Wrapper>
    </>
  );
}

export default ChatGpt;
