import React, { Component } from 'react';

import './SelectPersonaInfoFields.css';

class SelectPersonaInfoFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.setField = this.setField.bind(this);
  }

  componentDidMount() {
    // console.log('SelectPersonaInfoFields/personalInfo', this.props.personalInfo)
    this.setState({
      value: this.props.personalInfo[0].field,
    });
    this.props.emitField(this.props.personalInfo[0].field);
  }

  setField(event) {
    this.props.emitField(event.target.value);
    this.setState({
      value: event.target.value,
    });
  }

  render() {
    const optionTemplate = this.props.personalInfo.map((v, index) => (
        <option key={index} value={v.field}>{v.field}</option>
    ));
    return (
        <section>
            <label className="paragraph">Select Information to Validate</label>
            <div className="dropdown">
               <select onChange={this.setField} className="paragraph" value={this.state.value} id="categoryId">
                 {optionTemplate}
               </select>
            </div>
        </section>
    );
  }
}

export default SelectPersonaInfoFields;