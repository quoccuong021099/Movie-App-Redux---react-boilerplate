import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Logo from '../Logo';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#000',
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  text: {
    marginTop: '30px !important',
    color: '#fff',
  },
}));
function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Logo />
      <Typography className={classes.text} variant="h5">
        Chương trình truyền hình, phim không giới hạn và nhiều nội dung khác.
      </Typography>
    </div>
  );
}

Footer.propTypes = {};

export default Footer;
