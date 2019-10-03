import React from 'react';
import './App.css';
import NavBar from './components/nav-bar';
import SearchBar from './components/search';
import TournamentList from './page/Tournament/tournament-list';

function App() {
  return (
    <React.Fragment>
      <NavBar>
      </NavBar>
      <SearchBar />
    </React.Fragment>
  );
}

export default App;
