import React from "react";
import Grid from '@material-ui/core/Grid';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Home from "../home/home";

const Profile = () => {

    const styles = theme => ({
        root: {
            marginTop: 5,
            padding: theme.spacing(3),
            background: '#eeeeee'
        },
        paper: {
            padding: theme.spacing(3),
            textAlign: 'center',
            color: theme.palette.text.primary,
        },
    });


    return (
        <div className={styles.root}>
            <Grid container spacing={8}>
                <Grid item xs={6}>
                    <Paper className={styles.paper} elevation={3}>
                        <div>내 정보</div>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={styles.paper} elevation={3}>
                        <h3>내 계좌</h3>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={styles.paper} elevation={3}>
                        <h3>내 등급</h3>
                    </Paper>
                </Grid>


            </Grid>
        </div>
    )
};

export default Profile