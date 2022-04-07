import React, {useState} from 'react';
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
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const CheckInfo = ({match}) => {
    const history = useHistory()
    const classes = useStyles();
    const userId = match.params.userId

    const [password,setPassword] = useState("")

    const checkUser = async() => {
        try{
            const token = localStorage.getItem("accessToken")
            const response = await axios.get(`http://localhost:3000/verification/${userId}?password=${password}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }})
            if(response.data.result){
                alert("유저 정보가 확인되었습니다.")
                history.replace(`/modify/${userId}`)
            }
        }catch (e) {
            alert("비밀번호가 틀렸습니다.")
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    User Confirmation
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
                                type="password"
                                id="password"
                                label="Password"
                                name="password"
                                autoComplete="password"
                                value={password}

                                onChange={(e)=>{
                                    setPassword(e.target.value)
                                    console.log(password)
                                }}

                            />
                        </Grid>

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={async()=>{
                                await checkUser()
                            }}
                        >
                            confirm
                        </Button>

                    </Grid>
                </form>
            </div>

        </Container>
    );
}

export default CheckInfo