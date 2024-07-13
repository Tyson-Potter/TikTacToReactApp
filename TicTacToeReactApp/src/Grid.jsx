/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Cell from "./Cell";
import "./grid.css";
function Grid({ gameState, makeMove, setGameState, deleteGame }) {
  //Replace with for a call to the database
  function checkWinner(gameState) {
    if (gameState == null) {
      return null;
    }
    // Create a 2D array representation of the board
    const board = Array.from({ length: 3 }, () => Array(3).fill(null));
    gameState.forEach(({ owner, x, y }) => {
      if (owner == "neutral") {
      } else {
        board[x][y] = owner;
      }
    });

    const lines = [
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],

      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],

      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]],
    ];

    for (const line of lines) {
      if (line[0] && line[0] === line[1] && line[1] === line[2]) {
        return line[0]; // Return the winner ('X' or 'O')
      }
    }

    return null; // No winner found
  }
  useEffect(() => {
    console.log(localStorage.getItem("playerName"));

    const fetchGameState = async () => {
      let gameId = localStorage.getItem("currentGameId");
      console.log("game id   " + gameId);
      if (gameId != null) {
        const response = await fetch(
          `http://localhost:3001/getGameState?gameId=${gameId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        setGameState(await result.gameState);

        if (checkWinner(result.gameState) != null) {
          const winner = checkWinner(result.gameState);
          if (window.confirm("Winner is " + winner + ". Click OK To Exit")) {
            // User clicked "OK"
            localStorage.removeItem("currentGameId");
            localStorage.removeItem("playerName");
            setGameState(null);
            await deleteGame(gameId);
          }
          return;
        }
      } else {
        return;
      }
    };

    const intervalId = setInterval(fetchGameState, 3000);

    return () => clearInterval(intervalId);
  }, [gameState, setGameState]);

  async function handleMove(gameId, [x, y]) {
    for (let i = 0; i < gameState.length; i++) {
      if (gameState[i].x == x && gameState[i].y == y) {
        if (gameState[i].owner != "neutral") {
          console.log("Cell already taken");
          return;
        }
      }
    }
    let response = await makeMove(gameId, [x, y]);

    setGameState(await response.game.gameState);
  }

  if (gameState == null) {
    return;
  } else {
    return (
      <>
        <h1>You Are {localStorage.getItem("playerName")}</h1>
        <div className="grid-container">
          {gameState.map(({ x, y, owner }) => (
            <Cell
              handleMove={handleMove}
              key={`${x}-${y}`}
              x={x}
              y={y}
              owner={owner != "neutral" && owner}
            />
          ))}
        </div>
      </>
    );
  }
}

export default Grid;
