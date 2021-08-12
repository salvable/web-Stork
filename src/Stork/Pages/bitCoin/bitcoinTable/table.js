import React, {useEffect, useState} from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
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
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import TableScrollbar from "react-table-scrollbar";

const BitCoinTable = () => {
    const styles = theme => ({
        root: {
            padding: theme.spacing(3),
            background: '#eeeeee',
            margin: '0.8rem'
        },
        paper: {
            padding: theme.spacing(3),
            textAlign: 'center',
            color: theme.palette.text.primary,
            margin: '0.8rem'
        },
        table: {
            minWidth: 650,
        }
    });
    // 각각 상한가, 하한가, 거래상위, 시가총액 상위를 나타냄, 네이밍은 네이버 주식 url로 결정
    const [coinList,setCoinList] = useState([])

    useEffect(() => {
        async function getCoinList(){
            const response = await axios.get("http://localhost:8000/api_bit/bitCoin/getBitcoinList")
            setCoinList(response.data.bitcoin)
        }

        getCoinList()
    },[]);

    const getCoinList = async (search) =>{
        const response = await axios.get(`http://localhost:8000/api_bit/bitCoin/getBitcoinList/${search}`)
        setCoinList(response.data.bitcoin)
    }

    return (
        <Grid container spacing={6} style={{height: "100%", marginTop: 1}}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table" >
                    <TableHead>
                        <TableRow>
                            <TextField
                                variant="outlined"
                                placeholder="CoinName Search"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                    style:{
                                        backgroundColor: "white",
                                        color: "black",
                                        width: "195%",
                                        margin: '5px'

                                    }
                                }}
                                onChange={async (e)=>{
                                    await getCoinList(e.target.value)
                                }}
                            />
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
            <TableContainer component={Paper}>
                <TableScrollbar rows={30}>
                    <Table className={styles.table} aria-label="simple table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">마켓 코드</TableCell>
                                <TableCell align="center">코인 이름</TableCell>
                                <TableCell align="center">english name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {coinList.map((row) => (
                                <TableRow onClick={() => {
                                    window.location.href = "/bitCoin/" + row.market
                                }}>
                                    <TableCell align="center">{row.market}</TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{row.eng_name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableScrollbar>
            </TableContainer>
        </Grid>
    );
};

export default BitCoinTable