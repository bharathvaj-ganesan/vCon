import React, { Component } from 'react';
import { connect } from 'react-redux';
import VideoList from '../components/VideoList';
import {
  removeVideo,
  removeAllVideos,
  showInFolder,
  convertVideos,
  setFormat
} from '../actions';

class ConvertVideo extends Component {
  render() {
    return (
      <div style={{ margin: '10px' }}>
        <VideoList
          className="collection"
          videos={this.props.videos}
          removeVideo={this.props.removeVideo}
          onFolderOpen={this.props.showInFolder}
          onFormatChange={this.props.setFormat}
        />
        <a
          className="waves-effect  waves-light btn green"
          onClick={this.props.convertVideos}
        >
          Convert
          <i className="material-icons right">sync</i>
        </a>

        <a
          className="btn-floating right btn-large waves-effect waves-light red"
          onClick={this.props.removeAllVideos}
        >
          <i className="material-icons">delete</i>
        </a>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { videos: state.videos };
}

export default connect(
  mapStateToProps,
  { removeVideo, removeAllVideos, showInFolder, setFormat, convertVideos }
)(ConvertVideo);
