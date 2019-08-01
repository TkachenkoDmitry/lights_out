import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  };
  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
    // this.flipCellsAround = this.flipCellsAround.bind(this);
    // TODO: set initial state
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    return Array.from({ length: this.props.nrows }).map(() =>
      Array.from({ length: this.props.ncols }).map(
        () => Math.random() < this.props.chanceLightStartsOn
      )
    );
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround = coord => {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [x, y] = coord.split("-").map(Number);

    function flipCell(x, y) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[x][y] = !board[x][y];
      }
    }
    flipCell(x, y);
    // TODO: flip this cell and the cells around it
    flipCell(x - 1, y);
    flipCell(x + 1, y);
    flipCell(x, y + 1);
    flipCell(x, y - 1);

    // win when every cell is turned off
    // TODO: determine is the game has been won
    const hasWon = board.every(row => row.every(col => col === false));
    this.setState({ board, hasWon });
  };

  /** Render game board or winning message. */

  render() {
    const tblBoard = this.state.board.map((row, rI) => (
      <tr key={rI}>
        {row.map((col, cI) => (
          <Cell
            key={`${rI}-${cI}`}
            isLit={col}
            flipCellsAroundMe={() => this.flipCellsAround(`${rI}-${cI}`)}
          />
        ))}
      </tr>
    ));

    return (
      <div>
        {this.state.hasWon ? (
          <div className="Board-title">
            <div className="winner">
              <div className="neon-orange">YOU</div>
              <div className="neon-blue">WIN!</div>
            </div>
          </div>
        ) : (
          <>
            <div className="Board-title">
              <div className="neon-orange">Lights</div>
              <div className="neon-blue">Out</div>
            </div>
            <table className="Board">
              <tbody>{tblBoard}</tbody>
            </table>
          </>
        )}
      </div>
    );

    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
  }
}

export default Board;
