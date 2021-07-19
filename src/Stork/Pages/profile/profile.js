import React from "react";
import Grid from '@material-ui/core/Grid';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Home from "../home/home";

const Profile = () => {

    const styles = theme => ({
        root: {
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
            <h1>My Info</h1>
            <Grid container spacing={3} style:{margin-top:40px}>
                <Grid item xs={5}>
                    <Paper className={styles.paper} elevation={3}>Content 2</Paper>
                </Grid>
                <Grid item xs={5}>
                    <Paper className={styles.paper} elevation={3}>Content 3</Paper>
                </Grid>

            </Grid>
        </div>
    )
};

export default Profile