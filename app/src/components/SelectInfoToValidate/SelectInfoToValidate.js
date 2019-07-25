import React, { Component } from 'react';
import './SelectInfoToValidate.css';

class SelectInfoToValidate extends Component {

  constructor(props){
    super(props);
    this.state = {
      personalInfo: []
    }
  } 

  componentDidMount() {
    this.setState({
      personalInfo: this.props.personalInfo
    })
    //console.log(this.state)
  }

  render () {
    let optionTemplate = this.state.personalInfo.map(v => (
        <option key={v.key} value={v.field}>{v.field}</option>
      ));
    return (
        <section>
            <label>Select Information to Validate</label>
            <div className="dropdown">
               <select value={this.state.value} id="categoryId">
                   {optionTemplate}
               </select>
            </div>                
        </section>
    )
  }

}

export default SelectInfoToValidate;