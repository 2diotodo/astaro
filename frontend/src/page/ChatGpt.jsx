import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../component/Button";
import axios from "axios";
import Input from "../component/Input";
import ColContainer from "../component/layout/ColContainer";
import { Background } from "@component/Background";
import "@css/tarocard.css";
import "@css/tarotpageslide.css";
import TarotDeck from "@component/TarotDeck";
import GapH from "@component/layout/GapH";
import TarotCategory from "@component/TarotCategory";
import Subtitle from "@component/text/Subtitle";
import UpDownContainer from "@component/layout/UpDownContainer";

const Wrapper = styled.div`
  height: 80%;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const Label = styled.label`
  position: absolute;
  top: 0;
  //left: 40px;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
`;

function ChatGpt() {
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("연애");
  const [taroResult, setTaroResult] = useState([]);
  const [story, setStory] = useState("");
  // const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {}, [story]);
  const sendToGpt = (event, inputMessage) => {
    if (event.key === "Enter") {
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
    }
  };

  const handleMessageChange = (event) => {
    const { name, value } = event.target;
    setMessage((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCategoryChange = (event) => {
    setCategory(event.value);
  };

  const slideFromCategoryToTarot = () => {
    document
      .querySelector("#slide-from-tarot")
      .classList.remove("right-hidden");
    document.querySelector("#slide-from-category").classList.add("left-hidden");
  };

  const slideFromTarotToLoading = () => {
    document
      .querySelector("#slide-from-loading")
      .classList.remove("right-hidden");
    document.querySelector("#slide-from-tarot").classList.add("left-hidden");
  };

  const slideFromLoadingToResult = () => {
    document.querySelector("#slide-from-loading").classList.add("left-hidden");
  };
  return (
    <>
      <Background />
      <UpDownContainer
        style={{
          position: "relative",
        }}
      >
        <ColContainer
          id="slide-from-category"
          style={{ position: "absolute" }}
          className="slide-in"
        >
          <TarotCategory />
          <Button margin="50px 0" onClick={slideFromCategoryToTarot}>
            다음으로
          </Button>
        </ColContainer>
        <ColContainer
          style={{ position: "absolute" }}
          id="slide-from-tarot"
          className="slide-in right-hidden"
        >
          <TarotDeck />
          <Input
            width="360px"
            placeholder="당신의 고민을 입력하세요."
            onChange={handleMessageChange}
            name="message"
            onKeyDown={(e) => {
              sendToGpt(message);
            }}
          />
          <Button width="120px" margin="30px" onClick={slideFromTarotToLoading}>
            전송하기
          </Button>
        </ColContainer>
        <ColContainer
          id="slide-from-loading"
          style={{ position: "absolute" }}
          className="slide-in right-hidden"
        >
          <Button margin="50px 0" onClick={slideFromLoadingToResult}>
            다음으로
          </Button>
        </ColContainer>
      </UpDownContainer>
    </>
  );
}

export default ChatGpt;
