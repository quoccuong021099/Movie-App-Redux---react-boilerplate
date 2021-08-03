import {
  GET_MOVIES,
  GET_MOVIES_FAILED,
  GET_MOVIES_SUCCESS,
  GET_SEARCH_RESULT,
  LOAD_MORE,
  LOAD_MORE_FAILED,
  LOAD_MORE_SUCCESS,
} from './constants';

export function getMovies(data) {
  return {
    type: GET_MOVIES,
    data,
  };
}

export function getMoviesSuccess(payload) {
  return {
    type: GET_MOVIES_SUCCESS,
    payload,
  };
}
export function getMoviesFailed(message = '') {
  return {
    type: GET_MOVIES_FAILED,
    message,
  };
}
export function loadMore(data) {
  return {
    type: LOAD_MORE,
    data,
  };
}
export function loadMoreSuccess(payload) {
  return {
    type: LOAD_MORE_SUCCESS,
    payload,
  };
}
export function loadMoreFailed(data) {
  return {
    type: LOAD_MORE_FAILED,
    data,
  };
}

export function getSearchResult(data) {
  return {
    type: GET_SEARCH_RESULT,
    data,
  };
}
