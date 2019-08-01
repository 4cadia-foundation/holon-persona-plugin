import React, { Component } from 'react';

import './SelectValidador.css';

class SelectValidador extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      validators: [
        {
          key: '1',
          address: '0xBe43CD8E7bd3e29f5C7173E7C956a54659B3225f',
          text: 'Yasmin Services'
        },
        {
          key: '2',
          address: '0xD3b424a49f57B1d3163fc1238bA5CAE1f2670aB6',
          text: 'ACME Corp'
        },
      ]      
    }
    this.setValidator = this.setValidator.bind(this);
  }

  componentDidMount() {
    this.props.emitValidator(this.state.validators[0].address)
  }

  setValidator(event) {
    this.props.emitValidator(event.target.value)
  }
  
  render () {
    let optionTemplate = this.state.validators.map(v => (
      <option key={v.key} value={v.address}>{v.text}</option>
    ));
    return (
      <section>
        <label className="paragraph">Select Validador</label>
          <div className="dropdown">
            <select onChange={this.setValidator} className="paragraph" value={this.state.value} id="categoryId">
              {optionTemplate}
            </select>
          </div>                
      </section>
    )
  }
}
    
export default SelectValidador;