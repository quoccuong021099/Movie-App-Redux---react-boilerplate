import produce from 'immer';
import {
  GET_DETAIL_MOVIES,
  GET_DETAIL_MOVIES_SUCCESS,
  GET_DETAIL_MOVIES_FAILED,
} from './constants';

export const initialState = {
  detailMovie: null,
  actors: null,
  statusFlags: {
    isLoading: false,
    isGetDetailMoiveSuccess: false,
  },
  logs: {
    error: '',
  },
};
/* eslint-disable default-case, no-param-reassign */
const detailMoiveReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_DETAIL_MOVIES: {
        draft.statusFlags.isLoading = true;
        break;
      }
      case GET_DETAIL_MOVIES_SUCCESS: {
        draft.statusFlags.isLoading = false;
        draft.statusFlags.isGetDetailMoiveSuccess = true;
        draft.detailMovie = action.payload.detailData;
        draft.actors = action.payload.actor;
        break;
      }
      case GET_DETAIL_MOVIES_FAILED: {
        draft.statusFlags.isLoading = false;
        draft.statusFlags.isGetDetailMoiveSuccess = false;
        draft.logs.error = 'Lỗi API';
        break;
      }
    }
  });

export default detailMoiveReducer;
