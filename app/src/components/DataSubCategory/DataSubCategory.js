import React, { Component } from 'react';
import { Dropdown, DropdownButton, MenuItem } from 'react-bootstrap';
import './DataSubCategory.css';

class DataSubCategory extends Component {

  constructor(props) {
    super(props);
    this.setSubCategory = this.setSubCategory.bind(this);
    this.state = {
      values: [
        {
          key: "1",
          value: 1,
          text: 'Birth Date',
          category: 1
        },
        {
          key: "2",
          value: 2,
          text: 'RG',
          category: 1
        },
        {
          key: "3",
          value: 3,
          text: 'CPF',
          category: 1
        },
        {
          key: "4",
          value: 4,
          text: 'Gender',
          category: 1
        },
        {
          key: "5",
          value: 5,
          text: 'Address',
          category: 1
        }
      ]
    }
    this.props.emitSubCategory(1);
  }

  setSubCategory(event) {
    this.props.emitSubCategory(event.target.value);
  }

  render() {
    let optionTemplate = this.state.values.map(v => (
      <option key={v.key} value={v.value}>{v.text}</option>
    ));
    return (
      <section>
        <label>Subcategory</label>
        <div className="dropdown">
          <select value={this.state.value} onClick={this.setSubCategory} id="subCategoryId">
            {optionTemplate}
          </select>
        </div>
      </section>
    )
  }

}

export default DataSubCategory;



