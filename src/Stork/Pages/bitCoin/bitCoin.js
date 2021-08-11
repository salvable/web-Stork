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
import chart from "../../Chart/storkChart.png";
import ChatLog from "../../component/chat/chatLog";
import ChatInput from "../../component/chat/chatInput";
import socketIOClient from "socket.io-client";
import axios from "axios";

const Bitcoin = ({match}) => {

    const [bitcoin,setBitcoin] = useState("")
    const [currentSocket, setCurrentSocket] = useState()

    const userId = localStorage.getItem("userId")

    const myInfo = {
        roomName: match.params.bitCoinId ? match.params.bitCoinId : "KRW-BTC",
        userName: userId ? userId : "guest",
    };

    useEffect(() => {
        async function getBitcoin(){
            if(match.params.storkId == undefined){
                const response = await axios.get(`http://localhost:8000/api_bit/bitCoin/getBitcoinPrice/KRW-BTC`)
                console.log(response.data)
                setBitcoin(response.data)
            }else{
                const response = await axios.get(`http://localhost:8000/api_bit/bitCoin/getBitcoinPrice/${match.params.bitCoinId}`)
                setBitcoin(response.data)
            }
        }
        getBitcoin()
    }, [currentSocket]);

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
        const str = String(bitcoin.change)

        if(str.indexOf("FALL") != -1){
            return {color: "blue"}
        }
        return {color: "red"}
    }

    return (
        <Grid container spacing={6} style={{height: "100%", marginTop: 1}}>
            <Grid item xs={8}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table" >
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" colSpan={3}><h1>{bitcoin.name}</h1></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell rowSpan={2} style={{ width: "50%" }}><h1 style={setStorkColor()}>{bitcoin.price}</h1><h4>전일대비 {bitcoin.change_price}{bitcoin.change}</h4></TableCell>
                                <TableCell style={{ width: "25%" ,color: "red"}}>고가 {bitcoin.high_price}</TableCell>
                                <TableCell style={{ width: "25%" }}>거래량</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ width: "25%" ,color: "blue"}}>저가 {bitcoin.low_price}</TableCell>
                                <TableCell style={{ width: "25%" }}>거래대금</TableCell>
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