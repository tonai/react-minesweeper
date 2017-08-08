import React from 'react';
import PropTypes from 'prop-types';

import boomImage from '../../assets/images/boom.png';
import errorImage from '../../assets/images/error.png';
import flagImage from '../../assets/images/flag.png';
import mineImage from '../../assets/images/mine.png';
import './MinesweeperCell.css';

export const MINESWEEPER_STATE_ERROR = 'MINESWEEPER_STATE_ERROR';
export const MINESWEEPER_STATE_FLAGGED = 'MINESWEEPER_STATE_FLAGGED';
export const MINESWEEPER_STATE_HIDDEN = 'MINESWEEPER_STATE_HIDDEN';
export const MINESWEEPER_STATE_VISIBLE = 'MINESWEEPER_STATE_VISIBLE';

export const MINESWEEPER_VALUE_FAILED = 'MINESWEEPER_VALUE_FAILED';
export const MINESWEEPER_VALUE_MINE = 'MINESWEEPER_VALUE_MINE';

function MinesweeperCell({col, onFlagToggled, onReveal, onScout, row, state, value}) {
  let displayElement = null;
  const attributes = {
     className: 'MinesweeperCell'
  };

  switch(state) {
    case MINESWEEPER_STATE_FLAGGED:
      attributes.className += ' isHidden';
      attributes.onClick = reveal;
      attributes.onContextMenu = toggleFlag;
      displayElement = (<img alt="flag" src={flagImage} />);
      break;

    case MINESWEEPER_STATE_HIDDEN:
      attributes.className += ' isHidden';
      attributes.onClick = reveal;
      attributes.onContextMenu = toggleFlag;
      break;

    case MINESWEEPER_STATE_ERROR:
      displayElement = (<img alt="error" src={errorImage} />);
      break;

    default:
      switch(value) {
        case MINESWEEPER_VALUE_FAILED:
          displayElement = (<img alt="boom" src={boomImage} />);
          break;

        case MINESWEEPER_VALUE_MINE:
          displayElement = (<img alt="png" src={mineImage} />);
          break;

        default:
          displayElement = value !== 0 && value;
          attributes.onDoubleClick = scout;
      }
  }

  return (
    <div {...attributes} >
      {displayElement}
    </div>
  );

  function toggleFlag(event) {
    event.preventDefault();
    onFlagToggled(row, col);
  }

  function reveal(event) {
    event.preventDefault();
    onReveal(row, col);
  }

  function scout(event) {
    event.preventDefault();
    onScout(row, col);
  }
}

MinesweeperCell.propTypes = {
  col: PropTypes.number.isRequired,
  onFlagToggled: PropTypes.func.isRequired,
  onReveal: PropTypes.func.isRequired,
  onScout: PropTypes.func.isRequired,
  row: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
};

MinesweeperCell.defaultProps = {
  state: MINESWEEPER_STATE_HIDDEN
};

export default MinesweeperCell;
