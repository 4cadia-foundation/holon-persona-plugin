import React, { Component } from 'react';
// eslint-disable-next-line object-curly-newline
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button, Form, HelpBlock } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as WalletActions from '../../redux/actions/wallet';

// import './ImportWallet';
import Loader from '../../components/Loader/Loader';

class ImportWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phrase: '',
      password: '',
      confirm: '',
      accounts: [],
      isRunning: true,
      msg: 'Importing your wallet',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getValidationPassword = this.getValidationPassword.bind(this);
    this.getValidationEqualPassword = this.getValidationEqualPassword.bind(this);
    this.getValidationPhrase = this.getValidationPhrase.bind(this);
  }


  /**
   * @method getDerivedStateFromProps
   * @description getDerivedStateFromProps this is method of live cycle react for detect
   * modifications in props */
  static getDerivedStateFromProps(props, state) {
    if (props.accounts !== state.accounts) {
      return {
        phrase: '',
        password: '',
        confirm: '',
        accounts: props.accounts,
        isRunning: false,
      };
    }
    return null;
  }

  /**
   * @method handleSubmit
   * @description submit for restore account with mnemonic and password
   * */
  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      isRunning: true,
    });
    const mnemonic = this.state.phrase;
    const { password } = this.state;
    this.props.restoreVault(mnemonic, password);
  }


  /**
  * @method handleChange
  * @description handle change in form input
  * */
  handleChange(event, field) {
    const obj = {};
    obj[field] = event.target.value;
    this.setState(obj);
  }

  /**
   * @method getValidationPassword
   * @description Validate the minimum password length
   * @return [String] success, warning, error
   * */
  getValidationPassword() {
    const { length } = this.state.password;
    let statusLengthPassword = null;
    if (length >= 8) {
      statusLengthPassword = 'success';
    }
    if (length > 5) {
      statusLengthPassword = 'warning';
    }
    if (length > 0) {
      statusLengthPassword = 'error';
    }
    return statusLengthPassword;
  }


  /**
   * @method getValidationEqualPassword
   * @description Validates if passwords are equal
   * @return [String, Null] error
   * */
  getValidationEqualPassword() {
    const { password, confirm } = this.state;
    let statusEqualPassword = null;
    if (password !== confirm && password.length > 0) {
      statusEqualPassword = 'error';
    }
    if (password === confirm && password.length > 0) {
      statusEqualPassword = 'success';
    }
    return statusEqualPassword;
  }

  getValidationPhrase() {
    const { phrase } = this.state;
    const words = (phrase.length > 0) ? phrase.split(' ') : '';
    let statusValidationPhrase = null;
    if ((words.length > 0 && words.length < 12) || words.length > 12) {
      statusValidationPhrase = 'error';
    }
    if (words.length === 12) {
      statusValidationPhrase = 'success';
    }
    return statusValidationPhrase;
  }

  render() {
    if (this.props.wallet.address.length > 2) {
      // console.log('ImportWallet/render/address', this.props.wallet.address);
      return (
        <Redirect to="/choosecreateidentityorhome" />
      );
    }

    return (
      <div>
        <Grid>
          <Row>
            <div className="text-center">
              <h3 className="title">Import your Wallet</h3>
            </div>
          </Row>
          <Row>
            <div className="text-center">
              &nbsp;
            </div>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <Form>
                <FormGroup validationState={this.getValidationPhrase()}>
                    <ControlLabel className="paragraph">Wallet Seed</ControlLabel>
                    <FormControl className="paragraph" rows="7" componentClass="textarea" placeholder="Insert your seed phrase" value={ this.state.phrase } onChange={(event) => this.handleChange(event, 'phrase')}/>
                    <FormControl.Feedback />
                    <HelpBlock className="paragraph">Seed phrases are 12 words long</HelpBlock>
                </FormGroup>

                <FormGroup validationState={this.getValidationPassword()}>
                    <ControlLabel className="paragraph">New Password</ControlLabel>
                    <FormControl componentClass="input" type="password" value={ this.state.password } onChange={(event) => this.handleChange(event, 'password')}/>

                    <FormControl.Feedback />
                    <HelpBlock className="paragraph">Minimum validation of 8 characters</HelpBlock>
                </FormGroup>

                <FormGroup validationState={this.getValidationEqualPassword()}>
                    <ControlLabel className="paragraph">Confirm Password</ControlLabel>
                    <FormControl componentClass="input" type="password" value={ this.state.confirm } onChange={(event) => this.handleChange(event, 'confirm')} />

                    <FormControl.Feedback />
                    <HelpBlock className="paragraph">Password must be the same as field confirm</HelpBlock>
                </FormGroup>

                <Button className="paragraph" bsSize="large" onClick={this.handleSubmit} block bsStyle="warning">Import</Button>
              </Form>

            </Col>
          </Row>
        </Grid>
        <Loader visible={this.state.isRunning} message={this.state.msg} />
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(WalletActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ImportWallet);
