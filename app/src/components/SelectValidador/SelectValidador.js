import React, { Component } from 'react';
import './SelectValidador.css';

class SelectValidador extends Component {
  
  constructor(props){
    super(props);
    
    this.state = {
      values: [
        {
          key: "1",
          value: 1,
          text: 'Atlas Quantum'
        },
      ]      
    }
  }
  
  render () {
    let optionTemplate = this.state.values.map(v => (
      <option key={v.key} value={v.value}>{v.text}</option>
      ));
      return (
        <section>
        <label>Select Validador</label>
        <div className="dropdown">
        <select value={this.state.value} id="categoryId">
        {optionTemplate}
        </select>
        </div>                
        </section>
        )
      }
      
    }
    
    export default SelectValidador;