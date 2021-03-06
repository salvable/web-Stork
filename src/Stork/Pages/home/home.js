import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import axios from "axios";

const Home = () => {

    const styles = theme => ({
        root: {
            padding: theme.spacing(3),
            background: '#eeeeee'
        },
        paper: {
            padding: theme.spacing(3),
            textAlign: 'center',
            color: theme.palette.text.primary,
        },
        table: {
            minWidth: 650,
        }
    });

    // 각각 상한가, 하한가, 거래상위, 시가총액 상위를 나타냄, 네이밍은 네이버 주식 url로 결정
    const [siseUpper,setSiseUpper] = useState([])
    const [siseLower,setSiseLower] = useState([])
    const [siseQuant,setSiseQuant] = useState([])
    const [siseMarket,setSiseMarket] = useState([])


    useEffect(() => {
        async function getStorkData(){
            const siseUpperDataArray = []
            const siseUpperData = await axios.get("http://localhost:8000/crawling/stork/sise/sise_upper")

            siseUpperData.data.kospi.map((unit) => {
                siseUpperDataArray.push(unit)
            })
            siseUpperData.data.kosdak.map((unit) => {
                siseUpperDataArray.push(unit)
            })

            setSiseUpper(siseUpperDataArray)

            const siseLowerDataArray = []
            const siseLowerData = await axios.get("http://localhost:8000/crawling/stork/sise/sise_lower")
            siseLowerData.data.kospi.map((unit) => {
                siseLowerDataArray.push(unit)
            })
            siseLowerData.data.kosdak.map((unit) => {
                siseLowerDataArray.push(unit)
            })
            setSiseLower(siseLowerDataArray)

            const siseQuantData = await axios.get("http://localhost:8000/crawling/stork/sise/sise_quant")
            setSiseQuant(siseQuantData.data.kospi)

            const siseMarketData = await axios.get("http://localhost:8000/crawling/stork/sise/sise_market")
            setSiseMarket(siseMarketData.data.kospi)
        }

        getStorkData()
    },[]);

    return (
        <div className={styles.root}>
            <Grid container spacing={6} style={{height: "100%", marginTop: 1}}>
                <Grid item xs={6}>
                    <TableContainer component={Paper}>
                        <div style = {{
                            display: 'flex',
                            justifyContent:'center',
                            alignItems: 'center',
                        }}>
                        <h3>상한가 </h3>
                        </div>
                        <Table className={styles.table} aria-label="simple table" >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">종목명</TableCell>
                                    <TableCell align="center">현재가</TableCell>
                                    <TableCell align="center">전일비</TableCell>
                                    <TableCell align="center">등락률</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {siseUpper.map((row) => (
                                    <TableRow key={row[0]}>
                                        <TableCell align="center">{row[0]}</TableCell>
                                        <TableCell align="center">{row[1]}</TableCell>
                                        <TableCell align="center">{row[2]}</TableCell>
                                        <TableCell align="center">{row[3]}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer component={Paper}>
                        <div style = {{
                            display: 'flex',
                            justifyContent:'center',
                            alignItems: 'center',
                        }}>
                            <h3>하한가</h3>
                        </div>
                        <Table className={styles.table} aria-label="simple table" >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">종목명</TableCell>
                                    <TableCell align="center">현재가</TableCell>
                                    <TableCell align="center">전일비</TableCell>
                                    <TableCell align="center">등락률</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {siseLower.map((row) => (
                                    <TableRow key={row[0]}>
                                        <TableCell align="center">{row[0]}</TableCell>
                                        <TableCell align="center">{row[1]}</TableCell>
                                        <TableCell align="center">{row[2]}</TableCell>
                                        <TableCell align="center">{row[3]}</TableCell>
                                    </TableRow>

                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer component={Paper}>
                        <div style = {{
                            display: 'flex',
                            justifyContent:'center',
                            alignItems: 'center',
                        }}>
                            <h3>거래량 상위</h3>
                        </div>
                        <Table className={styles.table} aria-label="simple table" >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">종목명</TableCell>
                                    <TableCell align="center">현재가</TableCell>
                                    <TableCell align="center">전일비</TableCell>
                                    <TableCell align="center">등락률</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {siseQuant.map((row) => (
                                    <TableRow key={row[0]}>
                                        <TableCell align="center">{row[0]}</TableCell>
                                        <TableCell align="center">{row[1]}</TableCell>
                                        <TableCell align="center">{row[2]}</TableCell>
                                        <TableCell align="center">{row[3]}</TableCell>
                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer component={Paper}>
                        <div style = {{
                            display: 'flex',
                            justifyContent:'center',
                            alignItems: 'center',
                        }}>
                            <h3>시가총액 상위</h3>
                        </div>
                        <Table className={styles.table} aria-label="simple table" >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">종목명</TableCell>
                                    <TableCell align="center">현재가</TableCell>
                                    <TableCell align="center">전일비</TableCell>
                                    <TableCell align="center">등락률</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {siseMarket.map((row) => (
                                    <TableRow key={row[0]}>
                                        <TableCell align="center">{row[0]}</TableCell>
                                        <TableCell align="center">{row[1]}</TableCell>
                                        <TableCell align="center">{row[2]}</TableCell>
                                        <TableCell align="center">{row[3]}</TableCell>
                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>


            </Grid>
        </div>
    );
};

export default Home