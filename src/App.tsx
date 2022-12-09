import React, { useEffect, useState, useRef } from "react";
import "./App.css";

interface Message {
  username: string;
  message: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeUser, setActiveUser] = useState<string>("user1");
  const [textareaValue, setTextareaValue] = useState<string>("");

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handler = () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    inputRef.current?.focus();
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  function send() {
    console.log(textareaValue);
    setTextareaValue("");
    inputRef.current?.focus();
    const message: Message = {
      username: activeUser,
      message: textareaValue,
    };
    setMessages([message, ...messages]);
  }

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
              {message.message.split("\n").map((message) => (
                <div>{message}</div>
              ))}
            </div>
          );
        })}
      </div>
      <div className="user-inputs">
        <textarea
          onKeyUp={(e) => {
            if (e.key.toLowerCase() === "enter" && !e.shiftKey) {
              send();
            }
          }}
          ref={inputRef}
          className="input-message-text"
          value={textareaValue}
          onChange={(e) => {
            setTextareaValue(e.target.value);
          }}
        ></textarea>
        <button
          className="send-button"
          onClick={(e) => {
            send();
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
