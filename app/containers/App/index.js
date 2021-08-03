import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import DetailMoive from '../DetailMoive';
import HomeMovie from '../HomeMovie/Loadable';
const useStyles = makeStyles(() => ({
  container: {
    maxWidth: '1890px',
    minHeight: '100vh',
  },
  header: {
    maxWidth: '100%',
  },
}));
export default function App() {
  const classes = useStyles();
  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Switch>
          <Route exact path="/" component={HomeMovie} />
          <Route path="/:id" component={DetailMoive} />
        </Switch>
      </Container>
      <Footer />
    </>
  );
}
