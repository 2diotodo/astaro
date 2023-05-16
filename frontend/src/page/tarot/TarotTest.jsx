import React from "react";
import axios from "@utils/axiosInstance";
import Button from "@component/Button";
import ColContainer from "@component/layout/ColContainer";
import { useSelector } from "react-redux";
import Small from "@component/text/Small";
import TarotCard from "@component/tarot/TarotCard";
import { Swiper, SwiperSlide } from "swiper/react";
import GapH from "@component/layout/GapH";
import styled from "styled-components";
const SlideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const StyledSwiper = styled(Swiper)`
  margin: 0;
  height: 100%;
`;

const ResultDiv = styled.div`
  width:80vw;
  max-width: 400px;
  bottom: 10vh;
`

const TarotTest = () => {
  const tarotResults = useSelector((state) => state.tarot.stateResults);
  const tarotCardsInfo = useSelector((state) => state.tarot.stateCardsInfo);
  const dalleImgUrl = useSelector((state) => state.tarot.stateImgUrl);
  function sendResult() {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/taro-service/tarot/result`, {
        "memberSeq": 1,
        "category": "금전",
        "contentInput": "고민입니다",
        "cardSeqList": "3,19,14",
        "contentList": "The High Priestess 카드는 내면적인 집중과 깊은 질문을 상징합니다. 이 카드가 나오면 현재 상황에서 내면적인 생각과 감정에 집중해야 한다는 메시지를 전달합니다.,The Moon 카드는 불안정한 상황과 불확실성을 나타냅니다. 이 카드가 나오면 불확실한 결정을 내리기 전에 잠시 시간을 내어 상황을 재고해보는 것이 좋습니다.,Death 카드는 변화와 새로운 시작을 의미합니다. 이 카드가 나오면 과거의 것들을 놓고 새로운 시작을 해나가야 한다는 메시지를 전달합니다.,이 카드들은 금전 문제로 인한 고민을 해결하기 위해 내면적인 집중과 결정, 불확실한 상황에서의 타협과 새로운 시작이 필요하다는 것을 알려줍니다. 이 모든 것들을 종합하면, 금전 문제를 해결하기 위해서는 내면적인 집중과 결정, 대처 능력, 새로운 시도와 변화가 필요합니다.",
        "imgUrl": "https://astaro.s3.ap-northeast-2.amazonaws.com/90ec5497-9a9d-4f63-87c3-76facf1aa65b.png",
        "videoUrl": "https://astaro.s3.amazonaws.com/898d9de6-f2f5-11ed-ae24-0242ac110007.mp4",
        "story": "한 남자가 길을 가다가 금전 문제로 고민하고 있었습니다. 그때 길가에 있는 노인이 그에게 다가와 '내면을 돌아보고, 현재 상황을 잘 파악한 뒤에 결정해야 해.' 라고 조언했습니다. 남자는 그 말씀을 듣고, 잠시 고민한 뒤에 어떤 결정을 내리기로 했습니다. 그 결정은 예전에 놓고 있던 것들을 놓아내고 새로운 시작을 하는 것이었습니다. 그리고 그 결정이 그의 삶에 큰 변화를 가져왔습니다."
      }).then((res) => {
          console.log(res);
      })
  }

  return (
    <>
      <ColContainer>
      <Button onClick={sendResult} style={{zIndex:30}}>요청보내기</Button>

      </ColContainer>
    </>
  );
}

export default TarotTest;