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

const Wrapper = styled.div`
      height:80%;
      width:100%;
      position: relative;
      z-Index: 1;
    `

function ChatGpt() {
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("연애");
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

    function constructMessage(category, msg) {
      return "유저의 고민을 기반으로 타로카드를 봐주는 시스템입니다.  타로카드의 내용을 동화 스토리를 만들고 싶어요. \n유저의 고민은 다음과 같습니다.\n"+category+"에 고민이 있습니다."+msg+"\n유저가 1. The fool, 2. The tower, 3. The moon, 4. The sun, 5. The magician 타로카드를 뽑았습니다. \n카드의 명을 직접적으로 언급하지 말아주세요!! 각 문단을 200자로  3문단의 동화 스토리와 요약을  아래의 예시에 맞게 만들어주세요. \n스토리 1문단 - 한때 마법사였던 나무꾼은 숲에서 일하며 살았습니다. 하지만 그는 자신이 어릴 적부터 꿈꾸던 대로 모험가가 되고 싶었습니다. 그러던 어느 날, 그는 바깥 세상으로 나아가는 길을 발견하게 되었습니다. 그리고 그는 신나게 뛰어나갔지만, 그의 모험은 온갖 어려움에 부딪치며 점점 어려워졌습니다. \n스토리 2문단 - 한참을 헤매던 그는 결국에는 도시의 높은 탑 앞에 서게 되었습니다. 그는 자신이 이렇게까지 어려운 상황에 처한 이유를 알아내지 못했습니다. 하지만 그는 탑을 오르고 내려오는 것을 결심했습니다. 이제는 망설이지 않기로 마음먹은 그는 탑을 오르기 시작합니다. \n스토리 3문단 - 하지만 탑 안에서는 끝없는 어둠과 불안감이 넘쳤습니다. 그리고 탑에 대한 진실을 알게 된 그는 다시 한번 도전하기로 결심합니다. 그의 마음속에는 새로운 시작에 대한 두려움이 있었습니다. 하지만 탑을 정복한 그는 태양이 비추는 아름다운 세상으로 나아갔습니다. 그리고 그가 가진 모든 열정과 능력을 활용해 적성에 맞는 일을 찾았습니다. 그는 자신의 꿈을 이룬 것입니다. \n요약 : 당신은 마침내 자신의 적성에 맞는 일을 찾아낸 것 같습니다. 그는 마치 마술사처럼, 자신의 열정과 능력을 이용해 세상을 더욱 아름답 게 만들어 나갈 것입니다. 그의 앞날은 밝고, 그대가 가진 재능을 발휘할 기회가 많을 것입니다."
    }
    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: constructMessage(category, inputMessage.message),
        },
      ],
      temperature: 0.7,
    };
    console.log( constructMessage(category, inputMessage.message));
    axios
      .post("https://api.openai.com/v1/chat/completions", data, config)
      .then((res) => setStory(res.data.choices[0].message.content));
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
