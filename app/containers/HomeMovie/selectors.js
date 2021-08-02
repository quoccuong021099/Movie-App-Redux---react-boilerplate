import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHomeMovieDomain = state => state.homeMovie || initialState;

const makeSelectHomeMovie = () =>
  createSelector(
    selectHomeMovieDomain,
    substate => substate.listMovie,
  );
const makeSelectCurrentPage = () =>
  createSelector(
    selectHomeMovieDomain,
    substate => substate.currentPage,
  );
const makeSelectTotalPage = () =>
  createSelector(
    selectHomeMovieDomain,
    substate => substate.totalPage,
  );
const makeSelectIsSuccessHomeMovie = () =>
  createSelector(
    selectHomeMovieDomain,
    substate => substate.statusFlags,
  );

const makeSelectHomeMovieError = () =>
  createSelector(
    selectHomeMovieDomain,
    substate => substate.logs,
  );
export default makeSelectHomeMovie;
export {
  makeSelectHomeMovie,
  selectHomeMovieDomain,
  makeSelectIsSuccessHomeMovie,
  makeSelectHomeMovieError,
  makeSelectCurrentPage,
  makeSelectTotalPage,
};
