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

import FavoriteTable from "./table/favoriteTable";
import chart from "../../Chart/coinChart.png";
import ChatLog from "../../component/chat/chatLog";
import ChatInput from "../../component/chat/chatInput";
import socketIOClient from "socket.io-client";
import axios from "axios";
import {useHistory} from "react-router";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Button from "@material-ui/core/Button";

const Favorite = ({match}) => {

    const [favorites,setFavorites] = useState([])
    const [currentFavorite,setCurrentFavorite] = useState(null)
    const [currentSocket, setCurrentSocket] = useState()
    const [isExistFavorite, setIsExistFavorite] = useState(false)

    const token = localStorage.getItem('accessToken')
    const userId = localStorage.getItem("userId")
    const history = useHistory()

    const myInfo = {
        roomName: match.params.favoriteId ? match.params.favoriteId : favorites[0].favoriteId,
        userName: userId ? userId : "guest",
    };

    useEffect(() => {
        async function getFavorites() {
            const response = await axios.get(`http://localhost:3000/favorites/${userId}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }})
            setFavorites(response.data.favorites)

            // params로 값이 없는경우 favorites[0]로 설정
            if(match.params.favoriteId === undefined && response.data.favorites[0]){
                setCurrentFavorite(response.data.favorites[0])
            }

            // params로 값이 있는경우
            if(match.params.favoriteId){
                const response = await axios.get(`http://localhost:3000/favorite/${userId}?favoriteId=${match.params.favoriteId}`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }})
                setCurrentFavorite(response.data.favorite)
            }
        }
        getFavorites()
    }, []);

    useEffect(() => {
        async function getFavorite(){

        }

        if(currentFavorite || match.params.favoriteId){
            getFavorite()
        }
    },[currentFavorite]);

    useEffect(() => {
        async function getChart(){
            //Todo 타입에 따라서 요청이 달라야 함 , 생각해야 할 부분
        }
        getChart()
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
                                <TableCell align="left" colSpan={3}><h1>{currentFavorite.name}</h1></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell rowSpan={2} style={{ width: "50%" }}><h1 style={setStorkColor()}>{currentFavorite.price}</h1><h4>전일대비 {currentFavorite.change_price}{setChange(currentFavorite.change)}</h4></TableCell>
                                <TableCell style={{ width: "25%" ,color: "red"}}>고가 {currentFavorite.high_price}</TableCell>
                                <TableCell style={{ width: "25%" }}>거래 : <Button variant="contained" color="primary">매수</Button> <Button variant="contained" color="secondary">매도</Button></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ width: "25%" ,color: "blue"}}>저가 {currentFavorite.low_price}</TableCell>
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
                <FavoriteTable
                    favorites= {favorites}>
                </FavoriteTable>
            </Grid>
        </Grid>
    );
};

export default Favorite