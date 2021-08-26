import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button";
import ChatLog from "../../component/chat/chatLog";
import BorderChatInput from "../../component/chat/borderChatInput";
import socketIOClient from "socket.io-client";
import axios from "axios";
import {Pagination} from "@material-ui/lab";
import {useHistory} from "react-router";
import queryString from "query-string";

const Contact = ({location}) => {
    const history = useHistory()
    const parsed = queryString.parse(location.search);

    const [currentSocket, setCurrentSocket] = useState()
    const [boards,setBoards] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [page,setPage] = useState(parsed.page ? parsed.page: 1)
    console.log(page)

    const token = localStorage.getItem('accessToken')
    const userId = localStorage.getItem("userId")

    const myInfo = {
        roomName: "Border",
        userName: userId ? userId : "guest",
    };

    useEffect(() => {
        setPage(parsed.page ? parsed.page: 1)
    }, [location.search]);

    useEffect(() => {
        if (currentSocket) {
            currentSocket.on("connect", () => {
                currentSocket.emit("join", myInfo);
            });
        }else{
            setCurrentSocket(socketIOClient("localhost:3002"));
        }
    }, [currentSocket]);

    useEffect(() => {
        async function getBoards(){
            const response = await axios.get(`http://localhost:3000/boards?page=${page}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }})
            setBoards(response.data.board)
            setTotalCount(response.data.totalCount)
        }
        getBoards()
    }, [page]);



    const loginCheck = async(accessToken) => {
        if(accessToken){
            try{
                const response = await axios.get("http://localhost:3000/checkAuth", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }})

                if(response.status == 200){
                    window.location.href = "/board/write"
                }
            } catch (e) {
                alert("로그인 후 이용 가능합니다.")
            }
        }
        else{
            alert("로그인 후 이용 가능합니다.")
        }
    }

    const setPageCount = () =>{
        if(totalCount % 10 == 0){
            return parseInt(totalCount / 10)
        }

        return parseInt(totalCount / 10) + 1
    }



    return (
        <div>
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
                                <TableCell align="center" style={{width: "10%"}}>글 번호</TableCell>
                                <TableCell align="center" style={{width: "46%"}}>제목</TableCell>
                                <TableCell align="center" style={{width: "10%"}}>작성자</TableCell>
                                <TableCell align="center" style={{width: "10%"}}>날짜</TableCell>
                                <TableCell align="center" style={{width: "12%"}}>조회수</TableCell>
                                <TableCell align="center" style={{width: "12%"}}>추천수</TableCell>
                            </TableRow>

                            {boards.map((row) => (
                                <TableRow hover={true} onClick={() => {
                                    window.location.href = "/board/" + row.boardId
                                }}>
                                    <TableCell align="center">{row.boardId}</TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{row.writer}</TableCell>
                                    <TableCell align="center">{row.createdAt.split("T")[0]}</TableCell>
                                    <TableCell align="center">{row.hit}</TableCell>
                                    <TableCell align="center">{row.star}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell align="center" colSpan={5}>
                                    <Box my={2} display="flex" justifyContent="center">
                                        <Pagination
                                            count={setPageCount()}
                                            color="primary"
                                            defaultPage={page}
                                            onChange={(e,page)=>{
                                                history.push(`/contact-us?page=${page}`)
                                                setPage(page)
                                            }}
                                        />
                                    </Box>
                                </TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={async ()=>{
                                            await loginCheck(token)
                                        }}
                                    >
                                    글 작성
                                    </Button>
                                </TableCell>
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
        </Grid>
        </div>
    )
};

export default Contact