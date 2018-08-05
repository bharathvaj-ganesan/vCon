import {
  ADD_VIDEOS,
  REMOVE_VIDEO,
  REMOVE_ALL_VIDEOS,
  VIDEO_COMPLETE,
  SET_FORMAT,
  VIDEO_PROGRESS,
  CONVERTION_ERROR
} from '../actions/types';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  console.log(action);
  switch (action.type) {
    case ADD_VIDEOS:
      return [...state, ...action.payload];
    case REMOVE_VIDEO:
      return state.filter(video => video.path !== action.payload);
    case REMOVE_ALL_VIDEOS:
      return INITIAL_STATE;
    case VIDEO_PROGRESS:
      return state.map(video => {
        const { timemark, videoPath } = action.payload;
        if (video.path === videoPath) {
          return {
            ...video,
            timemark
          };
        }
        return video;
      });
    case VIDEO_COMPLETE:
      return state.map(video => {
        const { videoPath, outputPath } = action.payload;
        if (video.path === videoPath) {
          video.converted = true;
          video.outputPath = outputPath;
        }
        return {
          ...video
        };
      });
    case SET_FORMAT:
      return state.map(video => {
        const { format, videoPath } = action.payload;
        if (video.path === videoPath) {
          return {
            ...video,
            format,
            converted: false
          };
        }
        return video;
      });
    case CONVERTION_ERROR:
      return state.map(video => {
        const { format, videoPath } = action.payload;
        if (video.path === videoPath) {
          return {
            ...video,
            error: 'Cannor Convert video',
            converted: false
          };
        }
        return video;
      });
    default:
      return state;
  }
}
