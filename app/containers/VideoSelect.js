import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import * as actions from '../actions';

class VideoSelect extends Component {
  onDrop = files => {
    const filesSanitized = files.map(file => {
      const { path, name, size, type } = file;
      return {
        path,
        name,
        size,
        format: type.split('/')[1],
        converted: false,
        duration: 0,
        timemark: 0,
        outputPath: '',
        error: ''
      };
    });
    console.log(filesSanitized);
    this.props.addVideos(filesSanitized);
  };

  renderChildern() {}

  render() {
    return (
      <Dropzone
        onDrop={this.onDrop}
        accept="video/*"
        className="dropzone"
        activeClassName="dropzone-active"
        rejectClassName="dropzone-reject"
        multiple
      >
        {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
          if (isDragReject) {
            return (
              <h5 className="drop-message grey-text">
                Uh oh, I don't know how to deal with that type of file!
              </h5>
            );
          }
          if (isDragActive) {
            return (
              <h5 className="drop-message grey-text">
                Omnomnom, let me have those videos!
              </h5>
            );
          }
          return (
            <h5 className="drop-message grey-text">
              Drag and drop some files on me, or click to select.
            </h5>
          );
        }}
      </Dropzone>
    );
  }
}

export default connect(
  null,
  actions
)(VideoSelect);
