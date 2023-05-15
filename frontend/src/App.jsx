import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Background } from "@component/common/Background";
import Header from "@component/common/Header";
import Body from "./component/common/Body";
import { Main } from "@page/Main";
import TarotService from "@page/tarot/TarotService";
import TodayTaro from "@page/tarot/TodayTaro";
import MemberLogin from "@page/member/MemberLogin";
import MemberSignup from "@page/member/MemberSignup";
import MemberMypage from "@page/member/MemberMypage";
import MessageListPage from "@page/message/MessageList";
import ChatPage from "@page/shootingStar/ChatPage";
import StarPage from "@page/shootingStar/StarPage";
import TarotResult from "@page/tarot/TarotResult";
import FlipGame from "@page/tarot/FlipGame";
import TaroStoryPage from "@page/shootingStar/TaroStoryPage";
import BlackHolePage from "@page/shootingStar/BlackHolePage";
import TarotTest from "@page/tarot/TarotTest";
import Landing from "./page/Landing";
import music2 from "@assets/A_Quiet_Thought-Wayne_Jones.mp3";
import "./App.css";
import TarotStory from "@page/tarot/TarotStory";

function App() {
  const backgroundAudio = new Audio(music2);

  const audioPlay = () => {
    backgroundAudio.loop = true;
    backgroundAudio.play();
  };

  return (
    <div className="App">
      <Background style={{ position: "relative", zIndex: -100 }} />
      <Router>
        <Header />
        <Body>
          <Routes>
            <Route path="/" element={<Landing audio={audioPlay} />} />
            <Route path="/home" element={<Main />} />
            <Route path="/tarot" element={<TarotService />} />
            <Route path="/result" element={<TarotResult />} />
            <Route path="/todaytaro" element={<TodayTaro />} />
            <Route path="/tarot/story" element={<TarotStory />} />
            <Route path="/member/login" element={<MemberLogin />} />
            <Route path="/member/signup" element={<MemberSignup />} />
            <Route path="/member/mypage" element={<MemberMypage />} />
            <Route path="/message/message-list" element={<MessageListPage />} />
            <Route path="/star/chat/:id" element={<ChatPage />} />
            <Route path="/star" element={<StarPage />} />
            <Route path="/star/black-hole" element={<BlackHolePage />} />
            <Route path="/flipgame" element={<FlipGame />} />
            <Route path="/star/taro-story" element={<TaroStoryPage />} />
            <Route path="/tarottest" element={<TarotTest />} />
          </Routes>
        </Body>
      </Router>
    </div>
  );
}

export default App;
