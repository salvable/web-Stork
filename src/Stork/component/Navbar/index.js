import React from 'react'
import {Nav,NavLink,NavMenu,NavBtnLink} from "./NavbarElement";
import { TextField, InputAdornment } from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search";


const Navbar = () => {
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
                   <NavLink to="/contact-us" activeStyle>
                       Contact Us
                   </NavLink>
                   <NavLink to="/sign-up" activeStyle>
                       Sign Up
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
               <NavBtnLink to='/signUp'>Sign Up</NavBtnLink>
               <NavBtnLink to='/signIn'>Sign In</NavBtnLink>
               </NavMenu>
               </Nav>
        </>
    );
};

export default Navbar;