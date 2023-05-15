import React, { useState } from "react";
import Button from "@component/Button";
import axios from "axios";
import axiosInstance from "@utils/axiosInstance";
import Input from "@component/Input";
import ColContainer from "@component/layout/ColContainer";
import "@css/tarocard.css";
import "@css/tarotpageslide.css";
import TarotDeck from "@component/tarot/TarotDeck";
import GapH from "@component/layout/GapH";
import TarotCategory from "@component/tarot/TarotCategory";
import UpDownContainer from "@component/layout/UpDownContainer";
import TarotLoading from "@component/tarot/TarotLoading";
import Small from "@component/text/Small";
import { useDispatch, useSelector } from "react-redux";
import {
  setStateImgUrl,
  setStateMessage,
  setStateResults,
  setStateStory, setStateVideoUrl,
} from "@features/tarotSlice";
import { useNavigate } from "react-router-dom";
import FlipGame from "@page/tarot/FlipGame";
import SmallMedium from "@component/text/SmallMedium";

function TarotService() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [tarotResult, setTarotResult] = useState([]);
  const category = useSelector((state) => state.tarot.stateCategory);
  const stateCards = useSelector((state) => state.tarot.stateCards);
  const stateVideoUrl = useSelector((state) => state.tarot.stateVideoUrl);
  const cardSeqList = useSelector((state) =>
    state.tarot.stateCardsInfo.map((card) => card.id)
  );
  const sendToGpt = (event, message) => {
    if (event.key === "Enter") {
      dispatch(setStateMessage(message));
      slideFromTarotToLoading();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.REACT_APP_OPENAI_API_KEY,
        },
      };
      function constructRequestMessage(localCategory, cards, msg) {
        return (
          "- Format : JSON \n\n " +
          "- Answer me in [한국어] \n\n" +
          "당신은 타로 전문가입니다. 아래의 순서로 진행합니다. \n\n " +
          `1. 다음 질문을 이해합니다. [질문] 저는 ${localCategory}에 대해 고민이 있습니다. ${msg} ` +
          `2. 저는 3개의 타로카드 ${cards}을 뽑았습니다. ` +
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
              content: constructRequestMessage(
                category,
                stateCards.toString(),
                message.message
              ),
            },
          ],
          temperature: 0.7,
        };
        let jsonRes;
        await axios
          .post("https://api.openai.com/v1/chat/completions", data, config)
          .then((res) => {
            jsonRes = JSON.parse(res.data.choices[0].message.content);
            setTarotResult(jsonRes.해석);
            dispatch(setStateResults(jsonRes.해석));
            dispatch(setStateStory(jsonRes.동화.trim()));
            console.log(jsonRes);
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
              "simple drawing, fairytale style, " + res.data.choices[0].message.content;
          });

        const reqPictureData = {
          prompt: reqPicturePrompt,
          n: 1,
          size: "512x512",
        };
        let imgUrl;
        await axios
          .post(
            "https://api.openai.com/v1/images/generations",
            reqPictureData,
            config
          )
          .then((res) => {
            imgUrl = res.data.data[0].url;
            dispatch(setStateImgUrl(imgUrl));
          });

        const tarotResultDto = {
          memberSeq: localStorage.getItem("seq"),
          category: category,
          contentInput: message.message,
          cardSeqList: cardSeqList.toString(),
          contentList: jsonRes.해석.toString(),
          imgUrl: imgUrl,
          videoUrl: null,
          story: jsonRes.동화.trim()
        };

        await axiosInstance.post(
          `${process.env.REACT_APP_BACKEND_URL}/taro-service/tarot/result`,
          tarotResultDto
        ).then((res) =>{
          dispatch(setStateVideoUrl(res.data.videoUrl));
          console.log(res);
        });
      }

      receiveTaroResultAndPicture();
    }
  };

  const handleMessageChange = (event) => {
    const { name, value } = event.target;
    setMessage((prevData) => ({ ...prevData, [name]: value }));
  };

  const slideFromCategoryToTarot = () => {
    if (!category) {
      window.alert("카테고리를 선택해주세요.");
      return;
    }
    document
      .querySelector("#slide-from-tarot")
      .classList.remove("right-hidden");
    document.querySelector("#slide-from-category").classList.add("left-hidden");
    const shuffleArr = Array.prototype.slice.call(
      document.getElementsByClassName("tarot-card")
    );
    shuffleArr.map((elem) => elem.classList.add("shuffle-card"));
    setTimeout(() => {
      shuffleArr.map((elem) => elem.classList.add("shuffled"));
    }, 5000);
  };

  const slideFromTarotToLoading = () => {
    document
      .querySelector("#slide-from-loading")
      .classList.remove("right-hidden");
    document.querySelector("#slide-from-tarot").classList.add("left-hidden");
  };

  const navigateToResult = () => {
    navigate("/result");
  };

  const letsGame = () => {
    document.querySelector("#slide-from-game").classList.remove("right-hidden");
    document.querySelector("#slide-from-loading").classList.add("left-hidden");
  };

  return (
    <>
      <UpDownContainer style={{ position: "relative", width:"100%" }}>
        <ColContainer
          id="slide-from-category"
          style={{ position: "absolute", top: 0 }}
          className="slide-in"
          width="80vw"
        >
          <TarotCategory />
          <GapH height="10vh" />
          <hr
            style={{
              width: "100%",
              boxShadow: "0px 0px 10px 5px gray",
              border: "1px solid white",
              maxWidth: "500px",
            }}
          />
          <Button width="80%" height="50px" margin="5vh 0" onClick={slideFromCategoryToTarot} style={{maxWidth:"300px"}}>
            다음으로
          </Button>
        </ColContainer>
        <ColContainer
          style={{ position: "absolute", top: 0 }}
          id="slide-from-tarot"
          className="slide-in right-hidden"
        >
          <TarotDeck />
          <Input
            width="360px"
            placeholder="당신의 고민을 입력하세요."
            onChange={handleMessageChange}
            name="message"
            zIndex="100"
            onKeyDown={(e) => {
              sendToGpt(e, message);
            }}
          />
        </ColContainer>
        <ColContainer
          id="slide-from-loading"
          style={{ position: "absolute", top: 0, width: "80vw" }}
          className="slide-in right-hidden"
          justify="start"
        >
          <>
            <GapH height="10vh" />
            {tarotResult[0] ? (
              <Button margin="50px 0" onClick={navigateToResult}>
                결과보기
              </Button>
            ) : (
              <>
                <SmallMedium>점괘를 해석중입니다.</SmallMedium>
                <br />
                <SmallMedium>잠시 기다려주시기 바랍니다.</SmallMedium>
                <br />
                <br />
                <Small>점괘 해석은 1분 정도 소요될 수 있습니다.</Small>
                <TarotLoading />
              </>
            )}
            <Small>타로 결과를 받아오는 중입니다...</Small>
            <br />
            <Small>잠시 심심함을 달래러 갈까요?</Small>
            <GapH height="5vh" />
            <Button onClick={letsGame}>click !</Button>
          </>
        </ColContainer>
        <ColContainer
          id="slide-from-game"
          style={{ position: "absolute", top: 0, width: "90vw" }}
          className="slide-in right-hidden"
          justify="start"
        >
          <FlipGame />
          {tarotResult[0] ? (
            <Button margin="50px 0" onClick={navigateToResult}>
              결과보기
            </Button>
          ) : (
            <TarotLoading />
          )}
        </ColContainer>
      </UpDownContainer>
    </>
  );
}

export default TarotService;
