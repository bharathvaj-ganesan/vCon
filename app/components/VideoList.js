import React, { Component } from 'react';
import moment from 'moment';

const VIDEO_FORMATS = [
  { value: 'avi', option: 'AVI' },
  { value: 'm4v', option: 'M4V raw MPEG-4' },
  { value: 'mov', option: 'MOV / QuickTime' },
  { value: 'mp4', option: 'MP4 / QuickTime' },
  { value: 'mpeg', option: 'MPEG' },
  { value: 'ogv', option: 'OGV' }
];

const styles = {
  progressBar: {
    transitionProperty: 'right',
    transitionDuration: '0.25s',
    position: 'absolute',
    zIndex: 0,
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#03a9f4',
    opacity: 0.25
  },
  secondaryContent: {
    zIndex: 1,
    width: '180px',
    top: 'auto',
    botton: 'auto'
  },
  fileName: {
    width: '65%'
  }
};

export default class VideoList extends Component {
  bytesToSize = bytes => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`;
  };

  showStatus = ({ complete, timemark, outputPath, err }) => {
    if (complete) {
      return (
        <button
          onClick={() => this.props.onFolderOpen(outputPath)}
          className="btn"
        >
          Open Folder
        </button>
      );
    }
    if (err) {
      return <p className="red-text">{err}</p>;
    }
    return '';
  };

  renderVideos = () => {
    const { videos } = this.props;

    return videos.map((video, index) => {
      const { name, path, size, format } = video;
      return (
        <li className="collection-item" key={path}>
          <span className="grey-text">{`${index + 1}.`}</span>
          {/* <div
          style={{
            ...styles.progressBar,
            right: this.renderProgressBar(video)
          }}
        /> */}
          <div style={styles.fileName}>
            <p className="truncate">{name}</p>
            <h6 className="grey-text">{this.bytesToSize(size)}</h6>
          </div>
          <div className="secondary-content" style={styles.secondaryContent}>
            <select
              className="browser-default right"
              value={format}
              onChange={e => this.props.onFormatChange(path, e.target.value)}
            >
              {VIDEO_FORMATS.map(outFormat => (
                <option key={outFormat.value} value={outFormat.value}>
                  {outFormat.option}
                </option>
              ))}
            </select>

            <i
              className="material-icons red-text right"
              style={{ cursor: 'pointer' }}
              onClick={() => this.props.removeVideo(path)}
            >
              delete
            </i>
            {/* {this.showStatus({ complete, timemark, outputPath, err })} */}
          </div>
        </li>
      );
    });
  };

  render() {
    const { videos } = this.props;
    return <ul className="collection video-list">{this.renderVideos()}</ul>;
  }
}
