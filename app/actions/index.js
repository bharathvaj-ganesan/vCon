import { ipcRenderer } from 'electron';
import {
  ADD_VIDEOS,
  REMOVE_VIDEO,
  REMOVE_ALL_VIDEOS,
  VIDEO_COMPLETE,
  SET_FORMAT
} from './types';

export const addVideos = videos => (dispatch, getState) => {
  ipcRenderer.send('videos:added', videos);

  const dispatchVideoWithMetaListenner = (event, videosWithMeta) => {
    dispatch({
      type: ADD_VIDEOS,
      payload: videosWithMeta
    });
    ipcRenderer.removeListener(
      'videos:meta:ready',
      dispatchVideoWithMetaListenner
    );
  };
  ipcRenderer.on('videos:meta:ready', dispatchVideoWithMetaListenner);
};

export const removeVideo = videoPath => ({
  type: REMOVE_VIDEO,
  payload: videoPath
});

export const removeAllVideos = () => ({
  type: REMOVE_ALL_VIDEOS
});

export const showInFolder = outputPath => {
  ipcRenderer.send('folder:open', outputPath);
};

export const convertVideos = videos => dispatch => {
  // ipcRenderer.send('conversion:start', videos);

  // ipcRenderer.on('conversion:end', (event, { video, outputPath }) => {
  //   dispatch({ type: VIDEO_COMPLETE, payload: { ...video, outputPath } });
  // });

  // ipcRenderer.on('conversion:progress', (event, { video, timemark }) => {
  //   dispatch({ type: VIDEO_PROGRESS, payload: { ...video, timemark } });
  // });
  dispatch({
    type: VIDEO_COMPLETE,
    payload: ''
  });
};

export const setFormat = (videoPath, format) => ({
  type: SET_FORMAT,
  payload: {
    videoPath,
    format
  }
});
