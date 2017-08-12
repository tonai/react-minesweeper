import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classname';

import {
  MINESWEEPER_STATUS_GAME_OVER,
  MINESWEEPER_STATUS_RUNNING,
  MINESWEEPER_STATUS_WIN
} from '../../settings/const';

import MinesweeperCell from '../MinesweeperCell/MinesweeperCell.jsx';
import './MinesweeperBoard.css';

function MinesweeperBoard({board, onFlagToggled, onReveal, onScout, status}) {
  const classNames = {
    MinesweeperBoard: true,
    hasWon: status === MINESWEEPER_STATUS_WIN,
    hasLost: status === MINESWEEPER_STATUS_GAME_OVER
  };

  return (
    <div className={classname(classNames)}>
      {board.map((row, rowIndex) => (
        <div className="MinesweeperBoard__row" key={rowIndex} >
          {row.map((cell, colIndex) => (
            <div className="MinesweeperBoard__cell" key={colIndex} >
              <MinesweeperCell
                col={colIndex}
                onFlagToggled={onFlagToggled}
                onReveal={onReveal}
                onScout={onScout}
                row={rowIndex}
                state={cell.state}
                value={cell.value}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

MinesweeperBoard.propTypes = {
  board: PropTypes.arrayOf(PropTypes.array),
  onFlagToggled: PropTypes.func.isRequired,
  onReveal: PropTypes.func.isRequired,
  onScout: PropTypes.func.isRequired,
  status: PropTypes.string
};

MinesweeperBoard.defaultProps = {
  status: MINESWEEPER_STATUS_RUNNING
};

export default MinesweeperBoard;
