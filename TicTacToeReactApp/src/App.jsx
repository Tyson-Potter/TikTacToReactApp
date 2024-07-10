import React, { useState, useEffect } from 'react';
import Lobby from './Lobby'; // Ensure the correct import path
import Grid from './Grid'


localStorage.setItem('inGame', JSON.stringify(false));
localStorage.setItem('gameId', JSON.stringify(null));
localStorage.setItem('player', JSON.stringify(null));//x or o
localStorage.setItem('playerName', JSON.stringify(null));
const inGame = JSON.parse(localStorage.getItem('inGame'));

function App() {
  return (
    <>
      
      {inGame ? <Grid/>:<Lobby/>} 
    
   
    </>
  );
}

export default App;
