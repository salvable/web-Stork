import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import {useHistory} from "react-router";
import RegularExpression from "../../util/regularExpression"
import Avatar from "@material-ui/core/Avatar";

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

const ModifyInfo = ({match}) => {
    const history = useHistory()
    const classes = useStyles();
    const userId = match.params.userId

    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [email,setEmail] = useState("")
    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    useEffect(()=>{
        async function getUserInfo(){
            try {
                const response = await axios.get(`http://localhost:3000/getUser/${userId}`)
                setEmail(response.data.user.email)
                setName(response.data.user.name)
                setPhoneNumber(response.data.user.phoneNumber)
            }catch(e){
                alert("올바르지 않은 접근이거나 권한이 없습니다.")
                window.location.replace('/')
            }
        }
        getUserInfo()
    },[])

    const modifyUserInfo  = async() => {
        try{
            const response = await axios.put(`http://localhost:3000/updateUser/${userId}`,{
                password: password,
                email: email,
                name: name,
                phoneNumber: phoneNumber
            })

            if(response.data.user){
                alert("회원정보 변경이 완료되었습니다.")
                history.replace(`/profile/${userId}`)
            }
        } catch (e) {
            alert("입력정보를 확인해주세요")
        }
    }

    const deleteUser = async() =>{
        try{
            const response = await axios.delete(`http://localhost:3000/deleteUser/${userId}`)
            if(response.data.result){
                alert("회원 탈퇴되었습니다. 그동안 서비스를 이용해주셔서 감사합니다.")
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                window.location.replace('/')
            }
        } catch(e){
            alert("회원탈퇴에 실패하였습니다.")
        }

    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar} />
                <Typography component="h1" variant="h5">
                    Modify User Info
                </Typography>
                You can change the information except for the ID
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="ID"
                                variant="standard"
                                fullWidth
                                id="ID"
                                label="ID"
                                value={userId}
                                autoFocus
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="standard"
                                fullWidth
                                required
                                error = {RegularExpression.checkPw(password)}
                                type="password"
                                id="password"
                                label="Password"
                                name="password"
                                autoComplete="password"
                                value={password}
                                onChange={(e)=>{
                                    setPassword(e.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="standard"
                                fullWidth
                                required
                                error = {RegularExpression.checkPw(confirmPassword)}
                                type="Password"
                                id="confirmPassword"
                                label="confirmPassword"
                                name="confirmPassword"
                                autoComplete="confirmPassword"
                                value={confirmPassword}
                                onChange={(e)=>{
                                    setConfirmPassword(e.target.value)
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

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={ async() => {
                                if(RegularExpression.checkPw(password)){
                                    alert("Password 양식을 확인해주세요.")
                                    return;
                                }

                                if(password != confirmPassword){
                                    alert("비밀번호가 일치하지 않습니다.")
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

                                await modifyUserInfo()
                            }}
                        >
                            Modify
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={ async() => {
                                const result = window.confirm("정말로 회원탈퇴 하시겠습니까?")

                                if(result){
                                    await deleteUser()
                                }
                            }}
                        >
                            Withdraw
                        </Button>

                    </Grid>
                </form>
            </div>

        </Container>
    );
}

export default ModifyInfo