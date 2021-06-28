import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const [id,setId] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [checkBox_1, setCheckBox_1] = useState(false)
    const [checkBox_2, setCheckBox_2] = useState(false)
    const [checkBox_3, setCheckBox_3] = useState(false)

    const checkId = () =>{
        const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
        const specialCharacters = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi

        if(id.length >=5 && id.length <= 20 && !(korean.test(id)) && id.search(/\s/) === -1 && !(specialCharacters.test(id))){
            return false
        }else{
            return true
        }
    }

    const checkPw = () =>{
        if(password.length >= 8 && password.length <= 20){
            return false
        }else{
            return true
        }
    }

    const checkEmail = () =>{
        const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        return regExp.test(email); // 형식에 맞는 경우 true 리턴
    }

    const addUser = async() =>{
        try {
            const response = await axios.post("http://localhost:3000/adduser", {
                userId: id,
                password: password,
                email: email,
                name: name,
                phoneNumber: phoneNumber
            })

            alert("회원가입이 완료되었습니다.")
            return true
        }
        catch (e){
            console.log(e)
            alert("입력 양식을 확인해주세요.")
            return false
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar} />

                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                error = {checkId()}
                                helperText="5~20자의 영어,숫자만 사용 가능합니다."
                                name="ID"
                                variant="outlined"
                                required
                                fullWidth
                                id="ID"
                                label="ID"
                                value={id}
                                autoFocus
                                onChange={(e)=> {
                                    setId(e.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                error = {checkPw()}
                                helperText="8~20자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={password}
                                autoComplete="current-password"
                                onChange={(e)=> {
                                    setPassword(e.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e)=> {
                                    setEmail(e.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="name"
                                label="name"
                                id="name"
                                value={name}
                                onChange={(e)=> {
                                    setName(e.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="phoneNumber"
                                label="phoneNumber"
                                type="phoneNumber"
                                id="phoneNumber"
                                autoComplete="phoneNumber"
                                value={phoneNumber}
                                onChange={(e)=> {
                                    setPhoneNumber(e.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkBox_1}
                                        color="primary"
                                        onClick={(e)=>{
                                            if(checkBox_1 === true){
                                                setCheckBox_1(false)
                                            }else{
                                                setCheckBox_1(true)
                                            }
                                        }}
                                    />}
                                label="이용약관 동의(필수)"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkBox_2}
                                        color="primary"
                                        onClick={(e)=>{
                                            if(checkBox_2 === true){
                                                setCheckBox_2(false)
                                            }else{
                                                setCheckBox_2(true)
                                            }
                                        }}
                                    />}
                                label="개인정보 수집 및 이용 동의(필수)"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkBox_3}
                                        color="primary"
                                        onClick={(e)=>{
                                            if(checkBox_3 === true){
                                                setCheckBox_3(false)
                                            }else{
                                                setCheckBox_3(true)
                                            }
                                        }}
                                    />}
                                label="프로모션 정보 수신 동의(선택)"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={async()=>{
                            if(checkId()){
                                alert("ID 양식을 확인해주세요.")
                                return;
                            }
                            if(checkPw()){
                                alert("Password 양식을 확인해주세요.")
                                return;
                            }
                            if(!checkEmail()){
                                alert("email 양식을 확인해주세요.")
                                return;
                            }
                            if(name.length > 30){
                                alert("이름 양식을 확인해주세요")
                                return;
                            }

                            if(checkBox_1 === true && checkBox_2 === true){
                                const result = await addUser()
                                if(result === true){
                                    window.location.replace("/signIn")
                                }
                            }else{
                                alert("필수 약관에 동의하세요.")
                            }
                        }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/signIn" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}