/* eslint-disable react/prop-types */
function Cell({ x, y, owner }) {
  return (
    <>
      <button className="grid-item" id={[x, y]}>
        {owner}
      </button>
    </>
  );
}

export default Cell;
