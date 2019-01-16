/* eslint no-console: 0 no-alert: 0 */
import auth0 from 'auth0-js';

const clientId = 'Ydrxek0G1LysaYo4u77Zfq4Y2ADBJLfg';

export default class Auth {
  constructor(history) {
    this.auth0 = new auth0.WebAuth({
      domain: 'ask-question-dev.auth0.com',
      clientID: clientId,
      redirectUri: 'http://localhost:9999/callback',
      responseType: 'token id_token',
      scope: 'openid',
    });
    this.history = history;
  }

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }

      this.history.replace('/');
    });
  };

  setSession = (authResult) => {
    // Set the time that the access token will expire at
    const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  };

  renewSession = () => {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
        alert(
          `Could not get a new token (${err.error}: ${err.error_description}).`,
        );
      }
    });
  };

  logout = () => {
    // Remove tokens and expiry time
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    this.auth0.logout({
      clientID: clientId,
      returnTo: 'http://localhost:9999',
    });
  };

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  };
}
