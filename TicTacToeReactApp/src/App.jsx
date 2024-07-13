import { useState } from "react";

import Lobby from "./Lobby"; // Ensure the correct import path
import Grid from "./Grid";

function App() {
  const [gameState, setGameState] = useState(null);
  const [playerName, setPlayerName] = useState(null);

  return (
    <>
      {gameState ? (
        <Grid
          makeMove={makeMove}
          playerName={(playerName, setPlayerName)}
          key="grid"
          deleteGame={deleteGame}
          gameState={gameState}
          setGameState={setGameState}
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
async function makeMove(gameId, [x, y]) {
  const response = await fetch(`http://localhost:3001/makeMove`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      gameId: gameId,
      playerName: localStorage.getItem("playerName"),
      x: x,
      y: y,
    }),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to join game: ${errorMessage}`);
  }

  const result = await response.json();

  return result;
}
async function deleteGame(gameId) {
  // eslint-disable-next-line no-unused-vars
  const response = await fetch(`http://localhost:3001/deleteGame`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      gameId: gameId,
    }),
  });
}
