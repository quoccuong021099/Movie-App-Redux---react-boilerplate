import { AppBar, Button, makeStyles, Toolbar } from '@material-ui/core';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: '10px',
  },
  appBar: {
    backgroundColor: '#000',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Link to="/" variant="h6" className={classes.title}>
            <Logo />
          </Link>
          <Button color="inherit" variant="outlined">
            Đăng nhập
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {};

export default memo(Header);
