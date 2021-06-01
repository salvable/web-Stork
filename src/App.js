import React from 'react';
import './App.css';
import Navbar from './Stork/component/Navbar';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./Stork/Pages/Home";
import About from "./Stork/Pages/about";

function App() {
  return (
      <Router>
          <Navbar />
          <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
          </Switch>
      </Router>
  );
}

export default App;
