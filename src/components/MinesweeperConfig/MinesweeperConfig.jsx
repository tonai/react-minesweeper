import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import './MinesweeperConfig.css';

class MinesweeperConfig extends React.PureComponent {
  handleBlur = () => {
    const state = this.formatValues(this.state);
    this.setState(state);
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value});
  };

  handleClick = (event) => {
    event.preventDefault();
    this.props.play(this.state);
  };

  constructor(props) {
    super(props);
    this.state = {
      cols: 10,
      rows: 10,
      mines: 10,
      seed: 'Minesweeper'
    };
  }

  format(name, value) {
    switch(name) {
      case 'cols':
      case 'rows':
        if (value < 10) {
          return 10;
        } else if (value > 50) {
          return 50;
        }
        return Number(value);

      case 'mines':
        if (value < 10) {
          return 10;
        } else if (value > this.state.rows * this.state.cols / 4) {
          return parseInt(this.state.rows * this.state.cols / 4, 10);
        }
        return Number(value);

      default:
        return value;
    }
  }

  formatValues(values) {
    return R.mapObjIndexed((value, name) => this.format(name, value))(values);
  }

  render() {
    return (
      <div className="MinesweeperConfig">
        <div className="MinesweeperConfig__table">
          <div className="MinesweeperConfig__row">
            <label className="MinesweeperConfig__label">Cols :</label>
            <input
              className="MinesweeperConfig__input"
              name="cols"
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              type="number"
              value={this.state.cols}
            />
          </div>
          <div className="MinesweeperConfig__row">
            <label className="MinesweeperConfig__label">Rows :</label>
            <input
              className="MinesweeperConfig__input"
              name="rows"
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              type="number"
              value={this.state.rows}
            />
          </div>
          <div className="MinesweeperConfig__row">
            <label className="MinesweeperConfig__label">Mines :</label>
            <input
              className="MinesweeperConfig__input"
              name="mines"
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              type="number"
              value={this.state.mines}
            />
          </div>
          <div className="MinesweeperConfig__row">
            <label className="MinesweeperConfig__label">Seed :</label>
            <input
              className="MinesweeperConfig__input"
              name="seed"
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              type="text"
              value={this.state.seed}
            />
          </div>
        </div>
        <div className="MinesweeperConfig__buttons">
          <button onClick={this.handleClick} type="button">Play</button>
        </div>
      </div>
    );
  }
}

MinesweeperConfig.propTypes = {
  play: PropTypes.func.isRequired
};

MinesweeperConfig.defaultProps = {};

export default MinesweeperConfig;
