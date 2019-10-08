import React, { Component } from 'react';
import './DataCategory.css';

class DataCategory extends Component {
  constructor(props) {
    super(props);
    this.setCategory = this.setCategory.bind(this);
    this.state = {
      values: [
        {
          key: '1',
          value: 1,
          text: 'Personal Data',
        },
        {
          key: '2',
          value: 2,
          text: 'Professional Data',
        },
        {
          key: '3',
          value: 3,
          text: 'Financial Data',
        },
      ],
    };
    this.props.emitCategory(1);
  }

  setCategory(event) {
    this.props.emitCategory(event.target.value);
  }

  render() {
    const optionTemplate = this.state.values.map((v) => (
      <option key={v.key} value={v.value}>{v.text}</option>
    ));
    return (
      <section>
        <label>Category</label>
        <div className="dropdown">
          <select value={this.state.value} onChange={this.setCategory} id="categoryId">
            {optionTemplate}
          </select>
        </div>
      </section>
    );
  }
}

export default DataCategory;
