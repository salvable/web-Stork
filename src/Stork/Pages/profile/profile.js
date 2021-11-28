import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import {useHistory} from "react-router";

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

const Profile = ({match}) => {
    const history = useHistory()
    const classes = useStyles();
    const userId = match.params.userId

    const [id,setId] = useState("")
    const [email,setEmail] = useState("")
    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    useEffect(()=>{
        async function getUserInfo(token){
            try {
                if(token){
                    const response = await axios.get(`http://localhost:3000/user/${userId}`,{
                        headers: {
                            Authorization: `Bearer ${token}`
                        }})

                    setId(response.data.user.userId)
                    setEmail(response.data.user.email)
                    setName(response.data.user.name)
                    setPhoneNumber(response.data.user.phoneNumber)
                }
            }catch(e){
                alert("올바르지 않은 접근이거나 권한이 없습니다.")
                window.location.replace('/')
            }
        }
        const token = localStorage.getItem("accessToken")
        getUserInfo(token)
    },[])


    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar} />

                <Typography component="h1" variant="h5">
                    My Info
                </Typography>
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
                                value={id}
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
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="standard"
                                fullWidth
                                name="name"
                                label="name"
                                id="name"
                                value={name}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="standard"
                                fullWidth
                                name="phoneNumber"
                                label="phoneNumber"
                                type="text"
                                id="phoneNumber"
                                autoComplete="phoneNumber"
                                value={phoneNumber}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e)=>{
                          history.push(`/checkInfo/${userId}`)
                        }}
                    >
                        Modify Info
                    </Button>

                    </Grid>
                </form>
            </div>

        </Container>
    );
}

export default Profile