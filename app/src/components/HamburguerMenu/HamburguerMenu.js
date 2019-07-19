import React, { Component } from 'react';
import './HamburguerMenu.css';

class HamburguerMenu extends Component {

  constructor (props) {
    super(props)
  }

  render () {

    return (
        <section onClick={this.props.fnAbrirMenu()}>
            <input id="menu-hamburguer" type="checkbox" />
            <label for="menu-hamburguer">
                <div class="menu">
                    <span class="hamburguer"></span>
                </div>
            </label>
        </section>
    )
  }

}

export default HamburguerMenu;
