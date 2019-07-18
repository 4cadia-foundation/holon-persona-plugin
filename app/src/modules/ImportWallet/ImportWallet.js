import React, { Component } from 'react'
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button, Form, HelpBlock } from 'react-bootstrap';

import * as WalletActions from "../../redux/actions/wallet";

import {connect} from "react-redux";
import { bindActionCreators } from 'redux';

class ImportWallet extends Component {

  constructor(props) {
      super(props);

      this.state = {
        phrase: '',
        password: '',
        confirm: '',
        accounts: []
      };


      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.getValidationPassword = this.getValidationPassword.bind(this);
      this.getValidationEqualPassword = this.getValidationEqualPassword.bind(this);
  }


  /**
   * @method getDerivedStateFromProps
   * @description getDerivedStateFromProps this is method of live cycle react for detect modifications in props
   **/
  static getDerivedStateFromProps(props, state){
    if (props.accounts !== state.accounts){
      return {
        phrase: '',
        password: '',
        confirm: '',
        accounts: props.accounts
      };
    }
   return null;
  }

  /**
   * @method handleSubmit
   * @description submit for restore account with mnemonic and password
   **/
  handleSubmit (event) {
    event.preventDefault();
    const mnemonic = this.state.phrase;
    const password = this.state.password;
    this.props.restoreVault(mnemonic, password);
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
      case (length > 10):
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
    if (password !== confirm && password.length > 8){
      return 'error';
    }
    return null;
  }


  render () {
      return (
          <Grid>
              <Row>
                  <Col xs={12} md={12}>
                      <div className="text-center">
                          <h3>Import your Wallet</h3>
                      </div>
                  </Col>
              </Row>

            <Row>
              <Col xs={12} md={12}>

                <Form>

                  <FormGroup className="margin-top-50" >
                      <ControlLabel>Wallet Seed</ControlLabel>
                      <FormControl rows="7" componentClass="textarea" placeholder="Insert your seed phrase" value={ this.state.phrase } onChange={event => this.handleChange(event, 'phrase')}/>
                  </FormGroup>

                  <FormGroup className="margin-top-30" validationState={this.getValidationPassword()}>
                      <ControlLabel>New Password</ControlLabel>
                      <FormControl componentClass="input" type="password" value={ this.state.password } onChange={event => this.handleChange(event, 'password')}/>

                      <FormControl.Feedback />
                      <HelpBlock>Minimum validation of 8 characters</HelpBlock>

                  </FormGroup>

                  <FormGroup className="margin-top-30"  validationState={this.getValidationEqualPassword()}>
                      <ControlLabel>Confirm Password</ControlLabel>
                      <FormControl componentClass="input" type="password" value={ this.state.confirm } onChange={event => this.handleChange(event, 'confirm')} />

                      <FormControl.Feedback />
                      <HelpBlock>Password must be the same as field confirm</HelpBlock>

                  </FormGroup>

                  <Button className="margin-top-50" bsSize="large" onClick={this.handleSubmit} block bsStyle="warning">Import</Button>
                </Form>

              </Col>
            </Row>

          </Grid>
          );
    }
}



const mapStateToProps = state => ({
  accounts: state.wallet.accounts
});

const mapDispatchToProps = dispatch => bindActionCreators(WalletActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ImportWallet);
