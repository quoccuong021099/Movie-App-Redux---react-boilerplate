import produce from 'immer';
import {
  GET_MOVIES,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILED,
  LOAD_MORE,
  LOAD_MORE_SUCCESS,
  LOAD_MORE_FAILED,
} from './constants';

export const initialState = {
  listMovie: [],
  currentPage: 0,
  totalPage: 0,
  statusFlags: {
    isLoading: false,
    isGetMovieSuccess: false,
    isLoadMoreSuccess: false,
  },
  logs: {
    error: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const homeMovieReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_MOVIES: {
        draft.statusFlags.isLoading = true;
        break;
      }
      case GET_MOVIES_SUCCESS: {
        draft.statusFlags.isLoading = false;
        draft.currentPage = action.payload.page;
        draft.totalPage = action.payload.total_pages;
        draft.listMovie = action.payload.results;
        draft.statusFlags.isGetMovieSuccess = true;
        break;
      }
      case GET_MOVIES_FAILED: {
        draft.statusFlags.isLoading = false;
        draft.statusFlags.isGetMovieSuccess = false;
        draft.logs.error = 'Lỗi API';
        break;
      }
      case LOAD_MORE: {
        draft.statusFlags.isLoading = true;
        break;
      }
      case LOAD_MORE_SUCCESS: {
        draft.statusFlags.isLoading = false;
        draft.currentPage = action.payload.page;
        draft.totalPage = action.payload.total_pages;
        draft.listMovie = [...state.listMovie, ...action.payload.results];
        draft.statusFlags.isLoadMoreSuccess = true;
        break;
      }
      case LOAD_MORE_FAILED: {
        draft.statusFlags.isLoading = false;
        draft.statusFlags.isLoadMoreSuccess = false;
        draft.statusFlags.isLoadMoreFailed = true;
        draft.logs.error = 'Lỗi API';
        break;
      }
    }
  });

export default homeMovieReducer;
