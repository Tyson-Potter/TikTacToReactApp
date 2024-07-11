import Cell from "./Cell";
import './grid.css';
function Grid({gameState}) {
    //Replace with for a call to the database
   
     
      if(gameState==null){return;}else{
        return (
          <>
          <h1>hi</h1>
          <div className="grid-container">
            {gameState.map(({ x, y, owner }) => (
              <Cell key={`${x}-${y}`} x={x} y={y} owner= {owner!="neutral"&& owner} />
            ))}
            </div>
          </>
        );

      }
   
          }
  
  export default Grid;