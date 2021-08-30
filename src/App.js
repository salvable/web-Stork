import React from 'react';
import './App.css';
import Navbar from './Stork/component/Navbar';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./Stork/Pages/home/home";
import Stork from "./Stork/Pages/stork/stork";
import BitCoin from "./Stork/Pages/bitCoin/bitCoin";
import SignUp from "./Stork/Pages/sign-In&Up/sign-up"
import SignIn from "./Stork/Pages/sign-In&Up/sign-in"
import Favorite from "./Stork/Pages/favorite/favorite"
import Contact from "./Stork/Pages/contact-us/contact-us"
import Profile from "./Stork/Pages/profile/profile"
import CheckInfo from "./Stork/Pages/profile/checkInfo";
import ModifyInfo from "./Stork/Pages/profile/modifyInfo";
import BoardWrite from "./Stork/Pages/contact-us/board/board_write"
import Board from "./Stork/Pages/contact-us/board/board";
import BoardUpdate from "./Stork/Pages/contact-us/board/board_update";

function App() {
  return (
      <Router>
          <Navbar />
          <Switch>
              <Route path="/" exact component={Home} />
              <Route exact path="/stork" component={Stork} />
              <Route path="/stork/:storkId" component={Stork} />
              <Route exact path="/bitCoin" component={BitCoin} />
              <Route path="/bitCoin/:bitCoinId" component={BitCoin} />
              <Route path="/signUp" component={SignUp} />
              <Route path="/signIn" component={SignIn} />
              <Route exact path="/favorite" component={Favorite}/>
              <Route path="/favorite/:favoriteId" component={Favorite}/>
              <Route path="/contact-us" component={Contact}/>
              <Route path="/profile/:userId" component={Profile}/>
              <Route path="/checkInfo/:userId" component={CheckInfo}/>
              <Route path="/modify/:userId" component={ModifyInfo}/>
              <Route path="/board/write" component={BoardWrite}/>
              <Route path="/board/:boardId" component={Board}/>
              <Route path="/boardUpdate/:boardId" component={BoardUpdate}/>
          </Switch>
      </Router>
  );
}

export default App;
