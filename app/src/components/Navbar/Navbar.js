import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Navbar.css';


class Navbar extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const enableMenu = this.props.enableNavBar ? 'show' : 'hide';
    return (
      <nav className="navbar" className={enableMenu}>

      </nav>
    );
  }
}

export default withRouter(
  connect(
    (state) => ({ enableNavBar: state.enableNavBar }),
  )(Navbar),
);
