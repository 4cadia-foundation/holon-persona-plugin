import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './HamburguerMenu.css';

class HamburguerMenu extends Component {
  
  constructor (props) {
    super(props);
    this.state = {
      showMenu: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState({
      showMenu: true
    });
  }
  
  render () {
    
    if (this.state.showMenu) {
      return (
        <Redirect to='/menu' />
      );
    }
      
    return (
      <nav className="nav-toggle" onClick={ this.handleClick }>
        <label htmlFor="navicon" className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </nav>
    );
  }
}
    
export default HamburguerMenu;
    