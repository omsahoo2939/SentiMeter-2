import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Characters from './components/Characters';
import Character from './components/Character';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Characters />} />
          <Route path="/characters/:id" element={<Character />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
