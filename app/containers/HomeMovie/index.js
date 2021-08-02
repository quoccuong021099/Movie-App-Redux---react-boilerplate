// import PropTypes from 'prop-types';
import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import CardMovie from '../../components/CardMovie';
import Introduce from '../../components/Introduce';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { getMovies, loadMore } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectHomeMovie, {
  makeSelectCurrentPage,
  makeSelectTotalPage,
} from './selectors';
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  box: {
    margin: '0 auto',
    padding: '50px',
  },
  button: {
    padding: '15px 50px',
    fontSize: '20px',
    backgroundColor: '#e50914',
    '&:hover': {
      backgroundColor: '#9f060e',
    },
  },
}));

export function HomeMovie({
  triggerListMovie,
  listMovie,
  triggerLoadMore,
  currentPage,
  totalPage,
}) {
  useInjectReducer({ key: 'homeMovie', reducer });
  useInjectSaga({ key: 'homeMovie', saga });
  const classes = useStyles();

  useEffect(() => {
    triggerListMovie({ lang: 'en-US', page: 1 });
  }, []);

  const handleLoadMore = () => {
    triggerLoadMore({ lang: 'en-US', page: currentPage + 1 });
  };

  return (
    <Box className={classes.root}>
      <Introduce />
      <Grid container spacing={1}>
        {listMovie.length > 0 &&
          listMovie.map(i => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={`${i.title}${i.id}`}>
              <CardMovie img={i.poster_path} alt={i.title} name={i.title} />
            </Grid>
          ))}
      </Grid>
      <Box className={classes.box}>
        {currentPage < totalPage && (
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={handleLoadMore}
          >
            Xem thêm
          </Button>
        )}
      </Box>
    </Box>
  );
}

HomeMovie.propTypes = {
  listMovie: PropTypes.any,
  triggerListMovie: PropTypes.func,
  triggerLoadMore: PropTypes.func,
  currentPage: PropTypes.number,
  totalPage: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  listMovie: makeSelectHomeMovie(),
  currentPage: makeSelectCurrentPage(),
  totalPage: makeSelectTotalPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    triggerListMovie: data => dispatch(getMovies(data)),
    triggerLoadMore: data => dispatch(loadMore(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomeMovie);
