import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Carousel, Button, Grid, Row } from 'react-bootstrap';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as WalletActions from "../../redux/actions/wallet";

import Wallet from '../../../scripts/core/WalletStorage';
import Settings from '../../../config/settings';
import checked from '../../../images/checked.png';
import id from '../../../images/id.png';
import validate from '../../../images/validate.png';
import './Welcome.css';

const wallet = new Wallet();

class Welcome extends Component {
  constructor(props) {
    super(props);
    if (Settings.clearStorage) {
      wallet.clearStorage();
    }

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null
    };
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  componentDidMount() {
   this.props.hasWallet();
  }
  
    render() {
      if (this.props.wallet.hasWallet) {
        return (
          <Redirect to="/welcomeback" />
        );
      }

      const { index, direction } = this.state;
  
      return (
        <Grid className="containerPrincipal">
          <Carousel
            activeIndex={index}
            direction={direction}
            onSelect={this.handleSelect}
          >
            <Carousel.Item>
              <img alt="identity" src={id} />
              <Carousel.Caption>
                <h2 className="title text-introduction margin-top-80">Welcome to Holon</h2>
                <p className="paragraph text-introduction margin-top-10">Connecting you to the Decentralized Web.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img alt="checked" src={checked} />
              <Carousel.Caption>
                <h3 className="title text-introduction margin-top-80">Holon is decentralized, so your data is save on Blockchain</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img alt="validate" src={validate} />
              <Carousel.Caption>
                <h3 className="title text-introduction margin-top-80">Validate your data for your safety</h3>
              </Carousel.Caption >
              <Row>
                <Button bsStyle="warning" bsSize="large" block className="paragraph" onClick={() => this.props.history.push('/choosecreateorimport')}>Get started</Button>
              </Row>
            </Carousel.Item>
          </Carousel>
        </Grid>
      );
  }
}
  
const mapStateToProps = state => ({
  wallet: state.wallet
});

const mapDispatchToProps = dispatch => bindActionCreators(WalletActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);