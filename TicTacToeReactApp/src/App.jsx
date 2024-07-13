import { useState, useEffect } from "react";

import Lobby from "./Lobby"; // Ensure the correct import path
import Grid from "./Grid";

// localStorage.setItem('inGame', JSON.stringify(false));
// localStorage.setItem('gameId', JSON.stringify(null));
// localStorage.setItem('player', JSON.stringify(null));//x or o
// localStorage.setItem('playerName', JSON.stringify(null));
// const inGame = JSON.parse(localStorage.getItem('inGame'));

function App() {
  const [gameState, setGameState] = useState(null);
  const [playerName, setPlayerName] = useState(null);
  useEffect(() => {
    // This code runs once when the component mounts
  }, [gameState]);
  // use a context privder to keep track of in a game so you cna change it in the child class
  return (
    <>
      {gameState ? (
        <Grid
          playerName={(playerName, setPlayerName)}
          key="grid"
          gameState={gameState}
        />
      ) : (
        <Lobby
          key="lobby"
          setGameState={setGameState}
          gameState={gameState}
          createGame={createGame}
          joinGame={joinGame}
        />
      )}
    </>
  );
}

export default App;

// }
async function joinGame(gameId) {
  const response = await fetch(`http://localhost:3001/joinGame`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      gameId: gameId,
      playerName: "O",
    }),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to join game: ${errorMessage}`);
  }

  const result = await response.json();

  return result;
}

async function createGame() {
  const response = await fetch("http://localhost:3001/createGame", {
    method: "PUT",
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to create game: ${errorMessage}`);
  }

  const result = await response.json();

  return result;
}
