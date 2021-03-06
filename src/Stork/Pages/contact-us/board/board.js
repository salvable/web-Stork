import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Button from "@material-ui/core/Button";
import Comment from "./comment";

const Board = ({match}) => {
    // split을 사용하기 위한 초기값 설정
    const [board,setBoard] = useState({content: ""})
    const [password,setPassword] = useState("")

    const history = useHistory()
    const token = localStorage.getItem('accessToken')
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        async function getBoard(){
            const response = await axios.get(`http://localhost:3000/board/${match.params.boardId}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }})
            setBoard(response.data.board)
            console.log(response.data.board)
        }
        getBoard()
    }, []);

    const getSplitDate = (date) =>{
        if(board.createdAt){
            const data = date.split("T")[0]
            return data
        }
    }

    const updateStar = async(starType) =>{
        try {
            const response = await axios.put(`http://localhost:3000/board/${match.params.boardId}/star`,{
                type: starType,
                userId: userId
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }})
            setBoard(response.data.board)
        }catch (e) {
            alert("이미 추천 또는 비추천 한 게시글입니다.")
        }

    }

    const checkAuth = async() =>{
        try{
            const response = await axios.get("http://localhost:3000/checkAuth",{
                headers: {
                    Authorization: `Bearer ${token}`
                }})
            return true
        }catch (e) {
            return false
        }
    }

    const deleteBoard = async() =>{
        try{
            const response = await axios.delete(`http://localhost:3000/board/${board.boardId}?password=${password}`)
            alert("글 삭제가 완료되었습니다.")
            history.push("/contact-us")
        }catch (e) {
            alert("비밀번호가 틀렸습니다.")
        }
    }

    const checkPassword = async() =>{
        try{
            const response = await axios.get(`http://localhost:3000/board/${board.boardId}/checkPw?password=${password}`)
            if(response.data.result == true){
                window.location.href = "/boardUpdate/" + board.boardId
            }

        }catch (e) {
            alert("비밀번호가 틀렸습니다.")
        }
    }

    return (
        <Grid container spacing={6} style={{marginTop: 1, display: 'flex'}}>
            <Grid item xs={8} >
                <TableContainer component = {Paper}>
                    <Table aria-label="simple table" >
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" colSpan={4} style={{justifyContent: 'center'}}><h1>자유게시판</h1></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{width: "50%"}}>
                                    <h2>{board.name}</h2><h5>{board.writer + " | " + getSplitDate(board.createdAt)}</h5>
                                </TableCell>
                                <TableCell style={{width: "30%"}}>
                                </TableCell>
                                <TableCell style={{width: "20%"}}>
                                    <h3>{"조회 : " + board.hit + " 추천 : " + board.star + " 댓글 : " + 0}</h3>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <div>
                                        {
                                            board.content.split("\n").map((line) => {
                                                return (
                                                    <span>
                                                        {line}
                                                        <br />
                                                    </span>
                                                );
                                            })
                                        }
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Box my={2} display="flex" justifyContent="center">
                                        <h1>{board.star}</h1>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={async (e)=>{
                                                const isLogin = await checkAuth()
                                                if(!isLogin){
                                                    alert("로그인 후 추천 기능을 이용할 수 있습니다.")
                                                    return ;
                                                }
                                                await updateStar("star")
                                            }}>
                                            <SentimentSatisfiedAltIcon fontSize="large"/>
                                        </Button>
                                        &nbsp;
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={async (e)=>{
                                                const isLogin = await checkAuth()
                                                if(!isLogin){
                                                    alert("로그인 후 추천 기능을 이용할 수 있습니다.")
                                                    return ;
                                                }
                                                await updateStar("unStar")
                                            }}>
                                            <SentimentVeryDissatisfiedIcon fontSize="large"/>
                                        </Button>
                                        <h1>{board.unStar}</h1>
                                    </Box>

                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box my={2} display="flex" justifyContent="flex-end">
                    <TextField
                        margin="normal"
                        required
                        name="password"
                        placeholder="password"
                        type="password"
                        id="password"
                        value={password}
                        autoComplete="current-password"
                        size="small"
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                    />
                    &nbsp;
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={async (e)=>{
                            await checkPassword()
                        }}>
                        글수정
                    </Button>
                    &nbsp;
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={async (e)=>{
                            await deleteBoard()
                        }}>
                        글삭제
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={4} >
                <Comment
                    boardId = {match.params.boardId}
                    token={token}
               />
            </Grid>
        </Grid>
    );
}

export default Board