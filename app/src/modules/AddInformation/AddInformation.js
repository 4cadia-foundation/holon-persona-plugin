import React, { Component } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PersonaActions from '../../redux/actions/persona';

import CloseIconPage from '../../components/CloseIconPage/CloseIconPage';
import DataCategory from '../../components/DataCategory/DataCategory';
import DataSubCategory from '../../components/DataSubCategory/DataSubCategory';
import Loader from '../../components/Loader/Loader';
import './AddInformation.css';

import Category from '../../components/Category/Category';

class AddInformation extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.setSubCategory = this.setSubCategory.bind(this);
    this.state = {
      category: '',
      subCategory: '',
      info: '',
      cost: 0,
      isLoading: true,
      executed: false,
      saveButtonCalled: false,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.persona.error.length > 2) {
      const msg = `Erro: ${nextProps.persona.error}`;
      console.error('getDerivedStateFromProps: ', msg);
      return { isLoading: false };
    }
    // console.log('getDerivedStateFromProps nextProps', nextProps.persona);
    // console.log('getDerivedStateFromProps prevState', prevState);
    if (nextProps.persona.isRunning !== prevState.isLoading && prevState.saveButtonCalled) {
      return { isLoading: nextProps.persona.isRunning, executed: true };
    }
    return null;
  }

  handleClick(event) {
    event.preventDefault();
    const infoCode = this.state.category;
    const field = this.state.subCategory;
    const data = this.state.info;
    const price = this.state.cost;
    this.setState({
      isLoading: true,
      saveButtonCalled: true,
    });
    this.props.addData(infoCode, field, data, price);
  }

  validateForm() {
    return this.state.info.length > 1;
  }

    handleChange = (event) => {
      this.setState({
        [event.target.id]: event.target.value,
      });
    }

    setCategory(cat) {
      this.setState({ category: cat });
    }

    setSubCategory(subCat) {
      this.setState({ subCategory: subCat });
    }

    render() {
      // console.log('render props', this.props)
      // console.log('render state', this.state)
      if (this.state.executed) {
        return (
                <Redirect to='/home' />
        );
      }
      return (
            <div>
                <div className="btn-add-close">
                    <CloseIconPage destination="/menu"/>
                </div>
                <Form>
                    <div className="margin-top-10">
                        <h3 id="title-add" className="title" align="center">Add Information</h3>
                    </div>
                    <br />
                    <div>
                        {/* <DataCategory emitCategory={this.setCategory} /> */}
                        <Category emitCategory={this.setCategory} emitSubCategory={this.setSubCategory}/>
                    </div>
                    <br />
                    <div>
                        {/* <DataSubCategory emitSubCategory={this.setSubCategory} /> */}
                    </div>
                    <br />
                    <label className="paragraph label-add">Insert your info here</label>
                    <FormControl
                        id="info"
                        type="text"
                        value={this.state.info}
                        placeholder="Information"
                        onChange={this.handleChange}
                    />
                    <br />
                    <label className="paragraph label-add">How much do you want to get for this information?</label>
                    <FormControl
                        id="cost"
                        type="text"
                        value={this.state.cost}
                        placeholder="Value in wei"
                        onChange={this.handleChange}
                        className="paragraph"
                        />
                    <br />
                    <Button disabled={!this.validateForm()} bsSize="large" id="btn-add-save" className="btn-block btn-warning paragraph" type="submit" onClick={this.handleClick}>
                        Save
                    </Button>
                </Form>
                <Loader message="Adding identity info" visible={this.state.isLoading} />
            </div>
      );
    }
}

const mapStateToProps = (state) => ({
  persona: state.persona,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(PersonaActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddInformation);