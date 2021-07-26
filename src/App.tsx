import React, { useState } from 'react';
import { RootState } from "./index";
import Navbar from './components/Navbar';
import Notes from './components/Notes';
import LoginPage from './components/LoginPage';
import { connect } from "react-redux";
import {
  BrowserRouter as Router, Switch,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const App = (props: Props) => {
  const user = props.user
  const redirectToLoginPage = () => <Redirect to={`/login?redirect=${props.router.location.pathname}`} />

  return (
    <>
      <Navbar />
      <div className="container">
        <Route exact path="/" render={() => user ? <Notes /> : redirectToLoginPage()} />
        <Route exact path="/login" render={() => <LoginPage />} />
      </div>
    </>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    user: state.user,
    router: state.router
  };
};
const mapDispatchToProps = {};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default withRouter(ConnectedApp);
