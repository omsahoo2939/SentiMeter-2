import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

import Characters from './components/Characters';
import Character from './components/Character';
import './App.css'; 

const Header = () => {
  return (
    <header className="header">
      <h1 className="title">Star Wars API</h1>
      <nav className="nav">
        <ul>
          <li><Link to="/">Characters</Link></li>
        </ul>
      </nav>
    </header>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<Characters />} />
          <Route path="/characters/:id" element={<Character />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
