import React, {useEffect, useState} from 'react'
import {Nav, NavLink, NavMenu, NavBtnLink, NavBtn} from "./NavbarElement";
import { TextField, InputAdornment } from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import Button from "@material-ui/core/Button";


const Navbar = () => {
    const [isLogin,setIsLogin] = useState(false)
    const [userId, setUserId] = useState("")

    useEffect(()=>{
        async function CheckAuth(token){
            if(token != null){
                const response = await axios.get("http://localhost:3000/checkAuth",{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }})

                if(response.status == 200){
                    setIsLogin(true)

                    const user = await axios.get(`http://localhost:3000/getUser/${response.data.userId}`)
                    setUserId(user.data.user.userId)

                }
            }
        }

        const Token = localStorage.getItem("accessToken")
        CheckAuth(Token)
    },[isLogin])

    const LogOut = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        alert("로그아웃이 완료되었습니다.")
        window.location.replace('/')
    }

    return (
        <>
           <Nav>
               <NavLink to="/">
                   <h1>Logo</h1>
               </NavLink>
               <NavMenu>
                   <NavLink to="/stork" activeStyle>
                       Stork
                   </NavLink>
                   <NavLink to="/bitCoin" activeStyle>
                       BitCoin
                   </NavLink>
                   <NavLink to="/favorite" activeStyle>
                       Favorite
                   </NavLink>
                   <NavLink to="/contact-us" activeStyle>
                       Contact-us
                   </NavLink>
               </NavMenu>
               <TextField
                   variant="outlined"
                   label="Search"
                   InputProps={{
                       endAdornment: (
                           <InputAdornment position="end">
                               <SearchIcon />
                           </InputAdornment>
                       ),
                       style:{
                           backgroundColor: "white",
                           color: "black",
                           width: "100%"

                       }
                   }}
               />

               <NavMenu>
                   <React.Fragment>
                       {isLogin ? (<Button variant="contained" color="primary">My Info</Button>) : (<NavLink to='/signIn'>Sign In</NavLink>)}
                   </React.Fragment>
                   <React.Fragment>
                       {isLogin ? (<Button variant="contained" color="primary" onClick={() => {LogOut()}}>LogOut</Button>) : (<NavLink to='/signUp'>Sign Up</NavLink>)}
                   </React.Fragment>
               </NavMenu>
               </Nav>
        </>
    );
};

export default Navbar;