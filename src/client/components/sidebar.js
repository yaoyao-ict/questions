import React from 'react';
import { NavLink } from 'react-router-dom';

export const Sidebar = () => (
  <nav className="nav flex-column">
    <NavLink to="questions" activeClassName="active">Questions</NavLink>
    <NavLink to="me" activeClassName="active">Me</NavLink>
    <NavLink to="about" activeClassName="active">About</NavLink>
  </nav>
);
