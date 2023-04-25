import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "./page/Test";
import { WhiteholeTest } from "./page/WhiteholeTest";
import ChatGpt from "./page/ChatGpt";
import ChatPage from "./page/ChatPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Test />} />
          <Route path="/prompt" element={<WhiteholeTest />} />
          <Route path="/chatgpt" element={<ChatGpt />} />
          <Route path="/chat/:id" element={<ChatPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
