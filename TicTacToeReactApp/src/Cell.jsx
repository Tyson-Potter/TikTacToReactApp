/* eslint-disable react/prop-types */
function Cell({ x, y, owner, handleMove }) {
  return (
    <>
      <button
        onClick={() =>
          handleMove(localStorage.getItem("currentGameId"), [x, y])
        }
        className="grid-item"
        id={[x, y]}
      >
        {owner}
      </button>
    </>
  );
}

export default Cell;
