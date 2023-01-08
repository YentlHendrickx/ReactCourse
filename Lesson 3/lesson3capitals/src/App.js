﻿import { Routes, Route, BrowserRouter } from 'react-router-dom';

import './style.css'
import MainMenu from './components/main_menu';
import Game from './components/game';
import HighScores from './components/highscores';
import Info from './components/info';

function Main() {
  return (
    <div className="content">
        <Routes>
            <Route path={'/'} element={<MainMenu />}/>
            <Route path={'/game'} element={<Game />}/>
            <Route path={'/highscores'} element={<HighScores />}/>
            <Route path={'/info'} element={<Info />}/>
        </Routes>
    </div>
  );
}

function App() {
    return (
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    );
};

export default App;