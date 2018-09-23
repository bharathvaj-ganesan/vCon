import React, { Component } from 'react';
import ConvertVideo from './containers/ConvertVideo';
import VideoSelect from './containers/VideoSelect';

class App extends Component {
  render() {
    return (
      <div className="app">
        <VideoSelect />
        <ConvertVideo />
      </div>
    );
  }
}
export default App;
