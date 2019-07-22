import React, { Component } from 'react'
import logo from '../../../images/icon-38.png';
import { Button, Form, FormControl } from 'react-bootstrap';
import DataCategory from '../../components/DataCategory/DataCategory';
import DataSubCategory from '../../components/DataSubCategory/DataSubCategory';
import * as PersonaActions from '../../redux/actions/persona';

import {connect} from "react-redux";
import { bindActionCreators } from 'redux';

class AddInformation extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.setCategory = this.setCategory.bind(this);
        this.setSubCategory = this.setSubCategory.bind(this);
        this.state = {
            category: "",
            subCategory: "",
            info: "",
            cost: ""
        };
    }

    handleClick(event) {
        event.preventDefault();
        const infoCode = this.state.category
        const field = this.state.subCategory
        const data = this.state.info
        const price = this.state.cost
        this.props.addData(infoCode, field, data, price)

    }
    validateForm() {
        return this.state.info.length > 1;
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    setCategory(cat) {
        this.setState({ category: cat });
    }
    setSubCategory(subCat) {
        this.setState({ subCategory: subCat });
    }
    render() {

        return (
            <div>
                <div>
                    <img className="logoHome" src={logo} alt="Logo" />
                </div>
                <hr />
                <Form>
                    <div>
                        <h2 align="center" >Add Information</h2>
                    </div>
                    <br />
                    <div>
                        <DataCategory emitCategory={this.setCategory} />
                    </div>
                    <br />
                    <div>
                        <DataSubCategory emitSubCategory={this.setSubCategory} />
                    </div>
                    <br />
                    <label>Insert your info here</label>
                    <FormControl
                        id="info"
                        type="text"
                        value={this.state.info}
                        placeholder="Information"
                        onChange={this.handleChange}
                    />
                    <br />
                    <label>How much do you want to get for this information?</label>
                    <FormControl
                        id="cost"
                        type="text"
                        value={this.state.cost}
                        placeholder="Value in wei"
                        onChange={this.handleChange}
                    />
                    <br />
                    <Button disabled={!this.validateForm()} className="btn btn-block btn-warning" type="submit" onClick={this.handleClick}>
                        Save
                    </Button>

                </Form>

            </div>
        );
    }

}

const mapStateToProps = state => ({
    infoCode: state.category,
    field: state.subCategory,
    data: state.info,
    price: state.cost
  });
  
  const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddInformation);