/**
 *
 * DetailMoive
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import reducer from './reducer';
import saga from './saga';
import { useParams } from 'react-router-dom';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { getDetailMovies } from './actions';
import { makeSelectActor, makeSelectDetailMoive } from './selectors';

export function DetailMoive({ triggerDetailMovie, detailMoive, actors }) {
  useInjectReducer({ key: 'detailMoive', reducer });
  useInjectSaga({ key: 'detailMoive', saga });

  const { id } = useParams();

  useEffect(() => {
    triggerDetailMovie(id);
  }, [id]);
  return <div>ádas</div>;
}

DetailMoive.propTypes = {
  triggerDetailMovie: PropTypes.func,
  detailMoive: PropTypes.any,
  actors: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  detailMoive: makeSelectDetailMoive(),
  actors: makeSelectActor(),
});

function mapDispatchToProps(dispatch) {
  return {
    triggerDetailMovie: id => dispatch(getDetailMovies(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DetailMoive);
