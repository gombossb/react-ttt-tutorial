const Square = (props) => {
  let bgColor = '#eee';
  if (props.winnerInfo.winner && props.winnerInfo.winner === props.value)
    bgColor = '#0f0';
  else if (props.winnerInfo.winner && props.value)
    bgColor = '#f00';
  else if (props.winnerInfo.draw)
    bgColor = '#00f';

  return (
    <button
      className="square"
      onClick={() => props.onClick()}
      style={{backgroundColor: bgColor}}
    >
      {props.value}
    </button>
  );
};
export default Square;
