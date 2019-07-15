import React, { Component } from 'react';
import './Menu.css';

class Menu extends Component {

  render () {

    return (
        <section>
            <input id="menu-hamburguer" type="checkbox"/>
            <label for="menu-hamburguer">
                <div class="menu">
                    <span class="hamburguer"></span>
                </div>
            </label>
        </section>
    )
  }

}

export default Menu;
