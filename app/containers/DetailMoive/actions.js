import {
  GET_DETAIL_MOVIES,
  GET_DETAIL_MOVIES_SUCCESS,
  GET_DETAIL_MOVIES_FAILED,
} from './constants';

export function getDetailMoviesSuccess(payload) {
  return {
    type: GET_DETAIL_MOVIES_SUCCESS,
    payload,
  };
}
export function getDetailMoviesFailed(message = '') {
  return {
    type: GET_DETAIL_MOVIES_FAILED,
    message,
  };
}
export function getDetailMovies(data) {
  return {
    type: GET_DETAIL_MOVIES,
    data,
  };
}
