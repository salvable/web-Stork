import React, { useEffect, useState } from "react";

const ChatLog = ({ socket }) => {
    const [msgList, setMsgList] = useState([]);

    useEffect(() => {
        if(socket){
            socket.on("onReceive", (messageItem) => {
                setMsgList((msgList) => [...msgList, messageItem]);
            });
            socket.on("onConnect", (systemMessage) => {
                setMsgList((msgList) => [...msgList, { msg: systemMessage }]);
            });
            socket.on("onDisconnect", (systemMessage) => {
                setMsgList((msgList) => [...msgList, { msg: systemMessage }]);
            });
            return () => {
                socket.disconnect();
            };
        }
    }, [socket]);

    return (
        <div style={{height: "50vh", overflow: "auto"}}>
            {msgList.map((msg, idx) => (
                <div key={idx}>
                    <div>{msg.userName} ({msg.timeStamp})</div>
                    <div>{msg.msg}</div>
                </div>
            ))}
        </div>
    );
};

export default ChatLog;
