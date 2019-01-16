import React from 'react';
import PropTypes from 'prop-types';

class Callback extends React.Component {
  componentDidMount() {
    const { location, auth } = this.props;

    if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication();
    } else {
      throw new Error('Invalid callback URL.');
    }
  }

  render() {
    return (
      <div>Loggin in...</div>
    );
  }
}

Callback.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
  }).isRequired,
  auth: PropTypes.shape({
    auth: PropTypes.func,
  }).isRequired,
};

export default Callback;
