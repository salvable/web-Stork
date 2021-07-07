import React, {useEffect, useState} from 'react'
import {Nav,NavLink,NavMenu,NavBtnLink} from "./NavbarElement";
import { TextField, InputAdornment } from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";


const Navbar = () => {
    const [isLogin,setIsLogin] = useState(false)

    useEffect(()=>{
        async function checkAuth(token){
            if(token != null){
                const response = await axios.get("http://localhost:3000/checkAuth",{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            }
        }

        const Token = localStorage.getItem("accessToken")
        checkAuth(Token)
    },[])

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
               <NavLink to='/signUp'>Sign Up</NavLink>
               <NavLink to='/signIn'>Sign In</NavLink>
               </NavMenu>
               </Nav>
        </>
    );
};

export default Navbar;