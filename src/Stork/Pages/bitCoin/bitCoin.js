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

import BitCoinTable from "./bitcoinTable/table";
import chart from "../../Chart/coinChart.png";
import ChatLog from "../../component/chat/chatLog";
import ChatInput from "../../component/chat/chatInput";
import socketIOClient from "socket.io-client";
import axios from "axios";
import {useHistory} from "react-router";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Button from "@material-ui/core/Button";

const Bitcoin = ({match}) => {

    const [bitCoin,setBitCoin] = useState("")
    const [bitCoinId,setBitCoinId] = useState("")
    const [currentSocket, setCurrentSocket] = useState()
    const [isExistFavorite, setIsExistFavorite] = useState(false)

    const token = localStorage.getItem('accessToken')
    const userId = localStorage.getItem("userId")
    const history = useHistory()

    const myInfo = {
        roomName: match.params.bitCoinId ? match.params.bitCoinId : "KRW-BTC",
        userName: userId ? userId : "guest",
    };

    useEffect(() => {
        async function getBitcoin(){
            if(match.params.bitCoinId == undefined){
                const response = await axios.get(`http://localhost:8000/api_bit/bitCoin/getBitcoinPrice/KRW-BTC`)
                setBitCoinId("KRW-BTC")
                setBitCoin(response.data)
            }else{
                try {
                    const response = await axios.get(`http://localhost:8000/api_bit/bitCoin/getBitcoinPrice/${match.params.bitCoinId}`)
                    setBitCoinId(match.params.bitCoinId)
                    setBitCoin(response.data)
                }catch (e){
                    alert("상장 폐지된 코인입니다!")
                    history.goBack()
                }
            }
        }
        getBitcoin()
    }, []);

    useEffect(() => {
        async function getStorkChart(){
            if(match.params.bitCoinId == undefined){
                const response = await axios.get(`http://localhost:8000/api_bit/bitCoin/getBitcoinChart/KRW-BTC`)
            }else{
                const response = await axios.get(`http://localhost:8000/api_bit/bitCoin/getBitcoinChart/${match.params.bitCoinId}`)
            }
        }
        getStorkChart()
    },[]);

    useEffect(() => {
        async function getFavorite(){
            const response = await axios.get(`http://localhost:3000/favorite/${userId}?favoriteId=${bitCoinId}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }})
            if(response.data.favorite != null){
                setIsExistFavorite(true)
            }
        }
        getFavorite()
    },[]);

    useEffect(() => {
        if (currentSocket) {
            currentSocket.on("connect", () => {
                currentSocket.emit("join", myInfo);
            });
        }else{
            setCurrentSocket(socketIOClient("localhost:3002"));
        }
    }, [currentSocket]);

    const setStorkColor = () =>{
        const str = String(bitCoin.change)

        if(str.indexOf("FALL") != -1){
            return {color: "blue"}
        }
        return {color: "red"}
    }

    const setChange = (change) =>{
        if(change == "FALL"){
            return " 하락"
        }else if (change == "EVEN"){
            return " 보합"
        }else{
            return " 상승"
        }
    }

    const setIcon = () =>{
        if(isExistFavorite == true){
            return <StarIcon/>
        }
        return <StarBorderIcon/>
    }

    const setFavorite = async() =>{
        if(isExistFavorite == true){
            const response = await axios.delete(`http://localhost:3000/favorite/${userId}?favoriteId=${bitCoinId}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }})

            setIsExistFavorite(false)
            alert("즐겨찾기에서 삭제되었습니다.")
            return ;
        }

        const response = await axios.post(`http://localhost:3000/favorite/${userId}`,{
            favoriteId: bitCoinId,
            favoriteName: bitCoin.name,
            type: "bitcoin"
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }})
        setIsExistFavorite(true)
        alert("즐겨찾기에 추가되었습니다.")
    }

    return (
        <Grid container spacing={6} style={{height: "100%", marginTop: 1}}>
            <Grid item xs={8}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table" >
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" colSpan={3}><h1>{bitCoin.name}</h1></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell rowSpan={2} style={{ width: "50%" }}><h1 style={setStorkColor()}>{bitCoin.price}</h1><h4>전일대비 {bitCoin.variance}{setChange(bitCoin.variance_sign)}</h4></TableCell>
                                <TableCell style={{ width: "25%" ,color: "red"}}>고가 {bitCoin.highPrice}</TableCell>
                                <TableCell style={{ width: "25%" }}>거래 : <Button variant="contained" color="primary">매수</Button> <Button variant="contained" color="secondary">매도</Button></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ width: "25%" ,color: "blue"}}>저가 {bitCoin.lowPrice}</TableCell>
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
                <BitCoinTable></BitCoinTable>
            </Grid>
        </Grid>
    );
};

export default Bitcoin