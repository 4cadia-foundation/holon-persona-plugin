import React, { Component } from 'react'
import { Button, Grid, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as WalletActions from "../../redux/actions/wallet";

import Loader from '../../components/Loader/Loader';

import logo from '../../../images/logo.png';
import Wallet from '../../../scripts/core/WalletStorage';
import Settings from '../../../config/settings';
import './Welcome.css';

const wallet = new Wallet();

class Welcome extends Component {

  constructor(props) {
    super(props);
    if (Settings.clearStorage) {
      wallet.clearStorage();
    }
    //console.log('Welcome/constructor/props', this.props.persona)   
  }

  componentDidMount() {
    //console.log('Welcome/componentDidMount/props', this.props.persona)   
    this.props.hasWallet();
  }

  render() {
    console.log('Welcome/render/props', this.props.persona, this.props.wallet)  
    // if (this.props.wallet.hasCheckedWalletStorage) {
    if (this.props.persona.hasCheckedPersonaStorage && this.props.wallet.hasCheckedWalletStorage) {
      if (this.props.persona.numberOfFields > 0 && this.props.wallet.hasWallet) {
        return (
          <Redirect to="/home" />
        );
      }
      if (this.props.wallet.hasWallet) {
        //console.log('WalletPassword/render/wallet', this.props.wallet);
        return (
          <Redirect to="/welcomeback" />
        );
      }
      return (
        <Grid className="gridPrincipal">
          <header>
            <Row className="text-center">
              <img className="logo" src={logo} alt="Logo" />
            </Row>
            <Row className="text-center">
              <h3 className="title">Welcome to Holon</h3>
            </Row>
          </header>
          <section>
            <Row className="text-center">
              <p className="paragraph">Connecting you to the Decentralized Web. <br /> We're happy to see you.</p>
            </Row>
          </section>
          <footer>
            <Row className="text-center">
              <Button bsStyle="warning" bsSize="large" block className="welcomeButton paragraph" onClick={() => this.props.history.push('/choosecreateorimport')}>Get started</Button>
            </Row>
          </footer>
        </Grid>
      );
    } else {
      return (
        <Loader visible="true" message="Loading plugin data..." />
      )
    }
  }
}

const mapStateToProps = state => ({
  wallet: state.wallet,
  persona: state.persona,
});
const mapDispatchToProps = dispatch => bindActionCreators(WalletActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

