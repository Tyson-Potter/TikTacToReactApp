/* eslint-disable react/prop-types */
import GamesComponent from "./GamesComponent";

function Lobby({ createGame, setGameState, gameState, joinGame }) {
  async function handleCreateGame(setGameState) {
    let game = await createGame();

    localStorage.setItem("playerName", "X");
    localStorage.setItem("currentGameId", game.newGame.id);

    setGameState(game.newGame.gameState);
  }
  async function handleJoinGame(gameId) {
    let response = await joinGame(gameId);
    localStorage.setItem("playerName", "O");
    localStorage.setItem("currentGameId", response.game.id);

    setGameState(response.game.gameState);
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
