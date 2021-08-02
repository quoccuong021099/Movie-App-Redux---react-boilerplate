import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import DetailComponent from '../../components/DetailComponent';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import makeSelectDetails from './selectors';

export function Details() {
  useInjectReducer({ key: 'details', reducer });
  useInjectSaga({ key: 'details', saga });

  return (
    <Box>
      <DetailComponent />
    </Box>
  );
}

Details.propTypes = {};

const mapStateToProps = createStructuredSelector({
  details: makeSelectDetails(),
});

function mapDispatchToProps(dispatch) {
  return;
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Details);
