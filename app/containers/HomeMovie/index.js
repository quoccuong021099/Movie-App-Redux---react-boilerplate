// import PropTypes from 'prop-types';
import { Box, Button, Grid, makeStyles, TextField } from '@material-ui/core';
import _debounce from 'lodash/debounce';
import _trim from 'lodash/trim';
import PropTypes from 'prop-types';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import CardMovie from '../../components/CardMovie';
import Introduce from '../../components/Introduce';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { getMovies, getSearchResult, loadMore } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectHomeMovie, {
  makeSelectCurrentPage,
  makeSelectDetailMovie,
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
  textField: {
    width: '50%',
    margin: '50px 0',
    backgroundColor: '#fff',
    borderRadius: '5px',
  },
}));

export function HomeMovie({
  triggerListMovie,
  listMovie,
  triggerLoadMore,
  currentPage,
  totalPage,
  triggerSearch,
}) {
  useInjectReducer({ key: 'homeMovie', reducer });
  useInjectSaga({ key: 'homeMovie', saga });

  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    triggerListMovie({ lang: 'en-US', page: 1, query: searchValue });
  }, []);

  const handleLoadMore = () => {
    triggerLoadMore({
      lang: 'en-US',
      page: currentPage + 1,
      query: searchValue,
    });
  };

  const delayedQuery = useCallback(
    _debounce(valueSearch => {
      // trigger call API
      triggerSearch({
        lang: 'en-US',
        query: valueSearch,
        page: currentPage + 1,
      });
    }, 500),
    [],
  );

  const getValueInput = e => {
    setSearchValue(e.target.value);
    delayedQuery(_trim(e.target.value));
  };

  return (
    <Box className={classes.root}>
      <Introduce />
      <TextField
        className={classes.textField}
        size="medium"
        placeholder="Tìm kiếm phim"
        value={searchValue}
        variant="outlined"
        onChange={getValueInput}
      />
      <Grid container spacing={1}>
        {listMovie.length > 0 &&
          listMovie.map(i => (
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              lg={2}
              key={`${i.title}${i.id}`}
              // onClick={() => handleDetail(i.id)}
            >
              <Link to={`/${i.id}`}>
                <CardMovie img={i.poster_path} alt={i.title} name={i.title} />
              </Link>
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
  triggerDetailMovie: PropTypes.func,
  DetailMovie: PropTypes.any,
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
    triggerSearch: data => dispatch(getSearchResult(data)),
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
