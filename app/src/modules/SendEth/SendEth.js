import React, { Component } from 'react'
import { Button, Grid } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as WalletActions from "../../redux/actions/wallet";

// import Loader from '../Loader/Loader';
import './SendEth.css';


class SendEth extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.hasWallet();
  }

  render() {
    return (
      <Grid className="margin-top-30">
          <h3 className="text-center title">Send ETH</h3>
          <div className="rowSend">
                <p className="paragraph">To</p>
                <div className="boxWallet">
                    <p className="paragraph">My Wallet</p>
                    <p className="paragraph">address</p>
                    <p className="paragraph">balance</p>
                </div>
          </div>
          <div className="rowSend">
                <p className="paragraph">From</p>
                <div className="boxWallet">
                    <input className="paragraph" type="text" placeholder="Wallet you will transfer ETH"/>
                </div>
          </div>
          <div className="rowSend">
                <p className="paragraph">Value</p>
                <div className="boxWallet">
                    <input className="paragraph" type="text" placeholder="Value in ETH"/>
                </div>
          </div>
          <div className="rowSend">
                <p className="paragraph">Transaction Fee</p>
                <div className="boxWallet">
                    <input className="paragraph" type="text" placeholder="Value in ETH"/>
                </div>
          </div>
          <div className="rowSend">
                <p className="paragraph">Total</p>
                <div className="boxWallet">
                    <p className="paragraph">Value + Gas fee</p>
                    <p className="paragraph">0,05021 ETH</p>
                </div>
          </div>
          <div className="send-btn">
                <Link to="/sendeth"><Button className="paragraph" bsStyle="warning" bsSize="large">Cancel</Button></Link>
                <Button className="paragraph" bsStyle="warning" bsSize="large">Confirm</Button>
            </div>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  wallet: state.wallet
});

const mapDispatchToProps = dispatch => bindActionCreators(WalletActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SendEth);

