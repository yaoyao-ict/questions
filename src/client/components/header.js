import React from 'react';

export const Header = () => (
  <nav className="navbar navbar-dark bg-dark bd-navbar">
    <a className="navbar-brand" href="/">
      <img src="../../static-resources/img/brand.png" width="60" height="30" className="d-inline-block align-top" alt="" />
      Questions & Answers
    </a>
    <form className="form-inline">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
      <button className="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>
    </form>
  </nav>
);
