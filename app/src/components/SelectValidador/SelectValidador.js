import React, { Component } from 'react';

import './SelectValidador.css';

class SelectValidador extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      validators: [
        {
          key: '1',
          address: '0x1c5fBDf725C093c52A8464d226d7cf68c2605Ec0',
          text: 'Atlas Quantum'
        },
      ]      
    };
    this.setValidator = this.setValidator.bind(this);
  }

  componentDidMount() {
    this.props.emitValidator(this.state.validators[0].address);
  }

  setValidator(event) {
    this.props.emitValidator(event.target.value);
  }
  
  render () {
    let optionTemplate = this.state.validators.map(v => 
      <option key={v.key} value={v.address}>{v.text}</option>
    );
    return (
      <section>
        <label className="paragraph">Select Validador</label>
        <div className="dropdown">
          <select onChange={this.setValidator} className="paragraph" value={this.state.value} id="categoryId">
            {optionTemplate}
          </select>
        </div>                
      </section>
    );
  }
}
    
export default SelectValidador;