import React from 'react';
import Navbar from "./Stork/component/Navbar";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
      // exact의 의미는 정확히 이 path에서만 해당 라우팅을 이뤄지도록 하라는 명령
      <>
          <Router>
            <Navbar />
            <Switch>
                <Route path='/' />
            </Switch>
          </Router>
      </>

  );
}

export default App;
