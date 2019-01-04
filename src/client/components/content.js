import React from 'react';
import Loadable from 'react-loadable';
import ReactLoading from 'react-loading';
import {
  Route,
  Switch,
} from 'react-router-dom';
import injectSheet from 'react-jss';
import { Sidebar } from './sidebar';
import { Questions } from '../pages/questions';

const LoadableMe = Loadable({
  loader: () => import(/* webpackChunkName: "me" */ '../pages/me'),
  loading: () => <ReactLoading type="spin" color="#fff" />,
});

const LoadableAbout = Loadable({
  loader: () => import(/* webpackChunkName: "about" */ '../pages/about'),
  loading: () => <ReactLoading type="spin" color="#fff" />,
});

const styles = {
  mainContentArea: {
    display: 'flex',
    flexDirection: 'row',
  },
  mainContentSidebar: {
    width: 200,
    flexGrow: 0,
    borderRight: '1px solid black',
  },
  mainContentPage: {
    width: 200,
    flexGrow: 1,
  },
};

// eslint-disable-next-line react/prefer-stateless-function
class Content extends React.PureComponent {
  render() {
    const { classes } = this.props; //eslint-disable-line
    return (
      <div className={classes.mainContentArea}>
        <div className={classes.mainContentSidebar}>
          <Sidebar />
        </div>
        <div className={classes.mainContentPage}>
          <Switch>
            <Route path="/me" component={LoadableMe} />
            <Route path="/questions" component={Questions} />
            <Route path="/about" component={LoadableAbout} />
          </Switch>
        </div>
      </div>
    );
  }
}

const StyledContent = injectSheet(styles)(Content);

export default StyledContent;
