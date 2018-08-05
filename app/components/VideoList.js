import React, { Component } from 'react';

const VIDEO_FORMATS = [
  { value: 'avi', option: 'AVI' },
  { value: 'm4v', option: 'M4V raw MPEG-4' },
  { value: 'mov', option: 'MOV / QuickTime' },
  { value: 'mp4', option: 'MP4 / QuickTime' },
  { value: 'mpeg', option: 'MPEG' }
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

const secondsTohhmmss = totalSeconds => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  let seconds = totalSeconds - hours * 3600 - minutes * 60;

  // round seconds
  seconds = Math.round(seconds * 100) / 100;

  let result = hours < 10 ? `0${hours}` : hours;
  result += `:${minutes < 10 ? `0${minutes}` : minutes}`;
  result += `:${seconds < 10 ? `0${seconds}` : seconds}`;
  return result;
};

const hhmmssToSeconds = timemark => {
  const [hours, minutes, seconds] = timemark.split(':');
  let totalSeconds = parseInt(seconds);
  totalSeconds += minutes * 60;
  totalSeconds += hours * 3600;
  return totalSeconds;
};

export default class VideoList extends Component {
  bytesToSize = bytes => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`;
  };

  showStatus = ({ converted, outputPath, videoPath }) => {
    if (converted) {
      return (
        <button
          onClick={() => this.props.onFolderOpen(outputPath, videoPath)}
          className="btn"
        >
          Open Folder
        </button>
      );
    }
    return '';
  };

  renderProgressBar = ({ duration, timemark, converted }) => {
    if (timemark) {
      return `${100 - (hhmmssToSeconds(timemark) * 1000) / (duration * 10)}%`;
    }
    if (converted) {
      return '0%';
    }
    return '100%';
  };

  renderVideos = () => {
    const { videos } = this.props;
    return videos.map((video, index) => {
      const {
        name,
        path,
        size,
        format,
        duration,
        converted,
        outputPath,
        error
      } = video;

      return (
        <li
          className={
            error ? 'collection-item red white-text' : 'collection-item'
          }
          key={path}
        >
          <span className="grey-text">{`${index + 1}.`}</span>
          <div
            style={{
              ...styles.progressBar,
              right: this.renderProgressBar(video)
            }}
          />
          <div style={styles.fileName}>
            <p className="truncate">{name}</p>
            <h6 className="grey-text">{this.bytesToSize(size)}</h6>
            <p>
              <i className="grey-text">{secondsTohhmmss(duration)}</i>
            </p>
          </div>
          <div className="secondary-content" style={styles.secondaryContent}>
            <select
              className={converted ? 'hidden' : 'browser-default right'}
              value={format}
              style={error ? { display: 'none' } : {}}
              onChange={e => this.props.onFormatChange(path, e.target.value)}
            >
              {VIDEO_FORMATS.map(outFormat => (
                <option key={outFormat.value} value={outFormat.value}>
                  {outFormat.option}
                </option>
              ))}
            </select>

            <i
              className={
                error
                  ? 'material-icons white-text right'
                  : 'material-icons red-text right'
              }
              style={{ cursor: 'pointer', margin: '1rem' }}
              onClick={() => this.props.removeVideo(path)}
            >
              delete
            </i>
            {this.showStatus({ converted, outputPath, videoPath: path })}
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
