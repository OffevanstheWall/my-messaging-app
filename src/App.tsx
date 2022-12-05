import React, { useState } from "react";
import "./App.css";

interface Message {
  username: string;
  message: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeUser, setActiveUser] = useState<string>("user1");
  const [textareaValue, setTextareaValue] = useState<string>("");

  return (
    <div className="root">
      <select
        className="select-user"
        onChange={(e) => {
          setActiveUser(e.currentTarget.value);
        }}
      >
        <option value="user1">user1</option>
        <option value="user2">user2</option>
      </select>
      <div className="messages">
        {messages.map((message) => {
          return (
            <div className={message.username === activeUser ? "me" : "other"}>
              {message.message}
            </div>
          );
        })}
      </div>
      <div className="user-inputs">
        <textarea
          className="input-message-text"
          value={textareaValue}
          onChange={(e) => {
            setTextareaValue(e.target.value);
          }}
        ></textarea>
        <button
          className="send-button"
          onClick={() => {
            const message: Message = {
              username: activeUser,
              message: textareaValue,
            };
            setMessages([message, ...messages]);
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
