import React from 'react';
import './App.css';
import Navbar from './Stork/component/Navbar';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./Stork/Pages/home/home";
import Stork from "./Stork/Pages/stork/stork";
import BitCoin from "./Stork/Pages/bitCoin/bitCoin";
import signUp from "./Stork/Pages/sign-In&Up/sign-up"
function App() {
  return (
      <Router>
          <Navbar />
          <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/stork" component={Stork} />
              <Route path="/bitCoin" component={BitCoin} />
              <Route path="/signUp" component={signUp} />
          </Switch>
      </Router>
  );
}

export default App;
