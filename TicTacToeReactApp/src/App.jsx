import React, { useState, useEffect } from 'react';
import Lobby from './Lobby'; // Ensure the correct import path
import Grid from './Grid'


// localStorage.setItem('inGame', JSON.stringify(false));
// localStorage.setItem('gameId', JSON.stringify(null));
// localStorage.setItem('player', JSON.stringify(null));//x or o
// localStorage.setItem('playerName', JSON.stringify(null));
// const inGame = JSON.parse(localStorage.getItem('inGame'));


function App() {
  const [gameState, setGameState] = useState(null);
  const [inGame, setinGameState] = useState(false);

 
  
  return (
    <>
      
      {inGame ? <Grid key="grid" gameState={gameState}/>:<Lobby key="lobby"  setinGameState={setinGameState} setGameState={setGameState}  gameState={gameState}createGame={createGame}/>} 
    
   
    </>
  );
}

export default App;


async function createGame() {
  const response = await fetch('http://localhost:3001/createGame', {
    method: 'PUT'
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to create game: ${errorMessage}`);
  }

  const result = await response.json();
 
  return result;
}



