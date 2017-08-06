import React from 'react';

import MinesweeperConfig from '../MinesweeperConfig/MinesweeperConfig.jsx';
import MinesweeperGame from '../MinesweeperGame/MinesweeperGame.jsx';
import './MinisweeperApp.css';

class MinisweeperApp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      config: null,
      play: false
    }
  }

  handleBack = () => {
    this.setState({
      play: false
    });
  }

  handlePlay = (config) => {
    this.setState({
      config,
      play: true
    });
  };

  render() {
    return (
      <div className="MinisweeperApp" >
        {!this.state.play && (
          <MinesweeperConfig play={this.handlePlay} />
        )}
        {this.state.play && (
          <div>
            <MinesweeperGame {...this.state.config} />
            <div className="MinisweeperApp__buttons" >
              <button onClick={this.handleBack} >Back</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MinisweeperApp;
