import axios from 'axios';
import _get from 'lodash/get';
import { call, put, takeLatest } from 'redux-saga/effects';
import { API_KEY, API_URL } from '../../utils/config';
import {
  getMoviesFailed,
  getMoviesSuccess,
  loadMoreFailed,
  loadMoreSuccess,
} from './actions';
import { GET_MOVIES, LOAD_MORE } from './constants';

function fetchMovie(data) {
  return axios({
    method: 'GET',
    url: `${API_URL}movie/popular?api_key=${API_KEY}&language=${
      data.lang
    }&page=${data.page}`,
  });
}

function* getMoviesSagaFunc({ data }) {
  const response = yield call(fetchMovie, data);
  const movieData = _get(response, 'data', {});
  if (movieData) {
    yield put(getMoviesSuccess(movieData));
  } else {
    yield put(getMoviesFailed('Đã có lỗi xảy ra'));
  }
}
function* loadMoreSaga({ data }) {
  const response = yield call(fetchMovie, data);
  const movieData = _get(response, 'data', {});
  console.log('saga: ', movieData);
  if (movieData) {
    yield put(loadMoreSuccess(movieData));
  } else {
    yield put(loadMoreFailed('Đã có lỗi xảy ra'));
  }
}

// Individual exports for testing
export default function* homeMovieSaga() {
  yield takeLatest(GET_MOVIES, getMoviesSagaFunc);
  yield takeLatest(LOAD_MORE, loadMoreSaga);
}
