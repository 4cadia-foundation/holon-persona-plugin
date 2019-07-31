import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as PersonaActions from "../../redux/actions/persona";

import Loader from '../../components/Loader/Loader';
import CloseIconPage from '../../components/CloseIconPage/CloseIconPage';

import './SendEth.css';

class SendEth extends Component {

  constructor(props) {
    super(props);
    this.hideAddress = this.hideAddress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      balance: 0,
      address: null,
      sendValue: "",
      sendTo: "",
      isRunning: true,
      sentToAction: false
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
    if (adrs.length > 30) {
        return (adrs.substring(0, 30) + "...")
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

  handleClick(event) {
    event.preventDefault();
    this.setState({
      isRunning: true,
      sentToAction: true
    })
    this.props.sendEthers(this.state.sendTo, this.state.sendValue)
  }

  render() {
    if (this.state.sentToAction && !this.state.isRunning) {
      return (
          <Redirect to='/menu' />
      )
    }
    return (
      <section>
        <div className="btn-add-close">
            <CloseIconPage destination="/menu"/>
        </div>
        <h3 className="text-center title margin-bottom-30">Send ETH</h3>
        <div className="rowSend">
          <p className="p-send paragraph">From</p>
          <div className="boxWallet">
            <p className="margin-top-10 paragraph">My Wallet</p>
            <p className="paragraph">{this.hideAddress(this.state.address)}</p>
            <p className="paragraph">{this.state.balance} ETH</p>
          </div>
        </div>
        <div className="rowSend">
          <p className="p-send paragraph">To</p>
          <input className="inputSend paragraph text-center" id="sendTo" type="text" onChange={this.handleChange} placeholder="Insert wallet"/>
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
            <p className="paragraph">{this.state.sendValue} ETH</p>
          </div>
        </div>
        <div className="margin-top-50 send-btn">
              <Link to="/menu"><Button className="paragraph" bsStyle="warning">Cancel</Button></Link>
              <Button className="paragraph" bsStyle="warning" onClick={this.handleClick}>Confirm</Button>
        </div>
        <Loader message="Sending your ethers 💸" visible={this.state.isRunning} />
      </section>
    );
  }
}

const mapStateToProps = reduxState => ({
  persona: reduxState.persona
});

const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions,dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SendEth);

