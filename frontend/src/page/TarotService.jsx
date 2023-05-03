import React, { useState } from "react";
import Button from "../component/Button";
import axios from "axios";
import axiosInstance from "@utils/axiosInstance";
import Input from "../component/Input";
import ColContainer from "../component/layout/ColContainer";
import "@css/tarocard.scss";
import "@css/tarotpageslide.css";
import TarotDeck from "@component/TarotDeck";
import GapH from "@component/layout/GapH";
import TarotCategory from "@component/TarotCategory";
import UpDownContainer from "@component/layout/UpDownContainer";
import TarotLoading from "@component/TarotLoading";
import Small from "@component/text/Small";
import { useDispatch, useSelector } from "react-redux";
import { setStateImgUrl, setStateMessage, setStateResults, setStateStory } from "@features/tarotSlice";
import { useNavigate } from "react-router-dom";

function TarotService() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [tarotResult, setTarotResult] = useState([]);
  const [dalleImgUrl, setDalleImgUrl] = useState("");
  const category = useSelector((state) => state.tarot.stateCategory);
  const stateCards = useSelector((state) => state.tarot.stateCards);
  const cardSeqList = useSelector((state) => state.tarot.stateCardsSeq);
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
              "fairy tale style, " + res.data.choices[0].message.content;
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
            setDalleImgUrl(res.data.data[0].url);
            imgUrl = res.data.data[0].url;
            dispatch(setStateImgUrl(imgUrl));
          });

        const tarotResultDto = {
          memberSeq: localStorage.getItem("user"),
          category: category,
          contentInput: message,
          cardSeqList: cardSeqList,
          contentList: jsonRes.해석,
          imgList: [imgUrl],
        };

        await axiosInstance.post(
          `${process.env.REACT_APP_BACKEND_URL}`,
          tarotResultDto
        );
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
    shuffleArr.map((elem) => {
      elem.classList.add("shuffle-card");
    });
    setTimeout(() => {
      shuffleArr.map((elem) => {
        elem.classList.add("shuffled");
      });
    }, 5000);
  };

  const slideFromTarotToLoading = () => {
    document
      .querySelector("#slide-from-loading")
      .classList.remove("right-hidden");
    document.querySelector("#slide-from-tarot").classList.add("left-hidden");
  };

  const slideFromLoadingToResult = () => {
    navigate("/result")
  };

  return (
    <>
      <UpDownContainer style={{position:"relative"}}>
        <ColContainer
          id="slide-from-category"
          style={{ position: "absolute", top:0}}
          className="slide-in"
        >
          <TarotCategory />
          <Button margin="50px 0" onClick={slideFromCategoryToTarot}>
            다음으로
          </Button>
        </ColContainer>
        <ColContainer
          style={{ position: "absolute", top:0}}
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
          style={{ position: "absolute" }}
          className="slide-in right-hidden"
          justify="start"
        >
          <GapH height="20vh"/>
          <TarotLoading />
          {tarotResult[0] ? (
            dalleImgUrl ? (
              <Button margin="50px 0" onClick={slideFromLoadingToResult}>
                결과보기
              </Button>
            ) : (
              <>
                <GapH height="50px" />
                <Small>동화를 그리는 중입니다...</Small>
              </>
            )
          ) : (
            <>
              <GapH height="50px" />
              <Small>타로 결과를 받아오는 중입니다...</Small>
            </>
          )}
        </ColContainer>

      </UpDownContainer>
    </>
  );
}

export default TarotService;
