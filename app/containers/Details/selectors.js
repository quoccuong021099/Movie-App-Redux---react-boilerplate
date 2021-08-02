import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDetailsDomain = state => state.details || initialState;

const makeSelectDetails = () =>
  createSelector(
    selectDetailsDomain,
    substate => substate,
  );

export default makeSelectDetails;
export { selectDetailsDomain };
