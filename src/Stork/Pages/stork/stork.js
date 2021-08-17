import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@material-ui/core";
import axios from "axios";
import TableScrollbar from 'react-table-scrollbar'
import SearchIcon from "@material-ui/icons/Search";
import chart from "../../Chart/storkChart.png"
import socketIOClient from "socket.io-client";
import ChatInput from "../../component/chat/chatInput";
import ChatLog from "../../component/chat/chatLog"
import StorkTable from "./storkTable/table"
import Button from "@material-ui/core/Button";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

const Stork = ({match}) => {

    // 각각 상한가, 하한가, 거래상위, 시가총액 상위를 나타냄, 네이밍은 네이버 주식 url로 결정
    const [storkId, setStorkId] = useState("")
    const [storkName,setStorkName] = useState("")
    const [storkPrice,setStorkPrice] = useState([])
    const [currentSocket, setCurrentSocket] = useState()
    const [isExistFavorite,setIsExistFavorite] = useState(false)

    const token = localStorage.getItem('accessToken')
    const userId = localStorage.getItem("userId")

    const myInfo = {
        roomName: match.params.storkId ? match.params.storkId : "005930",
        userName: userId ? userId : "guest",
    };

    useEffect(() => {
        async function setStorkNameById(){
            if(match.params.storkId == undefined){
                const response = await axios.get(`http://localhost:8000/crawling/getStorksById/005930`)
                setStorkName("삼성전자")
                setStorkId("005930")
            }else{
                const response = await axios.get(`http://localhost:8000/crawling/getStorksById/${match.params.storkId}`)
                setStorkName(response.data.storks.name)
                setStorkId(match.params.storkId)
            }
        }
        setStorkNameById()
    },[]);

    useEffect(() => {
        async function getStorkChart(){
                const response = await axios.get(`http://localhost:8000/crawling/stork/getChart/${storkId}`)
        }
        getStorkChart()
    },[storkId]);

    useEffect(() => {
        async function getStorkPrice(){
                const response = await axios.get(`http://localhost:8000/crawling/stork/${storkId}`)
                setStorkPrice(response.data)
        }
        getStorkPrice()
    },[storkId]);

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
        async function getFavorite(){
                const response = await axios.get(`http://localhost:3000/favorite/${userId}?favoriteId=${storkId}`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }})
                if(response.data.favorite != null){
                    setIsExistFavorite(true)
                }
            }
        getFavorite()
    },[storkId]);

    const setStorkColor = () =>{
        const str = String(storkPrice.variance)

        if(str.indexOf("하락") != -1){
            return {color: "blue"}
        }
        return {color: "red"}
    }

    const setIcon = () =>{
        if(isExistFavorite == true){
            return <StarIcon/>
        }
        return <StarBorderIcon/>
    }

    const setFavorite = async() =>{
        if(isExistFavorite == true){
            const response = await axios.delete(`http://localhost:3000/favorite/${userId}?favoriteId=${storkId}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }})

            setIsExistFavorite(false)
            alert("즐겨찾기에서 삭제되었습니다.")
            return ;
        }

        const response = await axios.post(`http://localhost:3000/favorite/${userId}`,{
            favoriteId: storkId,
            favoriteName: storkName,
            type: "stork"
          }, {
            headers: {
                Authorization: `Bearer ${token}`
            }})
        setIsExistFavorite(true)
        alert("즐겨찾기에 추가되었습니다.")
        return ;
    }

    return (
            <Grid container spacing={6} style={{height: "100%", marginTop: 1}}>
                <Grid item xs={8}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table" >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" colSpan={3}><h1>{storkName}</h1></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell rowSpan={2} style={{ width: "50%" }}><h1 style={setStorkColor()}>{storkPrice.price}</h1><h4>전일대비 {storkPrice.variance + storkPrice.variance_sign}</h4></TableCell>
                                    <TableCell style={{ width: "25%" ,color: "red"}}>고가 {storkPrice.highPrice}</TableCell>
                                    <TableCell style={{ width: "25%" }}>거래 : <Button variant="contained" color="primary">매수</Button> <Button variant="contained" color="secondary">매도</Button></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ width: "25%" ,color: "blue"}}>저가 {storkPrice.lowPrice}</TableCell>
                                    <TableCell style={{ width: "25%" }}>즐겨찾기 :
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={async()=>{
                                                await setFavorite()
                                            }}>
                                            {setIcon()}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}><img src={chart}></img></TableCell>
                                    <TableRow>
                                        <TableCell height={600} >
                                            <h3>채팅방</h3>
                                            <ChatLog socket={currentSocket}></ChatLog>
                                            <ChatInput userId={userId} socket={currentSocket}></ChatInput>
                                        </TableCell>
                                    </TableRow>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={4}>
                        <StorkTable></StorkTable>
                </Grid>
        </Grid>
    );
};

export default Stork