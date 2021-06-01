import React from 'react';
import About from './Stork/test/About';
import Home from './Stork/test/Home';
import { Route } from 'react-router-dom';

function App() {
  return (
      // exact의 의미는 정확히 이 path에서만 해당 라우팅을 이뤄지도록 하라는 명령
      <div>
        <Route path="/" component={Home} exact/>
        <Route path="/about" component={About} />
      </div>
  );
}

export default App;
