import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import RegularExpression from "../../util/regularExpression"

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

    const addUser = async() =>{
        try {
            const response = await axios.post("http://localhost:3000/adduser", {
                userId: id,
                password: password,
                email: email,
                name: name,
                phoneNumber: phoneNumber
            })
            console.log(response)

            alert("회원가입이 완료되었습니다.")
            return true
        }
        catch (e){
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
                                error = {RegularExpression.checkId(id)}
                                helperText="5~20자의 영어,숫자만 사용 가능합니다."
                                name="ID"
                                variant="standard"
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
                                variant="standard"
                                required
                                error = {RegularExpression.checkPw(password)}
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
                                variant="standard"
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
                                variant="standard"
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
                                variant="standard"
                                required
                                fullWidth
                                name="phoneNumber"
                                label="phoneNumber"
                                type="text"
                                id="phoneNumber"
                                autoComplete="phoneNumber"
                                value={phoneNumber}
                                onChange={(e)=> {
                                    const regex = /^[0-9\b -]{0,13}$/;
                                    if (regex.test(e.target.value)) {
                                        if(e.target.value.length == 3 || e.target.value.length === 8){
                                            setPhoneNumber(e.target.value + "-");
                                        }else{
                                            setPhoneNumber(e.target.value);
                                        }
                                    }
                                }}
                                onKeyDown={(e)=>{
                                    if(!(e.keyCode >= 48 && e.keyCode <= 57) && e.keyCode === 8){
                                        if((e.target.value.length === 9 || e.target.value.length === 4) && phoneNumber.slice(e.target.value.length-1,e.target.value.length) == "-"){
                                           setPhoneNumber(phoneNumber.slice(0,e.target.value.length-1))
                                        }
                                    }
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
                            if(RegularExpression.checkId(id)){
                                alert("ID 양식을 확인해주세요.")
                                return;
                            }
                            if(RegularExpression.checkPw(password)){
                                alert("Password 양식을 확인해주세요.")
                                return;
                            }
                            if(!RegularExpression.checkEmail(email)){
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

        </Container>
    );
}