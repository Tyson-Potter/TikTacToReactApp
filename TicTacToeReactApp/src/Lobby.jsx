/* eslint-disable react/prop-types */
import GamesComponent from "./GamesComponent";

function Lobby({ createGame, setGameState, gameState }) {
  async function handleCreateGame(setGameState) {
    let game = await createGame();
    localStorage.setItem("playerName", game.newGame.currentPlayerTurn);
    localStorage.setItem("currentGameId", game.newGame.id);

    setGameState(game.newGame.gameState);
  }
  async function handleJoinGame(gameId) {
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

    //add logic to handle changing the ui and saving the game id and player name to local storage

    const responseText = await response.json();
    if (responseText) {
      // return result;
    } else {
      console.log("No response text");
    }

    localStorage.setItem("playerName", "O");
    localStorage.setItem("currentGameId", gameId);

    setGameState(responseText.gameState);
  }
  return (
    <>
      <button
        key="button"
        onClick={() => handleCreateGame(setGameState, gameState)}
        id="createGame"
      >
        Create Game
      </button>
      Create Game
      <GamesComponent handleJoinGame={handleJoinGame} />
    </>
  );
}

export default Lobby;
