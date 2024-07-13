/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./GamesComponent.css";
async function getGames() {
  const response = await fetch("http://localhost:3001/games", {
    method: "GET",
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to fetch games: ${errorMessage}`);
  }

  const result = await response.json();
  return result;
}

function GamesComponent({ handleJoinGame }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesData = await getGames();
        setGames(gamesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGames();

    const intervalId = setInterval(fetchGames, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Games</h1>
      <ul>
        {games.length > 0 ? (
          games.map((game) => (
            <div className="GameCard" key={game.id}>
              {game.id}
              <button onClick={() => handleJoinGame(game.id)} id={game.id}>
                Join Game
              </button>
            </div>
          ))
        ) : (
          <p>No games available</p>
        )}
      </ul>
    </div>
  );
}

export default GamesComponent;
