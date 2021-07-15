import React from 'react';
import './App.css';
import Navbar from './Stork/component/Navbar';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./Stork/Pages/home/home";
import Stork from "./Stork/Pages/stork/stork";
import BitCoin from "./Stork/Pages/bitCoin/bitCoin";
import signUp from "./Stork/Pages/sign-In&Up/sign-up"
import signIn from "./Stork/Pages/sign-In&Up/sign-in"
import favorite from "./Stork/Pages/favorite/favorite"
import contact from "./Stork/Pages/contact-us/contact-us"
import profile from "./Stork/Pages/profile/profile"
function App() {
  return (
      <Router>
          <Navbar />
          <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/stork" component={Stork} />
              <Route path="/bitCoin" component={BitCoin} />
              <Route path="/signUp" component={signUp} />
              <Route path="/signIn" component={signIn} />
              <Route path="/favorite" component={favorite}/>
              <Route path="/contact-us" component={contact}/>
              <Route path="/profile/:userId" component={profile}/>
          </Switch>
      </Router>
  );
}

export default App;
