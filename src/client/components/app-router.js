import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './app';

const AppRouter = () => (
  <Router>
    <Route component={App} />
  </Router>
);

export default AppRouter;
