import axios from 'axios';
import _get from 'lodash/get';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { API_KEY, API_URL, SEARCH_API } from '../../utils/config';
import {
  getMoviesFailed,
  getMoviesSuccess,
  loadMoreFailed,
  loadMoreSuccess,
} from './actions';
import { GET_MOVIES, GET_SEARCH_RESULT, LOAD_MORE } from './constants';

function fetchMovie(data) {
  let URL = `${API_URL}movie/popular?api_key=${API_KEY}&language=${
    data.lang
  }&page=${data.page}`;
  if (data.query.length > 0)
    URL = `${SEARCH_API}&language=${data.lang}&query=${data.query}&page=${
      data.page
    }`;
  return axios({
    method: 'GET',
    url: URL,
  });
}

function fetchSearch(data) {
  return axios({
    method: 'GET',
    url: `${SEARCH_API}&language=${data.lang}&query=${data.query}&page=${
      data.page
    }`,
  });
}

function* getMoviesSagaFunc({ data }) {
  try {
    const response = yield call(fetchMovie, data);
    const movieData = _get(response, 'data', {});
    yield delay(500);
    if (movieData) {
      yield put(getMoviesSuccess(movieData));
    } else {
      yield put(getMoviesFailed('Đã có lỗi xảy ra'));
    }
  } catch (error) {
    yield put(getMoviesFailed(error));
  }
}

function* loadMoreSaga({ data }) {
  try {
    const response = yield call(fetchMovie, data);
    const movieData = _get(response, 'data', {});
    if (movieData) {
      yield put(loadMoreSuccess(movieData));
    } else {
      yield put(loadMoreFailed('Đã có lỗi xảy ra'));
    }
  } catch (error) {
    yield put(loadMoreFailed(error));
  }
}

function* searchSaga({ data }) {
  try {
    if (data.query !== '') {
      const response = yield call(fetchSearch, data);
      const movieData = _get(response, 'data', {});
      yield put(getMoviesSuccess(movieData));
    } else {
      const data1 = { lang: 'en-US', page: 1, query: '' };
      const response1 = yield call(fetchMovie, data1);
      const movieData1 = _get(response1, 'data', {});
      if (movieData1) {
        yield put(getMoviesSuccess(movieData1));
      } else {
        yield put(getMoviesFailed('Đã có lỗi xảy ra'));
      }
    }
  } catch (error) {
    yield put(getMoviesFailed(error));
  }
}

// Individual exports for testing
export default function* homeMovieSaga() {
  yield takeLatest(GET_MOVIES, getMoviesSagaFunc);
  yield takeLatest(LOAD_MORE, loadMoreSaga);
  yield takeLatest(GET_SEARCH_RESULT, searchSaga);
}
