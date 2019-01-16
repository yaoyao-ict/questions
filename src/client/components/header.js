import React from 'react';
import PropTypes from 'prop-types';
import img from '../../static-resources/img/brand.png';


function Header({ login, logout, isAuthenticated }) {
  return (
    <nav className="navbar navbar-dark bg-dark bd-navbar">
      <a className="navbar-brand" href="/">
        <img
          src={img}
          width="60"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
        Questions & Answers
      </a>
      <form className="form-inline">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success my-2 my-sm-0" type="button">
          Search
        </button>
      </form>
      {isAuthenticated() ? (
        <div>
          <span className="btn-outline-success">Hello, User Unknown</span>
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="button"
            onClick={logout}
          >
            Log out
          </button>
        </div>
      ) : (
        <form className="form-inline">
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="button"
            onClick={login}
          >
            Log in
          </button>
        </form>
      )}
    </nav>
  );
}

Header.propTypes = {
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.func.isRequired,
};

export default Header;
