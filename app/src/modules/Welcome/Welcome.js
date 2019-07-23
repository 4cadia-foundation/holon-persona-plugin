import React, { Component } from 'react'
import { Button, Grid, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import * as WalletActions from "../../redux/actions/wallet";

import './Welcome.css';
import logo from '../../../images/logo.png';
// import Wallet from '../../../scripts/core/WalletStorage';
// const wallet = new Wallet();

class Welcome extends Component {

  constructor(props) {
    super(props);
    // wallet.clearStorage();
  }

  componentDidMount() {
    this.props.hasWallet();
  }

  render() {

    if (this.props.wallet.hasWallet) {
      console.log('WalletPassword/render/wallet', this.props.wallet);
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
            <h3 className="Title">Welcome to Holon</h3>
          </Row>
        </header>
        <section>
          <Row className="text-center">
            <p className="subtitle">Connecting you to the Decentralized Web. <br /> We're happy to see you.</p>
          </Row>
        </section>
        <footer>
          <Row className="text-center">
            <Button bsStyle="warning" block className="welcomeButton" onClick={() => this.props.history.push('/choosecreateorimport')}>Get started</Button>
          </Row>
        </footer>
      </Grid>
    );
  }

}

const mapStateToProps = state => ({
  wallet: state.wallet
});

const mapDispatchToProps = dispatch => bindActionCreators(WalletActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

