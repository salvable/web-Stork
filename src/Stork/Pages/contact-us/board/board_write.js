import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Contact from "../contact-us";
import axios from "axios";
import {useHistory} from "react-router";

const BoardWrite = () => {
    const [name,setName] = useState("")
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")
    const [text, setText] = useState("")
    const [isCheck, setIsCheck] = useState(false)
    const [file,setFile] = useState(null)

    const history = useHistory()
    const token = localStorage.getItem('accessToken')

    const addBoard = async () =>{
        try{
            const response = await axios.post("http://localhost:3000/board", {
                userId: name,
                content: text,
                writer: isCheck ? "익명" : id,
                password: password,
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }})

            alert("게시글이 추가되었습니다.")
            history.replace("/board/" + response.data.board.boardId)
        }catch (e){
            alert("올바르지 않은 접근입니다.")
        }

    }

    const isDisabled = () => {
        if(isCheck){
            return true
        }
        return false
    }

    const setVariant = () =>{
        if(isCheck){
            return "filled"
        }
        return "outlined"
    }

    const fileChange = (e) =>{
        setFile(e.target.files[0])
    }

    const cancel = () =>{
        if(window.confirm("입력을 취소하고 이전페이지로 돌아가시겠습니까?")) {
           history.goBack()
        }
    }

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
                                        variant={setVariant()}
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="ID"
                                        label="ID"
                                        placeholder="ID"
                                        disabled = {isDisabled()}
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
                                <TableCell colSpan={4}>
                                    <TextareaAutosize
                                        minRows = "25"
                                        style={{width: "100%"}}
                                        value={text}
                                        onChange={(e)=> {
                                            setText(e.target.value)
                                        }}>
                                    </TextareaAutosize>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}>
                                    <input
                                        type="file"
                                        multiple onChange={(e)=>{
                                        fileChange(e)
                                        }}
                                    />
                                </TableCell>
                                <TableCell colSpan={2} align="right">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={()=>{
                                            cancel()
                                        }}>취소</Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={async()=>{
                                            await addBoard()
                                        }}>
                                        글작성
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

export default BoardWrite