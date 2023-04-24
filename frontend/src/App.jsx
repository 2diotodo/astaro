import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "./page/Test";
import { WhiteholeTest } from "./page/WhiteholeTest";
import ChatGpt from "./page/ChatGpt";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Test />} />
          <Route path="/prompt" element={<WhiteholeTest />} />
          <Route path="/chatgpt" element={<ChatGpt />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
