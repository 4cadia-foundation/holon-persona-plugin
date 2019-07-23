import React, { Component } from 'react';
import './HamburguerMenu.css';

class HamburguerMenu extends Component {
  
  constructor (props) {
    super(props)
  }
  
  render () {
    return (
      <div onClick={this.props.fnOPenMenu}>
        <input id="hamburguer" type="checkbox" />
        <label for="hamburguer">
          <div class="menu">
            <span class="hamburguer"></span>
          </div>
        </label>
      </div>
      )
    }
  }
  
export default HamburguerMenu;
  