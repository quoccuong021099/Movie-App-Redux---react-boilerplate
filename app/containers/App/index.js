import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Details from '../Details/Loadable';
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
          <Route exact path="/details" component={Details} />
        </Switch>
      </Container>
      <Footer />
    </>
  );
}
