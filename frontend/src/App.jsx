import "./App.css";
import "@scss/main.scss";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WhiteholeTest } from "@page/WhiteholeTest";
import { Main } from "@page/Main";
import TarotService from "@page/TarotService";
import TodayTaro from "@page/TodayTaro";
import MemberLogin from "@page/member/MemberLogin";
import MemberSignup from "@page/member/MemberSignup";
import MemberMypage from "@page/member/MemberMypage";
import ChatPage from "./page/shootingStar/ChatPage";
import StarPage from "./page/shootingStar/StarPage";
import TaroResultPage from "./page/shootingStar/TaroResultPage";
import { Background } from "@component/Background";
import Header from "@component/common/Header";
import {TodayResult} from '@/page/TodayResult';
import TarotResult from "@page/TarotResult";

function App() {
  return (
    <div className="App">
      <Background style={{ position: "relative", zIndex: -100 }} />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/prompt" element={<WhiteholeTest />} />
          <Route path="/tarot" element={<TarotService />} />
          <Route path="/tarot-result" element={<TarotResult />} />
          <Route path="/todaytaro" element={<TodayTaro />} />
          <Route path="/todayresult" element={<TodayResult/>} />
          <Route path="/member/memberlogin" element={<MemberLogin />} />
          <Route path="/member/membersignup" element={<MemberSignup />} />
          <Route path="/member/membermypage" element={<MemberMypage />} />
          <Route path="/star/chat/:id" element={<ChatPage />} />
          <Route path="/star" element={<StarPage />} />
          <Route path="/star/taro-result" element={<TaroResultPage />} />
          <Route path="/flipgame" element={<FlipGame />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
