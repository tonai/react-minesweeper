import React from 'react';
import PropTypes from 'prop-types';
import seedrandom from 'seedrandom';

import {
  MINESWEEPER_STATE_BLOCKED,
  MINESWEEPER_STATE_ERROR,
  MINESWEEPER_STATE_FAILED,
  MINESWEEPER_STATE_FLAGGED,
  MINESWEEPER_STATE_HIDDEN,
  MINESWEEPER_STATE_VISIBLE,
  MINESWEEPER_STATUS_GAME_OVER,
  MINESWEEPER_STATUS_RUNNING,
  MINESWEEPER_STATUS_WIN,
  MINESWEEPER_VALUE_MINE
} from '../../settings/const';

import MinesweeperBoard from '../MinesweeperBoard/MinesweeperBoard.jsx';
import './MinesweeperGame.css';

class MinesweeperGame extends React.PureComponent {
  handleFlagToggled = (row, col) => {
    this.setState(prevState => {
      if (prevState.status !== MINESWEEPER_STATUS_RUNNING) {
        return;
      }

      let board = this.cloneBoard(prevState.board);
      switch (board[row][col].state) {
        case MINESWEEPER_STATE_HIDDEN:
          board[row][col].state = MINESWEEPER_STATE_FLAGGED;
          break;

        case MINESWEEPER_STATE_FLAGGED:
          board[row][col].state = MINESWEEPER_STATE_BLOCKED;
          break;

        case MINESWEEPER_STATE_BLOCKED:
          board[row][col].state = MINESWEEPER_STATE_HIDDEN;
          break;

        default:
      }

      const status = this.checkWin(board, prevState.mines.length);
      return {board, status};
    });
  };

  handleReveal = (row, col) => {
    this.setState(prevState => {
      let status;
      if (prevState.status !== MINESWEEPER_STATUS_RUNNING) {
        return;
      }

      let board = this.cloneBoard(prevState.board);
      switch (board[row][col].value) {
        case MINESWEEPER_VALUE_MINE:
          board[row][col].state = MINESWEEPER_STATE_FAILED;
          status = MINESWEEPER_STATUS_GAME_OVER;
          board = this.showBoard(board);
          break;

        case 0:
          this.discover(row, col, board);
          break;

        default:
          board[row][col].state = MINESWEEPER_STATE_VISIBLE;
      }

      if (!status) {
        status = this.checkWin(board, prevState.mines.length);
      }

      return {board, status};
    });
  }

  handleScout = (row, col) => {
    const cells = [
      {row: row - 1, col: col - 1},
      {row: row - 1, col: col},
      {row: row - 1, col: col + 1},
      {row: row, col: col - 1},
      {row: row, col: col},
      {row: row, col: col + 1},
      {row: row + 1, col: col - 1},
      {row: row + 1, col: col},
      {row: row + 1, col: col + 1}
    ];
    const totalFlag = cells
      .reduce((acc, cell) =>
        acc + (this.state.board[cell.row] !== undefined
        && this.state.board[cell.row][cell.col] !== undefined
        && this.state.board[cell.row][cell.col].state === MINESWEEPER_STATE_FLAGGED)
      , 0);

    if (totalFlag === this.state.board[row][col].value) {
      cells.forEach(cell => {
        if (this.state.board[cell.row]
          && this.state.board[cell.row][cell.col]
          && this.state.board[cell.row][cell.col].state === MINESWEEPER_STATE_HIDDEN) {
          this.handleReveal(cell.row, cell.col);
        }
      });
    }
  };

  calculateCells(func) {
    return this.state.board
      .reduce(
        (acc, row) => acc + row.reduce(
          (acc, cell) => acc + func(cell), 0
        ), 0
      );
  }

  checkWin(board, totalMines) {
    const totalFlagOrVisible = this.calculateCells(cell =>
      cell.state === MINESWEEPER_STATE_FLAGGED || cell.state === MINESWEEPER_STATE_VISIBLE);

    if (totalFlagOrVisible === this.props.rows * this.props.cols) {
      return MINESWEEPER_STATUS_WIN;
    }
    return MINESWEEPER_STATUS_RUNNING;
  }

