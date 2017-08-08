import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classname';

import MinesweeperCell from '../MinesweeperCell/MinesweeperCell.jsx';
import './MinesweeperBoard.css';

export const STATUS_GAME_OVER = 'STATUS_GAME_OVER';
export const STATUS_RUNNING = 'STATUS_RUNNING';
export const STATUS_WIN = 'STATUS_WIN';

function MinesweeperBoard({board, onFlagToggled, onReveal, onScout, status}) {
  const classNames = {
    MinesweeperBoard: true,
    hasWon: status === STATUS_WIN,
    hasLost: status === STATUS_GAME_OVER
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
  status: STATUS_RUNNING
};

export default MinesweeperBoard;
