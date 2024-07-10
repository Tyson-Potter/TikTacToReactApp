import React, { useState, useEffect } from 'react';

async function fetchData() {
  try {
    const response = await fetch('http://localhost:3001/data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // Return an empty array in case of error
  }
}

function Lobby() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function getGames() {
      const gamesData = await fetchData();
      setGames(gamesData);
    }

    getGames();
  }, []); // Empty dependency array means this useEffect runs once on mount

  return (
    <>
      <button id="createGame">Create Game</button>
      <div id="games">Games place holder</div>
      <ul>
        {games.map((game, index) => (
          <button  key={index}>{game.gameId}</button>
        ))}
      </ul>
    </>
  );
}

export default Lobby;