  cloneBoard(board) {
    return board.map(row => [...row]);
  }

  componentWillMount() {
    const mines = this.generateMines();
    const board = this.generateBoard(mines);
    this.setState({
      board,
      mines,
      status: MINESWEEPER_STATUS_RUNNING
    });
  }

  discover(row, col, board) {
    if (board[row] && board[row][col] && board[row][col].state === MINESWEEPER_STATE_HIDDEN) {
      board[row][col].state = MINESWEEPER_STATE_VISIBLE;
      if (board[row][col].value === 0) {
        this.discover(row - 1, col - 1, board);
        this.discover(row - 1, col, board);
        this.discover(row - 1, col + 1, board);
        this.discover(row + 1, col - 1, board);
        this.discover(row + 1, col, board);
        this.discover(row + 1, col + 1, board);
        this.discover(row, col - 1, board);
        this.discover(row, col + 1, board);
      }
    }
  }

  generateBoard(mines) {
    const board = [];

    for (let i = 0; i < this.props.rows; i++) {
      board.push([]);
      for (let j = 0; j < this.props.cols; j++) {
        if (mines.indexOf(i * this.props.rows + j) !== -1) {
          board[i].push({
            state: MINESWEEPER_STATE_HIDDEN,
            value: MINESWEEPER_VALUE_MINE
          });
        } else {
          board[i].push({
            state: MINESWEEPER_STATE_HIDDEN,
            value: 0
          });
        }
      }
    }

    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.cols; j++) {
        if (board[i][j].value !== MINESWEEPER_VALUE_MINE) {
          board[i][j].value = this.getBoardNumber(board, i, j);
        }
      }
    }

    return board;
  }

  generateMines() {
    const mines = [];
    const rng = seedrandom(this.props.seed ? this.props.seed : null);
    while (mines.length < this.props.mines) {
      const position = this.getRandomPosition(rng);
      if (mines.indexOf(position) === -1) {
        mines.push(position);
      }
    }
    return mines;
  }

  getBoardNumber(board, row, col) {
    return this.getBoardNumberForLine(board, row - 1, col)
         + this.getBoardNumberForLine(board, row, col)
         + this.getBoardNumberForLine(board, row + 1, col);
  }

  getBoardNumberForLine(board, row, col) {
    if (!board[row]) {
      return 0;
    }
    return (board[row][col - 1] !== undefined && board[row][col - 1].value === MINESWEEPER_VALUE_MINE)
         + (board[row][col] !== undefined && board[row][col].value === MINESWEEPER_VALUE_MINE)
         + (board[row][col + 1] !== undefined && board[row][col + 1].value === MINESWEEPER_VALUE_MINE);
  }

  getRandomPosition(rng) {
    return parseInt(rng() * this.props.cols * this.props.rows, 10);
  }

  render() {
    const minesLeft = this.props.mines - this.calculateCells(cell =>
      cell.state === MINESWEEPER_STATE_FLAGGED);

    return (
      <div className="MinesweeperGame">
        <div className="MinesweeperGame__header">
          {minesLeft} Mines left
        </div>
        <MinesweeperBoard
          board={this.state.board}
          onFlagToggled={this.handleFlagToggled}
          onReveal={this.handleReveal}
          onScout={this.handleScout}
          status={this.state.status}
        />
      </div>
    );
  }

  showBoard(board) {
    return board
      .map(row => row.map(cell => {
        if (cell.state === MINESWEEPER_STATE_FLAGGED && cell.value !== MINESWEEPER_VALUE_MINE) {
          cell.state = MINESWEEPER_STATE_ERROR;
        } else if (cell.state === MINESWEEPER_STATE_HIDDEN && cell.value === MINESWEEPER_VALUE_MINE) {
          cell.state = MINESWEEPER_STATE_VISIBLE;
        }
        return cell;
      }));
  }
}

MinesweeperGame.propTypes = {
  cols: PropTypes.number.isRequired,
  mines: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  seed: PropTypes.string
};

MinesweeperGame.defaultProps = {};

export default MinesweeperGame;
