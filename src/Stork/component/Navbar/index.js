import React from 'react'
import {Nav,NavLink,Bars,NavMenu,NavBtn,NavBtnLink} from "./NavbarElement";

const Navbar = () => {
    return (
        <>
           <Nav>
               <NavLink to="/">
                   <h1>Logo</h1>

               </NavLink>
               <Bars />
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



               <NavBtn>
                   <NavBtnLink to='/signin'>Sign In</NavBtnLink>
                   <span> </span>
                   <NavBtnLink to='/signin'>Sign In</NavBtnLink>
               </NavBtn>
           </Nav>
        </>
    );
};

export default Navbar;