import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Menu from '../../modules/Menu/Menu';
import './HamburguerMenu.css';

class HamburguerMenu extends Component {
  
  constructor (props) {
    super(props)
    this.state = {
      showMenu: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    console.log("fnOpenMenu-Passeiporaqui", event)
    this.setState({
      showMenu: true
    })
  }
  
  render () {
    
    if (this.state.showMenu) {
      return (
       <Redirect to='/menu' />
      )
    }

    return (
        <nav onClick={ this.handleClick }>
          <input id="hamburguer" type="checkbox" />
          <label htmlFor="hamburguer">
            <div className="menu">
              <span className="hamburguer"></span>
            </div>
          </label>
        </nav>
      )
    }
  }
  
  export default HamburguerMenu;
  