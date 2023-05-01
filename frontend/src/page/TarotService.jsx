import React, { useEffect, useState } from "react";
import Button from "../component/Button";
import axios from "axios";
import Input from "../component/Input";
import ColContainer from "../component/layout/ColContainer";
import "@css/tarocard.css";
import "@css/tarotpageslide.css";
import TarotDeck from "@component/TarotDeck";
import GapH from "@component/layout/GapH";
import TarotCategory from "@component/TarotCategory";
import UpDownContainer from "@component/layout/UpDownContainer";
import TarotLoading from "@component/TarotLoading";
import Small from "@component/text/Small";
import SmallMedium from "@component/text/SmallMedium";
import { useSelector } from "react-redux";
import Medium from "@component/text/Medium";

function TarotService() {
  const [message, setMessage] = useState("");
  const [tarotResult, setTarotResult] = useState([]);
  const [dalleImgUrl, setDalleImgUrl] = useState("");
  const [story, setStory] = useState("");
  const category = useSelector((state) => state.tarot.category);
  const stateCards = useSelector((state) => state.tarot.cards);

  useEffect(() => {}, [story]);
  const sendToGpt = (event, inputMessage) => {
    if (event.key === "Enter") {
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
                inputMessage.message
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
            setStory(jsonRes.동화.trim());
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
        await axios
          .post(
            "https://api.openai.com/v1/images/generations",
            reqPictureData,
            config
          )
          .then((res) => {
            setDalleImgUrl(res.data.data[0].url);
          });

        // await axios
        //     .post(`${process.env.REACT_APP_BACKEND_URL}`)
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
  };

  const slideFromTarotToLoading = () => {
    document
      .querySelector("#slide-from-loading")
      .classList.remove("right-hidden");
    document.querySelector("#slide-from-tarot").classList.add("left-hidden");
  };

  const slideFromLoadingToResult = () => {
    document
      .querySelector("#slide-from-result")
      .classList.remove("right-hidden");
    document.querySelector("#slide-from-loading").classList.add("left-hidden");
  };

  const slideFromResultToStory = () => {
    document
      .querySelector("#slide-from-story")
      .classList.remove("right-hidden");
    document.querySelector("#slide-from-result").classList.add("left-hidden");
  };
  return (
    <>
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
              sendToGpt(e, message);
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
          <SmallMedium>점괘를 해석중입니다.</SmallMedium>
          <br />
          <SmallMedium>잠시 기다려주시기 바랍니다.</SmallMedium>
          <br />
          <br />
          <Small>점괘 해석은 1분 정도 소요될 수 있습니다.</Small>
          <GapH height="90px" />
          <TarotLoading />
          <p></p>
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
        <ColContainer
          id="slide-from-result"
          style={{ position: "absolute" }}
          className="slide-in right-hidden"
        >
          <GapH height="10vh" />
          <Medium>- 운세 결과 -</Medium>
          <ColContainer width="80vw">
            {tarotResult.map((tarot) => (
              <>
                <Small lineHeight="2em">{tarot}</Small>
                <br />
                <br />
              </>
            ))}
            <GapH height="20px" />
            <Button margin="50px 0" onClick={slideFromResultToStory}>
              이야기보기
            </Button>
          </ColContainer>
        </ColContainer>
        <ColContainer
          id="slide-from-story"
          style={{ position: "absolute" }}
          className="slide-in right-hidden"
        >
          <GapH height="10vh" />
          <Medium>- 당신의 이야기 -</Medium>
          <ColContainer width="80vw" gap="35px">
            <img alt="img" src={dalleImgUrl} width="256px" height="256px" />
            <Small lineHeight="2em">{story}</Small>
          </ColContainer>
        </ColContainer>
      </UpDownContainer>
    </>
  );
}

export default TarotService;
