import React from 'react';
import PropTypes from 'prop-types';

import './MinesweeperCell.css';

export const MINESWEEPER_STATE_ERROR = 'MINESWEEPER_STATE_ERROR';
export const MINESWEEPER_STATE_FLAGGED = 'MINESWEEPER_STATE_FLAGGED';
export const MINESWEEPER_STATE_HIDDEN = 'MINESWEEPER_STATE_HIDDEN';
export const MINESWEEPER_STATE_VISIBLE = 'MINESWEEPER_STATE_VISIBLE';

export const MINESWEEPER_VALUE_FAILED = 'MINESWEEPER_VALUE_FAILED';
export const MINESWEEPER_VALUE_MINE = 'MINESWEEPER_VALUE_MINE';

class MinesweeperCell extends React.PureComponent {
  toggleFlag = (event) => {
    event.preventDefault();
    this.props.onFlagToggled(this.props.row, this.props.col);
  };

  reveal = (event) => {
    event.preventDefault();
    this.props.onReveal(this.props.row, this.props.col);
  };

  render() {
    let displayElement = null;
    const attributes = {
       className: 'MinesweeperCell'
    };

    switch(this.props.state) {
      case MINESWEEPER_STATE_FLAGGED:
        attributes.className += ' isHidden';
        attributes.onClick = this.reveal;
        attributes.onContextMenu = this.toggleFlag;
        displayElement = (<img alt="flag" src="assets/images/flag.png" />);
        break;

      case MINESWEEPER_STATE_HIDDEN:
        attributes.className += ' isHidden';
        attributes.onClick = this.reveal;
        attributes.onContextMenu = this.toggleFlag;
        break;

      case MINESWEEPER_STATE_ERROR:
        displayElement = (<img alt="error" src="assets/images/error.png" />);
        break;

      default:
        switch(this.props.value) {
          case MINESWEEPER_VALUE_FAILED:
            displayElement = (<img alt="boom" src="assets/images/boom.png" />);
            break;

          case MINESWEEPER_VALUE_MINE:
            displayElement = (<img alt="png" src="assets/images/mine.png" />);
            break;

          default:
            displayElement = this.props.value !== 0 && this.props.value;
        }
    }

    return (
      <div {...attributes} >
        {displayElement}
      </div>
    );
  }
}

MinesweeperCell.propTypes = {
  col: PropTypes.number.isRequired,
  onFlagToggled: PropTypes.func.isRequired,
  onReveal: PropTypes.func.isRequired,
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
