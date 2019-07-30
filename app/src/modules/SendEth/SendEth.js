import React, { Component } from 'react'
import { Button, Grid } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as PersonaActions from "../../redux/actions/persona";

// import Loader from '../Loader/Loader';
import './SendEth.css';

class SendEth extends Component {

  constructor(props) {
    super(props);
    this.hideAddress = this.hideAddress.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    this.state = {
      balance: 0,
      address: null,
      sendValue: "",
      sendFrom: "",
      isRunning: true,
    }
    this.props.getBalance();      
  }

  componentDidMount() {  
    this.setState({
      balance: this.props.persona.balance,
      address: this.props.persona.address,
      isRunning: false,
    })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    //console.log('WalletPassword/getDerivedStateFromProps nextProps', nextProps.persona);
    //console.log('WalletPassword/getDerivedStateFromProps prevState', prevState);
    if (nextProps.persona.error.length>2) {
        const msg = 'Erro: ' + nextProps.persona.error;
        console.error('Balance/getDerivedStateFromProps: ', msg);
        alert(msg);
        return { balance: 0, address: null};
    }
    return { balance: nextProps.persona.balance, address: nextProps.persona.address, isRunning: nextProps.persona.isRunning };        
  }
  
  hideAddress (adrs) {
    if (adrs.length > 10) {
        return (adrs.substring(0, 10) + "...")
    }
    else {
        return adrs;
    }
  }

  handleChange = event => {
    this.setState({
        [event.target.id]: event.target.value
    });
  }

  render() {
    return (
      <section className="section-send">
          <h3 className="text-center title margin-bottom-50">Send ETH</h3>
          <div className="rowSend">
            <p className="p-send paragraph">To</p>
            <div className="boxWallet">
              <p className="margin-top-10 paragraph">My Wallet</p>
              <p className="paragraph">{this.hideAddress(this.state.address)}</p>
              <p className="paragraph">{this.state.balance} ETH</p>
            </div>
          </div>
          <div className="rowSend">
            <p className="p-send paragraph">From</p>
            <input className="inputSend paragraph text-center" id="sendFrom" type="text" onChange={this.handleChange} placeholder="Insert wallet"/>
          </div>
          <div className="rowSend">
            <p className="p-send paragraph">Value</p>
            <input className="inputSend paragraph text-center" id="sendValue" type="text" onChange={this.handleChange} placeholder="Value in ETH"/>
          </div>
          {/* <div className="rowSend">
            <p className="p-send paragraph">Transaction <br/>Fee</p>
            <input className="inputSend paragraph" type="text" placeholder="Value in ETH"/>
          </div> */}
          <div className="rowSend">
            <p className="p-send paragraph">Total</p>
            <div className="boxWallet">
              <p className="margin-top-10 paragraph">Value + Gas fee</p>
              <p className="paragraph">0,05021 ETH</p>
            </div>
          </div>
          <div className="margin-top-50 send-btn">
                <Link to="/sendeth"><Button className="paragraph" bsStyle="warning">Cancel</Button></Link>
                <Button className="paragraph" bsStyle="warning">Confirm</Button>
            </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  persona: state.persona,
  sendFrom: state.sendFrom,
  sendValue: state.sendValue,
});

const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions,dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SendEth);

