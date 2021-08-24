import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

export default function BoardWrite() {
    const [name,setName] = useState("")
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")

    return (
        <Grid container spacing={6} style={{marginTop: 1, display: 'flex'}}>
            <Grid item xs={8} >
                <TableContainer component = {Paper}>
                    <Table aria-label="simple table" >
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" colSpan={4} style={{justifyContent: 'center'}}><h1>글 쓰기</h1></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{width: "50%"}}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="제목"
                                        label="제목"
                                        placeholder="제목"
                                        id="name"
                                        value={name}
                                        autoComplete="current-password"
                                        onChange={(e)=>{
                                            setName(e.target.value)
                                        }}
                                    />
                                </TableCell>
                                <TableCell style={{width: "20%"}}>
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
                                        value={id}
                                        autoComplete="current-password"
                                        onChange={(e)=>{
                                            setId(e.target.value)
                                        }}
                                    />
                                </TableCell>
                                <TableCell style={{width: "20%"}}>
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
                                        value={password}
                                        autoComplete="current-password"
                                        onChange={(e)=>{
                                            setPassword(e.target.value)
                                        }}
                                    />
                                </TableCell>
                                <TableCell style={{width: "10%"}}>
                                    익명
                                    <Checkbox/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <TextareaAutosize minRows = "25" style={{width: "100%"}}></TextareaAutosize>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}></TableCell>
                                <TableCell colSpan={2} align="right">
                                    <Button variant="contained" color="secondary">취소</Button>
                                    <Button variant="contained" color="primary">글작성</Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}