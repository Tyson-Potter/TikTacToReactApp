import Cell from "./Cell";
import './grid.css';
function Grid() {
    //Replace with for a call to the database
    const gameState = [
        { x: 0, y: 0, owner: 'X' },
        { x: 1, y: 0, owner: 'neutral' },
        { x: 2, y: 0, owner: 'neutral' },
        { x: 0, y: 1, owner: 'neutral' },
        { x: 1, y: 1, owner: 'neutral' },
        { x: 2, y: 1, owner: 'O' },
        { x: 0, y: 2, owner: 'neutral' },
        { x: 1, y: 2, owner: 'neutral' },
        { x: 2, y: 2, owner: 'neutral' }
      ];
      
      
      return (
        <>
        <div class="grid-container">
          {gameState.map(({ x, y, owner }) => (
            <Cell key={`${x}-${y}`} x={x} y={y} owner= {owner!="neutral"&& owner} />
          ))}
          </div>
        </>
      );
          }
  
  export default Grid;