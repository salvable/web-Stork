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
import Button from "@material-ui/core/Button";

const Comment = ({boardId,token}) => {

    const [id,setId] = useState("")
    const [password,setPassword] = useState("")
    const [isCheck, setIsCheck] = useState(false)
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])

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

    useEffect(() => {
        async function getComment(){
            const response = await axios.get(`http://localhost:3000/board/${boardId}/comment`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }})
            setComments(response.data.comment)
        }
        getComment()
    }, []);


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
                <TableScrollbar rows={20}>
                    <Table className={styles.table} aria-label="simple table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={{width: "20%"}}>ID</TableCell>
                                <TableCell align="center" style={{width: "60%"}}>Content</TableCell>
                                <TableCell align="center" style={{width: "20%"}}>X</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {comments.map((row) => (
                                <TableRow hover={true}>
                                    <TableCell align="center">{row.userId}</TableCell>
                                    <TableCell align="center">{row.content}</TableCell>
                                    <TableCell align="center">X</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableScrollbar>
            </TableContainer>
            <TableContainer component={Paper}>
                    <Table className={styles.table} aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell style={{width: "30%"}}>
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
                                <TableCell style={{width: "30%"}}>
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
                                <TableCell style={{width: "40%"}}>
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
                            <TableRow>
                                <TableCell colSpan={2} style={{width: "70%"}}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="comment"
                                        label="comment"
                                        placeholder="comment"
                                        type="comment"
                                        id="comment"
                                        color = "primary"
                                        value={comment}

                                        onChange={(e)=>{
                                            setComment(e.target.value)
                                        }}
                                    />
                                </TableCell>
                                <TableCell style={{width: "30%"}}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        onClick={async()=>{

                                        }}>
                                        글작성
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
            </TableContainer>
        </Grid>
    );
};

export default Comment