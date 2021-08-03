import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the detailMoive state domain
 */

const selectDetailMoiveDomain = state => state.detailMoive || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DetailMoive
 */

const makeSelectDetailMoive = () =>
  createSelector(
    selectDetailMoiveDomain,
    substate => substate.detailMovie,
  );
const makeSelectActor = () =>
  createSelector(
    selectDetailMoiveDomain,
    substate => substate.actors,
  );

export { makeSelectDetailMoive, makeSelectActor };
