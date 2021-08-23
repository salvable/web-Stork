import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button";
import chart from "../../Chart/storkChart.png";
import ChatLog from "../../component/chat/chatLog";
import BorderChatInput from "../../component/chat/borderChatInput";
import socketIOClient from "socket.io-client";

const Contact = () => {

    const [currentSocket, setCurrentSocket] = useState()

    const token = localStorage.getItem('accessToken')
    const userId = localStorage.getItem("userId")

    const myInfo = {
        roomName: "Border",
        userName: userId ? userId : "guest",
    };

    useEffect(() => {
        if (currentSocket) {
            currentSocket.on("connect", () => {
                currentSocket.emit("join", myInfo);
            });
        }else{
            setCurrentSocket(socketIOClient("localhost:3002"));
        }
    }, [currentSocket]);

    return (
        <Grid container spacing={6} style={{height: "100%", marginTop: 1}}>
            <Grid item xs={8} >
                <TableContainer component = {Paper}>
                    <Table aria-label="simple table" >
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" colSpan={6} style={{justifyContent: 'center'}}><h1>자유 게시판</h1></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{width: "10%"}}>글 번호</TableCell>
                                <TableCell style={{width: "50%"}}>제목</TableCell>
                                <TableCell style={{width: "10%"}}>작성자</TableCell>
                                <TableCell style={{width: "10%"}}>날짜</TableCell>
                                <TableCell style={{width: "10%"}}>조회수</TableCell>
                                <TableCell style={{width: "10%"}}>추천수</TableCell>
                            </TableRow>

                            <TableRow>
                                가져온 데이터를 뿌릴 예정
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={4}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table" >
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" colSpan={3}><h1>채팅방</h1></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell height={600} >
                                    <ChatLog socket={currentSocket}></ChatLog>
                                    <BorderChatInput userId={userId} socket={currentSocket}></BorderChatInput>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={8} style={{justifyContent: 'center'}}>
                <Button variant="contained" color="primary" style={{justifyContent: 'center'}}> 글 작성</Button>
            </Grid>
        </Grid>
    )
};

export default Contact