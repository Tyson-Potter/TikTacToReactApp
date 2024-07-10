import React, { useState, useEffect } from 'react';
import Lobby from './Lobby'; // Ensure the correct import path
import Grid from './Grid'
// Function to fetch data from the API

// Set the `inGame` variable to false
localStorage.setItem('inGame', JSON.stringify(false));
const inGame = JSON.parse(localStorage.getItem('inGame'));
function App() {
  return (
    <>
      
      {inGame ? <Grid/>:<Lobby/>} 
    
   
    </>
  );
}

export default App;
