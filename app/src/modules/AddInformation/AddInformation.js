import React, { Component } from 'react'
import logo from '../../../images/icon-38.png';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormControl } from 'react-bootstrap';
import DataCategory from '../../components/DataCategory/DataCategory';
import DataSubCategory from '../../components/DataSubCategory/DataSubCategory';
import Loader from '../../components/Loader/Loader';
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
            cost: "",
            isLoading: true,
            executed: false,
            addedNewInfo: false,
            numberOfPersonalInfoRecorded: 0 
        };
    }

    componentDidMount() {
        console.log('componentDidMount setState', this.state.numberOfPersonalInfoRecorded, this.props.persona.personalInfo.length)
        if (this.state.numberOfPersonalInfoRecorded === 0) {
            this.props.getPersonaData();
            return;
        }
        if (!this.props.persona) {
            this.props.getPersonaData();
            return;
        }
        this.setState ({
            numberOfPersonalInfoRecorded: this.props.persona.personalInfo.length,
            isLoading: false
        })
    }

    componentWillReceiveProps(propsOld) {
        if (propsOld.persona.personalInfo.length === 0) {
            this.setState ({
                isLoading: true,
                executed: false
            })
            return;
        } else {
            this.setState ({
                numberOfPersonalInfoRecorded: propsOld.persona.personalInfo.length
            }) 
            this.state.numberOfPersonalInfoRecorded = propsOld.persona.personalInfo.length
            console.log('componentWillReceiveProps setState', this.state.numberOfPersonalInfoRecorded, propsOld.persona.personalInfo.length)    
        }
        console.log('componentWillReceiveProps propsOld', this.state.numberOfPersonalInfoRecorded, propsOld.persona.personalInfo.length)
        if (propsOld.persona.personalInfo.length > this.state.numberOfPersonalInfoRecorded) {
            if (this.state.addedNewInfo) {
                this.setState({
                    isLoading: false,
                    executed: true,
                    numberOfPersonalInfoRecorded: this.props.persona.personalInfo.length
                })
            } else {
                this.setState ({
                    isLoading: false,
                    executed: false,
                    numberOfPersonalInfoRecorded: this.props.persona.personalInfo.length
                })
            }
        }
    }

    handleClick(event) {
        event.preventDefault();
        const infoCode = this.state.category
        const field = this.state.subCategory
        const data = this.state.info
        const price = this.state.cost
        this.setState({ 
            isLoading: true,
            executed: false
        })
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
        //console.log('render props', this.props)
        console.log('render state', this.state)
        if (this.state.executed) {
            return (
                <Redirect to='/home' /> 
            )
        }
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
                <Loader visible={this.state.isLoading} />
            </div>
        );
    }

}

const mapStateToProps = state => ({
    persona: state.persona
});
  
const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddInformation);