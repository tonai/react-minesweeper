import React from 'react';

import MinesweeperConfig from '../MinesweeperConfig/MinesweeperConfig.jsx';
import MinesweeperGame from '../MinesweeperGame/MinesweeperGame.jsx';
import './MinesweeperApp.css';

class MinesweeperApp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        cols: 9,
        rows: 9,
        mines: 10,
        seed: ''
      },
      play: false
    }
  }

  handleBack = () => {
    this.setState({
      play: false
    });
  };

  handleConfigUpdated = (config) => {
    this.setState({config});
  };

  handleGameStart = () => {
    this.setState({
      play: true
    });
  };

  render() {
    return (
      <div className="MinesweeperApp" >
        {!this.state.play && (
          <MinesweeperConfig
            onConfigUpdated={this.handleConfigUpdated}
            onGameStart={this.handleGameStart}
            config={this.state.config}
          />
        )}
        {this.state.play && (
          <div>
            <MinesweeperGame {...this.state.config} />
            <div className="MinesweeperApp__buttons" >
              <button onClick={this.handleBack} >Back</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MinesweeperApp;
