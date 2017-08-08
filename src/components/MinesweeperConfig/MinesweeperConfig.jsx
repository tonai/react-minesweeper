import React from 'react';
import PropTypes from 'prop-types';

import './MinesweeperConfig.css';

function MinesweeperConfig({config, onConfigUpdated, onGameStart}) {
  return (
    <div className="MinesweeperConfig">
      <div className="MinesweeperConfig__table">
        <div className="MinesweeperConfig__row">
          <label className="MinesweeperConfig__label">Cols :</label>
          <input
            className="MinesweeperConfig__input"
            name="cols"
            onBlur={handleBlur}
            onChange={handleChange}
            type="number"
            value={config.cols}
          />
        </div>
        <div className="MinesweeperConfig__row">
          <label className="MinesweeperConfig__label">Rows :</label>
          <input
            className="MinesweeperConfig__input"
            name="rows"
            onBlur={handleBlur}
            onChange={handleChange}
            type="number"
            value={config.rows}
          />
        </div>
        <div className="MinesweeperConfig__row">
          <label className="MinesweeperConfig__label">Mines :</label>
          <input
            className="MinesweeperConfig__input"
            name="mines"
            onBlur={handleBlur}
            onChange={handleChange}
            type="number"
            value={config.mines}
          />
        </div>
        <div className="MinesweeperConfig__row">
          <label className="MinesweeperConfig__label">Seed :</label>
          <input
            className="MinesweeperConfig__input"
            name="seed"
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            value={config.seed}
          />
        </div>
      </div>
      <div className="MinesweeperConfig__buttons">
        <button onClick={handleClick} type="button">Play</button>
      </div>
    </div>
  );

  function format(name, value, values) {
    switch(name) {
      case 'cols':
      case 'rows':
        if (value < 5) {
          return 5;
        } else if (value > 30) {
          return 30;
        }
        return Number(value);

      case 'mines':
        if (value < 10) {
          return 10;
        } else if (value > values.rows * values.cols / 2) {
          return parseInt(values.rows * values.cols / 2, 10);
        }
        return Number(value);

      default:
        return value;
    }
  }

  function formatValues(values) {
    for (let name in values) {
      if (values.hasOwnProperty(name)) {
        values[name] = format(name, values[name], values)
      }
    }
    return values;
  }

  function handleBlur() {
    const values = formatValues({...config});
    onConfigUpdated(values);
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    onConfigUpdated({
      ...config,
      [name]: event.target.type === 'number' ? Number(value) : value
    });
  }

  function handleClick(event) {
    event.preventDefault();
    onGameStart();
  }
}

MinesweeperConfig.propTypes = {
  config: PropTypes.shape({
    cols: PropTypes.number.isRequired,
    mines: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
    seed: PropTypes.string
  }).isRequired,
  onConfigUpdated: PropTypes.func.isRequired,
  onGameStart: PropTypes.func.isRequired
};

MinesweeperConfig.defaultProps = {};

export default MinesweeperConfig;
