import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const Board = ({match}) => {

    const [board,setBoard] = useState("")

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
                                        {board.content}
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Box my={2} display="flex" justifyContent="center">
                                        <h2>{board.star}</h2>
                                        <SentimentSatisfiedAltIcon color="primary" fontSize="large"/>
                                        <SentimentVeryDissatisfiedIcon color="secondary" fontSize="large"/>
                                        <h2>{board.unStar}</h2>
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