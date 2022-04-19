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
import CoinChart from "../../Chart/coinChart.png";
import StorkChart from "../../Chart/storkChart.png"
import ChatLog from "../../component/chat/chatLog";
import ChatInput from "../../component/chat/chatInput";
import socketIOClient from "socket.io-client";
import axios from "axios";
import {useHistory} from "react-router";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Button from "@material-ui/core/Button";
import Loading from "../../component/Loading/loading";

const Favorite = ({match}) => {

    const [favorites,setFavorites] = useState([])
    const [currentFavorite,setCurrentFavorite] = useState("")
    const [currentPrice, setCurrentPrice] = useState("null")
    const [currentSocket, setCurrentSocket] = useState()
    const [isExistFavorite, setIsExistFavorite] = useState(false)
    const [loading,setLoading] = useState(false)

    const token = localStorage.getItem('accessToken')
    const userId = localStorage.getItem("userId")
    const history = useHistory()

    const myInfo = {
        roomName: match.params.favoriteId ? match.params.favoriteId : "favorite",
        userName: userId ? userId : "guest",
    };

    const getStorkPrice= async() => {
        const response = await axios.get(`http://localhost:8000/crawling/stork/${currentFavorite.favoriteId}`)
        setCurrentPrice(response.data)
    }

    const getCoinPrice= async() => {
        const response = await axios.get(`http://localhost:8000/api_bit/bitCoin/getBitcoinPrice/${currentFavorite.favoriteId}`)
        setCurrentPrice(response.data)
    }

    const getStorkChart= async() => {
        const response = await axios.get(`http://localhost:8000/crawling/stork/getChart/${currentFavorite.favoriteId}`)
    }

    const getCoinChart= async() => {
        const response = await axios.get(`http://localhost:8000/api_bit/bitCoin/getBitcoinChart/${currentFavorite.favoriteId}`)
    }

    const getChartByType = (type) =>{
        if(!currentFavorite){
            return ;
        }
        if(type === "stork"){
            return StorkChart
        }else{
            return CoinChart
        }
    }

    useEffect(() => {
        function isLogin(){
            if(!userId){
                alert("로그인 후 즐겨찾기 기능을 이용해 주세요.")
                history.goBack()
            }
        }

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
                try{
                    const response = await axios.get(`http://localhost:3000/favorite/${userId}?favoriteId=${match.params.favoriteId}`,{
                        headers: {
                            Authorization: `Bearer ${token}`
                        }})
                    setCurrentFavorite(response.data.favorite)
                }catch (e){
                    alert("접근권한이 없습니다.")
                    history.goBack()
                }
            }
        }
        getFavorites()
        isLogin()
    }, []);
    //

    useEffect(() => {
        async function getPrice(){
            if(currentFavorite.type === "stork"){
                await getStorkPrice()
            }else {
                await getCoinPrice()
            }
        }

        if(currentFavorite){
            getPrice()
        }
    },[currentFavorite]);

    useEffect(() => {
        async function getChart(){
            if(currentFavorite.type === "stork"){
                await getStorkChart()
            }else {
                await getCoinChart()
            }
        }
        if(currentFavorite) {
            getChart()
        }
    },[currentFavorite]);

    useEffect(() => {
        async function isExistFavorite(){
            const response = await axios.get(`http://localhost:3000/favorite/${userId}?favoriteId=${currentFavorite.favoriteId}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }})
            if(response.data.favorite != null){
                setIsExistFavorite(true)
            }
        }
        if(currentFavorite) {
            isExistFavorite()
        }
    },[currentFavorite]);

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
        setTimeout(function() {
            setLoading(true)
        }, 1500);
    }, []);

    const setStorkColor = () =>{
        const str = String(currentPrice.variance_sign)

        if(str.indexOf("FALL") != -1 || str.indexOf("하락") != -1){
            return {color: "blue"}
        }
        return {color: "red"}
    }

    const setChange = (change) =>{
        if(change == "FALL" || change == "하락"){
            return " 하락"
        }else if (change == "EVEN"){
            return " 보합"
        }else{
            return "상승"
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
            const response = await axios.delete(`http://localhost:3000/favorite/${userId}?favoriteId=${currentFavorite.favoriteId}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }})

            setIsExistFavorite(false)
            alert("즐겨찾기에서 삭제되었습니다.")
            return ;
        }

        const response = await axios.post(`http://localhost:3000/favorite/${userId}`,{
            favoriteId: currentFavorite.favoriteId,
            favoriteName: currentFavorite.favoriteName,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }})
        setIsExistFavorite(true)
        alert("즐겨찾기에 추가되었습니다.")
    }

    if(!loading){
        return(
            <Loading></Loading>
        )
    }

    else {
        return (
            <Grid container spacing={6} style={{height: "100%", marginTop: 1}}>
                <Grid item xs={8}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" colSpan={3}><h1>{currentFavorite.favoriteName}</h1>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell rowSpan={2} style={{width: "50%"}}><h1
                                        style={setStorkColor()}>{currentPrice.price}</h1>
                                        <h4>전일대비 {currentPrice.variance}{setChange(currentPrice.variance_sign)}</h4>
                                    </TableCell>
                                    <TableCell
                                        style={{width: "25%", color: "red"}}>고가 {currentPrice.highPrice}</TableCell>
                                    <TableCell style={{width: "25%"}}>거래 : <Button variant="contained"
                                                                                   color="primary">매수</Button> <Button
                                        variant="contained" color="secondary">매도</Button></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        style={{width: "25%", color: "blue"}}>저가 {currentPrice.lowPrice}</TableCell>
                                    <TableCell style={{width: "25%"}}>즐겨찾기 :
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={async () => {
                                                await setFavorite()
                                            }}>
                                            {setIcon()}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}><img
                                        src={getChartByType(currentFavorite.type)}></img></TableCell>
                                    <TableRow>
                                        <TableCell height={600}>
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
                        favorites={favorites}
                        userId={userId}
                        token={token}>
                    </FavoriteTable>
                </Grid>
            </Grid>
        );
    }
};

export default Favorite