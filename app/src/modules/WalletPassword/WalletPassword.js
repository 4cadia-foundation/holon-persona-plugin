import React, { Component } from 'react'
import { Button, Form, FormGroup, FormControl,ControlLabel, HelpBlock } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import * as WalletActions from "../../redux/actions/wallet";
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';

import styles from './WalletPassword.css';
import Loader from '../../components/Loader/Loader';

class WalletPassword extends Component {

  constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
        password: "",
        confirm: "",
        isLoading: true
      };        
  }

  componentDidMount() {
    this.setState({
      isLoading: false
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    //console.log('WalletPassword/getDerivedStateFromProps nextProps', nextProps.persona);
    //console.log('WalletPassword/getDerivedStateFromProps prevState', prevState);
    if (nextProps.wallet.error.length>2) {
        const msg = 'Erro: ' + nextProps.wallet.error;
        console.error('WalletPassword/getDerivedStateFromProps: ', msg);
        alert(msg);
        return { isLoading: false };
    }
    if (nextProps.wallet.address.length > 2) {
        return { isLoading : false };
    }
    return null;
  }

  handleSubmit(event){
    event.preventDefault();
    this.setState({
      isLoading: true
    });
    this.props.createNewWallet(this.state.password);
  }

  validateForm() {
    return this.state.password.length > 7 && this.state.confirm.length > 7;
  }

  /**
   * @method handleChange
   * @description handle change in form input
   * */
  handleChange(event, field){
    let obj = {};
    obj[field] = event.target.value;
    this.setState(obj);
  }
 /**
   * @method getValidationPassword
   * @description Validate the minimum password length
   * @return [String] success, warning, error
   **/
  getValidationPassword(){
    const length = this.state.password.length;
    switch (true) {
      case (length >= 8):
        return 'success';
      break;
      case (length > 5):
        return 'warning';
      break;
      case (length > 0):
          return 'error';
      break;
      default:
        return null;
    }
  }

  /**
   * @method getValidationEqualPassword
   * @description Validates if passwords are equal
   * @return [String, Null] error
   **/
  getValidationEqualPassword(){
    const {password, confirm} = this.state;
    switch (true) {
      case (password !== confirm && password.length > 7):
        return 'error';
      break;
      case (password === confirm && password.length > 7):
        return 'success';
      break;
      default:
        return null;
    }

  }


  render () {
    if (this.props.wallet.address.length > 2) {
      console.log('WalletPassword/render/address', this.props.wallet.address);
      return (
        <Redirect to="/choosecreateidentityorhome" />
      );
    }

    return (
        <div>
          <div>
            <img src="images/icon-128.png" className="rounded center-block" alt="Holon"/>
          </div>
          <Form>
            <div>
                <h2 align="center" >Create Your Wallet</h2>
            </div>
            <FormGroup className="margin-top-10" validationState={this.getValidationPassword()}>
              <ControlLabel>Password</ControlLabel>
              <FormControl componentClass="input" type="password" value={ this.state.password } onChange={event => this.handleChange(event, 'password')}/>

              <FormControl.Feedback />
              <HelpBlock>Minimum validation of 8 characters</HelpBlock>
            </FormGroup>
            <FormGroup className="margin-top-10"  validationState={this.getValidationEqualPassword()}>
              <ControlLabel>Confirm Password</ControlLabel>
              <FormControl componentClass="input" type="password" value={ this.state.confirm } onChange={event => this.handleChange(event, 'confirm')} />

              <FormControl.Feedback />
              <HelpBlock>Password must be the same as field confirm</HelpBlock>
            </FormGroup>
            <Button className="margin-top-5" disabled={!this.validateForm()} onClick={this.handleSubmit} block bsStyle="warning">Submit</Button>
          </Form>
          <Loader visible={this.state.isLoading} />
        </div>
    );
  }
}

const mapStateToProps = state => ({
    wallet: state.wallet
  });
  
const mapDispatchToProps = dispatch => bindActionCreators(WalletActions, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(WalletPassword);

