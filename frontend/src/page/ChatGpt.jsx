import React, { useState } from "react";
import axios from "axios";
import Input from "../component/Input";

function ChatGpt() {
  const [message, setMessage] = useState("");
  const sendToGpt = (message) => {
    console.log(message.message);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.REACT_APP_OPENAI_API_KEY,
      },
    };
    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: message.message,
        },
      ],
      temperature: 0.7,
    };
    axios
      .post("https://api.openai.com/v1/chat/completions", data, config)
      .then((res) => console.log(res.data));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <Input
        width="100%"
        height="64px"
        placeholder="메시지를 입력하세요."
        onChange={handleChange}
        name="message"
      />
      <button onClick={() => sendToGpt(message)}>Send</button>
    </>
  );
}

export default ChatGpt;
