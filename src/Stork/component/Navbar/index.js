import React, {useEffect, useState} from 'react'
import {Nav, NavLink, NavMenu, NavBtnLink, NavBtn} from "./NavbarElement";
import { TextField, InputAdornment } from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router";


const Navbar = () => {
    const history = useHistory()
    const [isLogin,setIsLogin] = useState(false)
    const [userId, setUserId] = useState("")

    const getUserId = async(userId,token) => {
        const user = await axios.get(`http://localhost:3000/getUser/${userId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }})

        // userId를 리턴
        return user.data.user.userId
    }

    const LogOut = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        alert("로그아웃이 완료되었습니다.")
        window.location.replace('/')
    }

    useEffect(()=>{
        async function CheckAuth(token){
            if(token){
                try{
                    const response = await axios.get("http://localhost:3000/checkAuth",{
                        headers: {
                            Authorization: `Bearer ${token}`
                        }})

                    // token이 인증에 성공했을 경우 리프레시
                    const refreshToken = localStorage.getItem("refreshToken")
                    const refresh = await axios.get("http://localhost:3000/refreshToken",{
                        headers: {
                            Authorization: `Bearer ${refreshToken}`
                        }})
                    window.localStorage.setItem("accessToken", refresh.data.token)
                    window.localStorage.setItem("refreshToken", refresh.data.refreshToken)

                    setIsLogin(true)
                    const userId = await getUserId(response.data.userId,token)
                    window.localStorage.setItem("userId", userId)
                    setUserId(userId)
                }catch(e){
                    const refreshToken = localStorage.getItem("refreshToken")
                    const refresh = await axios.get("http://localhost:3000/refreshToken",{
                        headers: {
                            Authorization: `Bearer ${refreshToken}`
                        }})

                    window.localStorage.setItem("accessToken", refresh.data.token)
                    window.localStorage.setItem("refreshToken", refresh.data.refreshToken)
                    const userId = await getUserId(refresh.data.userId,token)
                    window.localStorage.setItem("userId", userId)
                    setUserId(userId)
                    window.location.reload()
                }
            }
        }

        const token = localStorage.getItem("accessToken")
        CheckAuth(token)
    },[isLogin])

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
                   placeholder="Search"
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
                       {isLogin ? (<Button variant="contained" color="primary" onClick={() => {history.push(`/profile/${userId}`)}}>My Info</Button>) : (<NavLink to='/signIn'>Sign In</NavLink>)}
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