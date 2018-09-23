import { ipcRenderer } from 'electron';
import {
  ADD_VIDEOS,
  REMOVE_VIDEO,
  REMOVE_ALL_VIDEOS,
  VIDEO_COMPLETE,
  VIDEO_PROGRESS,
  SET_FORMAT
} from './types';

export const addVideos = videos => (dispatch, getState) => {
  const currentStateVideos = getState().videos;

  const filteredNewVideos = videos.filter(
    video =>
      !currentStateVideos.find(currentVideo => video.path === currentVideo.path)
  );
  if (filteredNewVideos.length > 0) {
    ipcRenderer.send('videos:added', filteredNewVideos);

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
  }
};

export const removeVideo = videoPath => ({
  type: REMOVE_VIDEO,
  payload: videoPath
});

export const removeAllVideos = () => ({
  type: REMOVE_ALL_VIDEOS
});

export const showInFolder = (outputPath, videoPath) => {
  ipcRenderer.send('folder:open', outputPath);
  return {
    type: REMOVE_VIDEO,
    payload: videoPath
  };
};

export const convertVideos = () => (dispatch, getState) => {
  const videos = getState().videos;
  const filterAlreadyConvertedVideos = videos.filter(
    video => video.converted === false
  );
  ipcRenderer.send('conversion:start', filterAlreadyConvertedVideos);

  const dispatchVideoConvertOutputPath = (event, { videoPath, outputPath }) => {
    ipcRenderer.removeListener(
      'conversion:end',
      dispatchVideoConvertOutputPath
    );
    dispatch({ type: VIDEO_COMPLETE, payload: { videoPath, outputPath } });
  };

  ipcRenderer.on('conversion:end', dispatchVideoConvertOutputPath);
  ipcRenderer.on('conversion:progress', (event, { videoPath, timemark }) => {
    dispatch({ type: VIDEO_PROGRESS, payload: { videoPath, timemark } });
  });
};

export const setFormat = (videoPath, format) => ({
  type: SET_FORMAT,
  payload: {
    videoPath,
    format
  }
});
