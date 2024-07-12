import React, { useState, useEffect } from 'react';



function Lobby({handleCreateGame, setinGameState, createGame, setGameState,gameState}) {
  async function handleCreateGame(setGameState){
    let game =  await createGame();
   
    setGameState(game.newGame.gameState);
    setinGameState(true);
   }
  return (
    <>
<button key="button" onClick={() => handleCreateGame(setGameState,gameState)} id="createGame">Create Game</button>
      Create Game
   
      <div id="games">Games place holder</div>
   
     
    </>
  );
}

export default Lobby;