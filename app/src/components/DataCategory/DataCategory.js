import React, { Component } from 'react';
import { Dropdown, DropdownButton, MenuItem } from 'react-bootstrap';
import './DataCategory.css';

class DataCategory extends Component {

  constructor(props) {
    super(props);
    this.setCategory = this.setCategory.bind(this);
    this.state = {
      values: [
        {
          key: "1",
          value: 1,
          text: 'Personal Data'
        },
        {
          key: "2",
          value: 2,
          text: 'Professional Data'
        },
        {
          key: "3",
          value: 3,
          text: 'Financial Data'
        },
        {
          key: "4",
          value: 4,
          text: 'Social Data',
        },
        {
          key: "5",
          value: 5,
          text: 'Others'
        }
      ]
    }


  }
  setCategory(category) {
    this.props.emitCategory(category);
  }
  render() {
    let optionTemplate = this.state.values.map(v => (
      <option key={v.key} onClick={this.setCategory(v.text)} value={v.value}>{v.text}</option>
    ));
    return (
      <section>
        <label>Category</label>
        <div className="dropdown">
          <select value={this.state.value} id="categoryId">
            {optionTemplate}
          </select>
        </div>
      </section>
    )
  }

}

export default DataCategory;



