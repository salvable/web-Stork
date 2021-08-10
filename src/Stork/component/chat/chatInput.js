import React, { useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import "./chatInput.css";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import {InputAdornment, TableRow} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

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

    return (
        <div>
            <TextField
                variant="outlined"
                placeholder="Input Msg"
                value={chatMessage}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button variant="contained" color="primary" onClick={handleSubmit}>전송</Button>
                        </InputAdornment>
                    ),
                    style:{
                        backgroundColor: "white",
                        color: "black",
                        width: "100%",
                        margin: '5px'
                    }
                }}
                onChange={async (e)=>{
                    setChatMessage(e.target.value)
                }}
                onKeyPress={(e)=>{
                    if(e.key == "Enter"){
                        handleSubmit()
                    }
                }}
            />
        </div>
    );
};

export default ChatInput;
