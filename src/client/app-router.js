import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';
import { Header } from './components/header';
import Content from './components/content';

const AppRouter = () => (
  <Router>
    <div id="app-container">
      <Switch>
        <Route exact path="/">
          <Redirect to="/questions" />
        </Route>
      </Switch>
      <Header />
      <Route component={Content} />
    </div>
  </Router>
);

export default AppRouter;
