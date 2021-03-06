// import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Autocomplete, Skeleton } from '@material-ui/lab';
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
import { LANGUAGE } from '../../utils/config';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { getMovies, getSearchResult, loadMore } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectHomeMovie, {
  makeSelectCurrentPage,
  makeSelectIsSuccessHomeMovie,
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
    width: '100%',
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
  statusFlag,
}) {
  useInjectReducer({ key: 'homeMovie', reducer });
  useInjectSaga({ key: 'homeMovie', saga });
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');
  const [valueOption, setValueOption] = useState(null);

  useEffect(() => {
    triggerListMovie({
      lang: (valueOption && valueOption.lang) || 'en-US',
      page: 1,
      query: searchValue,
    });
  }, [triggerSearch, valueOption]);

  const handleLoadMore = () => {
    triggerLoadMore({
      lang: (valueOption && valueOption.lang) || 'en-US',
      page: currentPage + 1,
      query: searchValue,
    });
  };

  const delayedQuery = useCallback(
    _debounce(query => {
      // trigger call API
      triggerSearch({
        lang: valueOption && valueOption.lang,
        query,
        page: 1,
      });
    }, 500),
    [valueOption],
  );

  const getValueInput = e => {
    setSearchValue(e.target.value);
    delayedQuery(_trim(e.target.value));
  };

  return (
    <Box className={classes.root}>
      <Introduce />
      <Grid container spacing={0} justifyContent="space-between">
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <TextField
            size="small"
            className={classes.textField}
            placeholder="T??m ki???m phim"
            value={searchValue}
            variant="outlined"
            onChange={getValueInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={2} md={2} lg={1}>
          <Autocomplete
            value={valueOption}
            options={LANGUAGE}
            getOptionLabel={option => option.title}
            size="small"
            renderInput={params => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Eng"
                className={classes.textField}
              />
            )}
            onChange={(event, newValue) => {
              setValueOption(newValue);
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        {statusFlag.isLoading ? (
          Array.from(new Array(12)).map((i, index) => (
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              lg={2}
              key={(() => `index${index}`)()}
            >
              <Skeleton variant="rect" width="100%" height={426} />
            </Grid>
          ))
        ) : (
          <>
            {listMovie.length > 0 &&
              listMovie.map(i => (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={3}
                  lg={2}
                  key={`${i.title}${i.id}`}
                >
                  <Link to={`/${i.id}`} style={{ textDecoration: 'none' }}>
                    <CardMovie
                      img={i.poster_path}
                      alt={i.title}
                      name={i.title}
                    />
                  </Link>
                </Grid>
              ))}
          </>
        )}
      </Grid>
      <Box className={classes.box}>
        {currentPage < totalPage && (
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={handleLoadMore}
          >
            Xem th??m
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
  triggerLoadMore: PropTypes.func,
  triggerSearch: PropTypes.func,
  DetailMovie: PropTypes.any,
  currentPage: PropTypes.number,
  totalPage: PropTypes.number,
  statusFlag: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  listMovie: makeSelectHomeMovie(),
  currentPage: makeSelectCurrentPage(),
  totalPage: makeSelectTotalPage(),
  statusFlag: makeSelectIsSuccessHomeMovie(),
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
