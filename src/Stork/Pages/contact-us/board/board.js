import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Button from "@material-ui/core/Button";

const Board = ({match}) => {
    // split을 사용하기 위한 초기값 설정
    const [board,setBoard] = useState({content: ""})

    const history = useHistory()
    const token = localStorage.getItem('accessToken')

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
        const response = await axios.put(`http://localhost:3000/board/${match.params.boardId}/star`,{
            type: starType
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }})
        setBoard(response.data.board)
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
            </Grid>
        </Grid>
    );
}

export default Board