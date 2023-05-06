import React from "react";
import customAxios from "@utils/axiosInstance";
import Button from "@component/Button";
import ColContainer from "@component/layout/ColContainer";
const TarotTest = () => {
  function sendResult() {
      customAxios.post(`${process.env.REACT_APP_BACKEND_URL}/taro-service/tarot/result`, {
        memberSeq:1,
        category:"연애",
        contentInput:"연애가 하고싶어요.",
        cardSeqList: [1,4,2].toString(),
        contentList: [
          "The Star 카드는 희망과 긍정적인 변화를 의미합니다. 이 카드는 당신이 연애에 대한 강한 욕망을 가지고 있음을 보여줍니다. 이제 당신은 과거의 상처를 극복하고 새로운 시작을 하려는 의지를 가지고 있습니다.",
          "The Emperor 카드는 안정적이고 권위 있는 에너지를 나타냅니다. 이 카드는 당신이 연애에 대한 책임감과 결정력을 가지고 있음을 보여줍니다. 당신은 직감을 믿고 자신의 선택을 할 준비가 되어 있습니다.",
          "The High Priestess 카드는 직감력과 숨겨진 지식을 나타냅니다. 이 카드는 당신이 연애에 대한 내면적인 욕구와 바람을 감추고 있음을 보여줍니다. 당신은 자신의 감정을 깊이 생각하고 타인과 소통할 준비가 되어 있습니다.",
          "이 세 장의 카드는 당신이 연애에 대한 강한 욕망과 결정력, 그리고 내면적인 욕구와 직관력을 가지고 있음을 보여줍니다. 이제 당신은 자신의 감정을 깊이 생각하고 타인과 소통할 준비가 되어 있으며, 새로운 시작을 위해 자신의 선택을 할 준비가 되어 있습니다."
        ].toString(),
        story: "한때, 아름다운 꽃이 피어나던 마을이 있었습니다. 이 마을에 사는 한 남자가 자신의 마음에 드는 여인을 만나고 싶어했습니다. 그러던 어느 날, 그는 높은 산 꼭대기로 올라가 여신들의 축제를 보러 갔습니다. 그곳에서 그는 세 명의 여신들과 마주쳤습니다. 첫 번째 여신은 미소를 지으며, 두 번째 여신은 힘있는 모습으로 그를 바라보았고, 세 번째 여신은 깊은 눈빛으로 그를 바라보았습니다. 그 남자는 이들 여신들이 자신의 마음에 드는 여인과 닮았다고 생각했습니다. 이후, 그는 자신의 내면을 깊이 생각하고, 결국 그의 선택은 그가 만난 세 명의 여신들을 모두 닮은 자신의 마음에 드는 여인이었습니다.",
        imgUrl : "https://mblogthumb-phinf.pstatic.net/MjAxOTAxMTFfMjg5/MDAxNTQ3MTk1MDYyNTMw.L76iC1lFM-JFizYgtukjgAQLmmwqLon_86U2RPxMB9Ag.MxYhC3bLX2BuNJXF3EzLQ2JO2zZt9_4g6BhXJMaRLS4g.PNG.stranger234/image.png?type=w800",
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