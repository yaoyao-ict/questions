import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Switch, Route } from 'react-router-dom';
import Callback from './callback';
import Header from './header';
import Content from './content';
import Auth from './auth';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(props.history);
  }

  render() {
    return (
      <div id="app-container">
        <Switch>
          <Route exact path="/">
            <Redirect to="/questions" />
          </Route>
        </Switch>
        <Route
          path="/callback"
          render={props => (
            <Callback
              auth={this.auth}
              {...props}
            />
          )}
        />
        <Route
          render={props => (
            <Header
              login={this.auth.login}
              logout={this.auth.logout}
              isAuthenticated={this.auth.isAuthenticated}
              {...props}
            />
          )}
        />
        <Route component={Content} />
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default App;
