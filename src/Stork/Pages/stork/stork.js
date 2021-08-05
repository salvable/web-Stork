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

const Stork = ({match}) => {
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
    const [storkList,setStorkList] = useState([])
    const [storkName,setStorkName] = useState("")
    const [storkPrice,setStorkPrice] = useState([])

    useEffect(() => {
        async function getStorkList(){
            const response = await axios.get("http://localhost:8000/crawling/getStorks")
            setStorkList(response.data.storks)
        }
        getStorkList()
    },[]);

    useEffect(() => {
        async function getStorkChart(){
            if(match.params.storkName == undefined){
                setStorkName("삼성전자")
                const response = await axios.get(`http://localhost:8000/crawling/stork/getChart/삼성전자`)
            }else{
                setStorkName(match.params.storkName)
                const response = await axios.get(`http://localhost:8000/crawling/stork/getChart/${match.params.storkName}`)
            }
        }
        getStorkChart()
    },[]);

    useEffect(() => {
        async function getStorkPrice(){
            if(match.params.storkName == undefined){
                const response = await axios.get(`http://localhost:8000/crawling/stork/삼성전자`)
                setStorkPrice(response.data)
            }else{
                const response = await axios.get(`http://localhost:8000/crawling/stork/${match.params.storkName}`)
                setStorkPrice(response.data)
            }
        }
        getStorkPrice()
    },[]);


    const getStorkList = async (search) =>{
        const response = await axios.get(`http://localhost:8000/crawling/getStorks/${search}`)
        setStorkList(response.data.storks)
    }

    const setStorkColor = () =>{
        const str = String(storkPrice.variance)
        console.log(str)
        console.log(storkPrice.variance)
        console.log(str.indexOf("하락"))
        if(str.indexOf("하락") != -1){
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
                                    <TableCell align="left" colSpan={3}><h1>{storkName}</h1></TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell rowSpan={2} style={{ width: "50%" }}><h1 style={setStorkColor()}>{storkPrice.price}</h1><h4>전일대비 {storkPrice.variance}</h4></TableCell>
                                    <TableCell style={{ width: "25%" }}>고가</TableCell>
                                    <TableCell style={{ width: "25%" }}>거래량</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ width: "25%" }}>저가</TableCell>
                                    <TableCell style={{ width: "25%" }}>거래대금</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}><img src={chart}></img></TableCell>
                                    <TableCell>12312312</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                <Grid item xs={4}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table" >
                            <TableHead>
                                <TableRow>
                                    <TextField
                                        variant="outlined"
                                        placeholder="StorkName Search"
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
                                            await getStorkList(e.target.value)
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
                                    <TableCell align="center">종목 이름</TableCell>
                                    <TableCell align="center">종목 코드</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {storkList.map((row) => (
                                    <TableRow key={row.stork_id}>
                                        <TableCell align="center">{row.stork_id}</TableCell>
                                        <TableCell align="center">{row.name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                     </TableScrollbar>
                </TableContainer>
            </Grid>
        </Grid>
    );
};

export default Stork