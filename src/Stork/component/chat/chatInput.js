import React, { useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import "./chatInput.css";

const ChatInput = ({ userId, socket }) => {
    const [chatMessage, setChatMessage] = useState("");

    const handleSubmit = (e) => {
        socket.emit("onSend", {
            userName: userId ? userId : "guest",
            msg: chatMessage,
            timeStamp: new Date().toLocaleTimeString(),
        });
        setChatMessage("");
    };

    const onChatMessageChange = (e) => {
        setChatMessage(e.target.value);
    };

    return (
        <div className="ChatInput-container">
                <input
                    placeholder="메시지를 입력하세요."
                    value={chatMessage}
                    onChange={onChatMessageChange}
                ></input>
                <button onClick={handleSubmit}>전송</button>
        </div>
    );
};

export default ChatInput;
