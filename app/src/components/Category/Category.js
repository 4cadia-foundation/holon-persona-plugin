import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './Category.css';

class Category extends Component {
  constructor(props) {
    super(props);
    this.setCategory = this.setCategory.bind(this);
    this.setSubCategory = this.setSubCategory.bind(this);
    this.state = {
      value: undefined,
      loading: false,
      selectedCategory: 1,
      category: {
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
      },
      subCategory: {
        values: [
          {
            key: '1',
            value: 1,
            text: 'Birth Date',
            category: 1,
          },
          {
            key: '2',
            value: 2,
            text: 'RG',
            category: 1,
          },
          {
            key: '3',
            value: 3,
            text: 'CPF',
            category: 1,
          },
          {
            key: '4',
            value: 4,
            text: 'Gender',
            category: 1,
          },
          {
            key: '5',
            value: 5,
            text: 'Address',
            category: 1,
          },
          {
            key: '6',
            value: 6,
            text: 'Profession',
            category: 2,
          },
          {
            key: '7',
            value: 7,
            text: 'Company',
            category: 2,
          },
          {
            key: '8',
            value: 8,
            text: 'Occupation',
            category: 2,
          },
          {
            key: '9',
            value: 9,
            text: 'Annual income',
            category: 3,
          },
          {
            key: '9',
            value: 9,
            text: 'Bank reference',
            category: 3,
          },
        ],
      },


    };
    this.props.emitCategory(1);
  }

  onFirstSelect = (e) => {
    const { value } = e.target;
    this.setState(
      {
        loading: true,
        value,
      },
      // call the api and
      () => {
        this.setState({
          loading: false,
          selectedCategory: value,
        });
      },
    );
  };

  setCategory(event) {
    this.props.emitCategory(event.target.value);
    console.log('DataCategory/setcategory/Category....:', event.target.value);
    this.setState({
      category: event.target.value,
    });
  }

  setSubCategory(event) {
    const index = event.target.selectedIndex;
    this.props.emitSubCategory(event.target[index].text);
  }

  render() {
    const optionTemplate = this.state.category.values.map((v) => (
        <option key={v.key} value={v.value}>{v.text}</option>
    ));
    const optionTemplateSC = this.state.subCategory.values.map((v) => (
        <option key={v.key} value={v.value}>{v.text}</option>
    ));
    return (
      !this.state.loading && (
        <section>
            <label>Category</label>
            <div className="dropdown">
                <select onChange={this.onFirstSelect} defaultValue={this.state.value} id="categoryId">
                    {optionTemplate }
                </select>
                {/* <select value={this.state.value} onChange={this.setCategory} id="categoryId">
                    {optionTemplate}
                </select>                 */}
            </div>
            <br />
            <label>Subcategory</label>
            <div className="dropdown">
                <select id="subCategoryId" onChange={this.setSubCategory} onClick={this.setSubCategory}>
                    {/* {this.state.count.map(d => <option value={d}>{d}</option>)} */}
                    {this.state.subCategory.values.filter((f) => f.category == this.state.selectedCategory).map((v) => (
                        <option key={v.key} value={v.value}>{v.text}</option>
                    ))}
                </select>
            </div>
        </section>
      )
    );
  }
}
export default Category;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
