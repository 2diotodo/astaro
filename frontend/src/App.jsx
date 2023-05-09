import "@scss/main.scss";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Main } from "@page/Main";
import TarotService from "@page/tarot/TarotService";
import TodayTaro from "@page/tarot/TodayTaro";
import MemberLogin from "@page/member/MemberLogin";
import MemberSignup from "@page/member/MemberSignup";
import MemberMypage from "@page/member/MemberMypage";
import MessageListPage from "@page/message/MessageList";
import ChatPage from "@page/shootingStar/ChatPage";
import StarPage from "@page/shootingStar/StarPage";
import TaroResultPage from "@page/shootingStar/TaroResultPage";
import { Background } from "@component/common/Background";
import Header from "@component/common/Header";
import { TodayResult } from "@page/tarot/TodayResult";
import TarotResult from "@page/tarot/TarotResult";
import FlipGame from "@page/tarot/FlipGame";
import BlackHolePage from "@page/shootingStar/BlackHolePage";
import TarotTest from "@page/tarot/TarotTest";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Background style={{ position: "relative", zIndex: -100 }} />
      <Router>
        <Header />
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar
          theme="dark"
        />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/tarot" element={<TarotService />} />
          <Route path="/result" element={<TarotResult />} />
          <Route path="/todaytaro" element={<TodayTaro />} />
          <Route path="/todayresult" element={<TodayResult />} />
          <Route path="/member/login" element={<MemberLogin />} />
          <Route path="/member/signup" element={<MemberSignup />} />
          <Route path="/member/mypage" element={<MemberMypage />} />
          <Route path="/message/messageList" element={<MessageListPage />} />
          <Route path="/star/chat/:id" element={<ChatPage />} />
          <Route path="/star" element={<StarPage />} />
          <Route path="/star/taro-result" element={<TaroResultPage />} />
          <Route path="/star/black-hole" element={<BlackHolePage />} />
          <Route path="/flipgame" element={<FlipGame />} />
          <Route path="/tarottest" element={<TarotTest />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
