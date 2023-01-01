import React from "react";
import Board from "./Board";
import { calculateWinner, isDraw } from "./TTTFunctions";

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      changedCells: [],
      stepNumber: 0,
      xIsNext: true,
      stepOrderAsc: true
    }
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || isDraw(squares) || squares[i])
      return;
    
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      changedCells: this.state.changedCells.slice(0, this.state.stepNumber + 1).concat(i),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }
  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }
  changeStepOrder(){
    this.setState(state => ({
      stepOrderAsc: !state.stepOrderAsc
    }))
  }
  rowColFromIdx(i){
    return {
      row: Math.floor(i/3),
      col: i%3
    };
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const draw = isDraw(current.squares);

    let moves = history.map((step, move/*Idx*/) => {
      const desc = move ? `Go to move ${move}` : 'Go to game start';
      return (
        <li
          key={move}
          style={{fontWeight: (move === this.state.stepNumber/*-1*/) ? 'bold' : 'normal'}}
        >
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
          <span>
            row: <strong>{
              move !== this.state.stepNumber
              ? this.rowColFromIdx(this.state.changedCells[move])['row']+1
              : ''
            }</strong> col: <strong>{
              move !== this.state.stepNumber
              ? this.rowColFromIdx(this.state.changedCells[move])['col']+1
              : ''
            }
            </strong>
          </span>
        </li>
      )
    });
    //const displayedMoves = this.state.stepOrderAsc ? moves : moves.slice().reverse();
    if (!this.state.stepOrderAsc)
      moves = moves.slice().reverse();

    let status;
    if (winner)
      status = `Winner: ${winner}`;
    else if (draw)
      status = 'Draw';
    else
      status = `Next player: ${(this.state.xIsNext ? 'X' : 'O')}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winnerInfo={{winner: winner, draw: draw}}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.changeStepOrder()}>Change step order</button>
          <ol reversed={!this.state.stepOrderAsc}>{moves}</ol>
        </div>
      </div>
    );
  }
}
export default Game;
