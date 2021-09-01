import React, {useEffect, useState} from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import {
    Box,
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
import Checkbox from "@material-ui/core/Checkbox";

const Comment = ({boardId}) => {

    const [id,setId] = useState("")
    const [password,setPassword] = useState("")
    const [isCheck, setIsCheck] = useState(false)

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

    return (
        <Grid container spacing={6} style={{height: "50%", marginTop: 1}}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table" >
                    <TableHead>
                        <TableRow>
                            <TableCell><h2>댓글</h2></TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
            <TableContainer component={Paper}>
                <TableScrollbar rows={25}>
                    <Table className={styles.table} aria-label="simple table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">종목 코드</TableCell>
                                <TableCell align="center">코인 이름</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                        </TableBody>
                    </Table>
                </TableScrollbar>
            </TableContainer>
            <TableContainer component={Paper}>
                    <Table className={styles.table} aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell style={{width: "25%"}}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="ID"
                                        label="ID"
                                        placeholder="ID"
                                        type="ID"
                                        id="ID"
                                        color = "primary"
                                        value={id}
                                        autoComplete="current-password"
                                        onChange={(e)=>{
                                            setId(e.target.value)
                                        }}
                                    />
                                </TableCell>
                                <TableCell style={{width: "25%"}}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="password"
                                        placeholder="password"
                                        type="password"
                                        id="password"
                                        color = "primary"
                                        value={password}
                                        autoComplete="current-password"
                                        onChange={(e)=>{
                                            setPassword(e.target.value)
                                        }}
                                    />
                                </TableCell>
                                <TableCell style={{width: "50%"}}>
                                    익명
                                    <Checkbox
                                        checked	={isCheck}
                                        onClick={(e)=>{
                                            if(isCheck){
                                                setIsCheck(false)
                                            }else{
                                                setIsCheck(true)
                                            }

                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
            </TableContainer>
        </Grid>
    );
};

export default Comment