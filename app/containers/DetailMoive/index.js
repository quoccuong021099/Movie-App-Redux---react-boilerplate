import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { Rating, Skeleton } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  BACKDROP_SIZE,
  DEFAULT_IMAGE,
  IMAGE_BASE_URL,
} from '../../utils/config';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { getDetailMovies } from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectActor,
  makeSelectDetailMoive,
  makeSelectStatusFlags,
} from './selectors';
const useStyles = makeStyles(() => ({
  root: {
    minHeight: '90vh',
    width: '100%',
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: 'rgba(0,0,0,.7)',
    width: '60vw',
  },

  info: {
    padding: '30px',
    color: '#fff',
  },
  actorItem: {
    backgroundColor: 'rgba(0,0,0,.5)',
    width: '100%',
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  Paper: {
    height: '300px',
    width: '100%',
    backgroundSize: 'cover',
    color: '#fff',
  },
}));
export function DetailMoive({
  triggerDetailMovie,
  detailMoive,
  actors,
  statusFlags,
}) {
  useInjectReducer({ key: 'detailMoive', reducer });
  useInjectSaga({ key: 'detailMoive', saga });
  const classes = useStyles();

  const { id } = useParams();

  useEffect(() => {
    triggerDetailMovie(id);
  }, [id]);
  return (
    <>
      {statusFlags.isLoading ? (
        <Skeleton variant="rect" width="100%" height="90vh" />
      ) : (
        detailMoive && (
          <div
            className={classes.root}
            style={
              detailMoive.backdrop_path && {
                backgroundImage: `url(${IMAGE_BASE_URL}${BACKDROP_SIZE}${
                  detailMoive.backdrop_path
                })`,
              }
            }
          >
            <div>
              <Grid container spacing={0} className={classes.item}>
                <Grid item xs={4} lg={4}>
                  <img
                    className={classes.img}
                    src={
                      detailMoive.poster_path
                        ? `${IMAGE_BASE_URL}w342${detailMoive.poster_path}`
                        : DEFAULT_IMAGE
                    }
                    alt={detailMoive.original_title}
                  />
                </Grid>
                <Grid
                  item
                  container
                  xs={8}
                  lg={8}
                  className={classes.info}
                  spacing={3}
                >
                  <Grid item xs={12}>
                    <Typography variant="button" gutterBottom>
                      {detailMoive.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="button" gutterBottom>
                      Overview:
                    </Typography>
                    <Typography gutterBottom variant="body2">
                      {detailMoive.overview}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="button" gutterBottom>
                      Production Companies:
                    </Typography>
                    <Grid container spacing={1}>
                      {detailMoive.production_companies.map((i, index) => (
                        <Grid item xs={3} key={(() => `index${index}`)()}>
                          <Typography gutterBottom variant="body2">
                            {i.name}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="button" gutterBottom>
                      IMDB RATING:
                      <Box
                        component="fieldset"
                        mb={3}
                        borderColor="transparent"
                      >
                        <Rating
                          max={10}
                          name="read-only"
                          value={detailMoive.vote_average}
                          readOnly
                        />
                      </Box>
                    </Typography>
                    <Typography variant="button" gutterBottom>
                      Total rating: {detailMoive.vote_count}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography gutterBottom variant="body2">
                      RELEASE DATE: {detailMoive.release_date}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        )
      )}
      <Box my={5} color="#fff" backgroundcolor="rgba(255,255,255,0.5)">
        <Grid container spacing={2}>
          {statusFlags.isLoading ? (
            Array.from(new Array(12)).map((i, index) => (
              <Grid
                item
                xs={6}
                sm={4}
                md={3}
                lg={2}
                key={(() => `index${index}`)()}
              >
                <Skeleton variant="rect" width="100%" height="300px" />
              </Grid>
            ))
          ) : (
            <>
              {actors &&
                actors.cast.map((i, index) => (
                  <Grid
                    item
                    xs={6}
                    sm={4}
                    md={3}
                    lg={2}
                    key={(() => `index${index}`)()}
                  >
                    <Paper
                      className={classes.Paper}
                      style={{
                        backgroundImage: i.profile_path
                          ? `url(${IMAGE_BASE_URL}w185${i.profile_path} )`
                          : `url(${DEFAULT_IMAGE} )`,
                      }}
                    >
                      <Box className={classes.actorItem}>
                        <Typography variant="h5">{i.name}</Typography>
                        <Typography variant="subtitle1">
                          {i.original_name}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
            </>
          )}
        </Grid>
      </Box>
    </>
  );
}

DetailMoive.propTypes = {
  triggerDetailMovie: PropTypes.func,
  detailMoive: PropTypes.any,
  actors: PropTypes.any,
  statusFlags: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  detailMoive: makeSelectDetailMoive(),
  actors: makeSelectActor(),
  statusFlags: makeSelectStatusFlags(),
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
