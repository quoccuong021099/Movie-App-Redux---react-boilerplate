import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import React, { memo } from 'react';
import { DEFAULT_IMAGE, IMAGE_BASE_URL, POSTER_SIZE } from '../../utils/config';
// import { Link } from 'react-router-dom';
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
      {/* <Link to="/a"> */}
      <Paper className={classes.paper}>
        <Box>
          <img
            className={classes.img}
            src={img ? `${IMAGE_BASE_URL}${POSTER_SIZE}${img}` : DEFAULT_IMAGE}
            alt={alt}
          />
        </Box>
        <Typography variant="h4" className={classes.typo}>
          {name}
        </Typography>
      </Paper>
      {/* </Link> */}
    </Box>
  );
}

CardMovie.propTypes = {
  img: PropTypes.any,
  alt: PropTypes.string,
  name: PropTypes.string,
};

export default memo(CardMovie);
