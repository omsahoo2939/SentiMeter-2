import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Home from './components/Home';
import Characters from './components/Characters';
import Character from './components/Character';
import Planets from './components/Planets';
import Planet from './components/Planet';
import Films from './components/Films';
import Film from './components/Film';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<Character />} />
          <Route path="/planets" element={<Planets />} />
          <Route path="/planets/:id" element={<Planet />} />
          <Route path="/films" element={<Films />} />
          <Route path="/films/:id" element={<Film />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
