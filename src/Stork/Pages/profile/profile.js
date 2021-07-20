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
    const [email,setEmail] = useState("")
    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")


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
                    </Grid>
                </form>
            </div>

        </Container>
    );
}