import React from "react";
import Square from "./Square";

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        winnerInfo={this.props.winnerInfo}
        key={i}
      />
    );
  }
  render() {
    const squares = [...Array(9).keys()].map(i => this.renderSquare(i));
    const rows = [...Array(3).keys()].map(i => 
      <div className="board-row" key={i}>{squares.slice(i*3, i*3+3)}</div>
    );
    return (
      <div>
        {rows}
      </div>
    );
  }
}
export default Board;
