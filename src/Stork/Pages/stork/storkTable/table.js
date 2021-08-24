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

const StorkTable = () => {
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

    useEffect(() => {
        async function getStorkList(){
            const response = await axios.get("http://localhost:8000/crawling/getStorks")
            setStorkList(response.data.storks)
        }
        getStorkList()
    },[]);

    const getStorkList = async (search) =>{
        const response = await axios.get(`http://localhost:8000/crawling/getStorks/${search}`)
        setStorkList(response.data.storks)
    }

    return (
        <Grid container spacing={6} style={{height: "100%", marginTop: 1}}>
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
                                    <TableRow hover={true} onClick={() => {
                                        window.location.href = "/stork/" + row.stork_id
                                    }}>
                                        <TableCell align="center" >{row.stork_id}</TableCell>
                                        <TableCell align="center" >{row.name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableScrollbar>
                </TableContainer>
        </Grid>
    );
};

export default StorkTable