// import { take, call, put, select } from 'redux-saga/effects';

import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import _get from 'lodash/get';
import { API_KEY, API_URL } from '../../utils/config';
import { GET_DETAIL_MOVIES } from './constants';
import { getDetailMoviesFailed, getDetailMoviesSuccess } from './actions';

// Individual exports for testing
function fetchDetailMovie(data) {
  return axios({
    method: 'GET',
    url: `${API_URL}movie/${data}?api_key=${API_KEY}&language=en-US`,
  });
}

function fetchActor(data) {
  return axios({
    method: 'GET',
    url: `  https://api.themoviedb.org/3/movie/${data}/credits?api_key=844dba0bfd8f3a4f3799f6130ef9e335`,
    // url: `${API_URL}movie/${data}/credits?api_key=${API_KEY}&language=en-US`,
  });
}
function* getDetailsMoviesSagaFunc({ data }) {
  try {
    const response = yield call(fetchDetailMovie, data);
    const responseActor = yield call(fetchActor, data);
    const detailData = yield _get(response, 'data', {});
    const actor = yield _get(responseActor, 'data', {});
    if (detailData) {
      yield put(getDetailMoviesSuccess({ detailData, actor }));
    } else {
      yield put(getDetailMoviesFailed('Đã có lỗi xảy ra'));
    }
  } catch (error) {
    yield put(getDetailMoviesFailed(error));
  }
}
// Individual exports for testing
export default function* homeMovieSaga() {
  yield takeLatest(GET_DETAIL_MOVIES, getDetailsMoviesSagaFunc);
}
