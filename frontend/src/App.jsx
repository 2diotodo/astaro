import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "@page/Test";
import { WhiteholeTest } from "@page/WhiteholeTest";
import ChatGpt from "@page/ChatGpt";
import MemberLogin from "@page/member/MemberLogin";
import MemberSignup from "@page/member/MemberSignup";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Test />} />
          <Route path="/prompt" element={<WhiteholeTest />} />
          <Route path="/chatgpt" element={<ChatGpt />} />
          <Route path="/member/memberlogin" element={<MemberLogin />} />
          <Route path="/member/membersignup" element={<MemberSignup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
