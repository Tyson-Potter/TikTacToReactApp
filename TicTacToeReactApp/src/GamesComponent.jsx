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
    // Function to fetch games and update state
    const fetchGames = async () => {
      try {
        const gamesData = await getGames();
        setGames(gamesData);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch games immediately when the component mounts
    fetchGames();

    // Set up an interval to fetch games every 5 seconds
    const intervalId = setInterval(fetchGames, 5000);

    // Clean up the interval when the component unmounts
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
