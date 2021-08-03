import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { DEFAULT_IMAGE, IMAGE_BASE_URL, POSTER_SIZE } from '../../utils/config';

const useStyles = makeStyles(() => ({
  paper: {
    textAlign: 'center',
    backgroundColor: '#181818',
    color: '#fff',
    boxShadow: 'none',
    cursor: 'pointer',
  },
  img: {
    width: '100%',
    height: 'auto',
  },
  typo: {
    paddingTop: '30px',
  },
}));

function CardMovie({ img, alt, name }) {
  const classes = useStyles();
  return (
    <Box p={1}>
      <Paper className={classes.paper}>
        <Box>
          <img
            className={classes.img}
            src={img ? `${IMAGE_BASE_URL}${POSTER_SIZE}${img}` : DEFAULT_IMAGE}
            alt={alt}
          />
        </Box>
        <Typography variant="subtitle1" className={classes.typo}>
          {name}
        </Typography>
      </Paper>
    </Box>
  );
}

CardMovie.propTypes = {
  img: PropTypes.any,
  alt: PropTypes.string,
  name: PropTypes.string,
};
const withConnect = connect(
  null,
  null,
);
export default compose(
  withConnect,
  memo,
)(CardMovie);
