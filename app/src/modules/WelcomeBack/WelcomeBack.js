import React, { Component } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as WalletActions from "../../redux/actions/wallet";
import { bindActionCreators } from 'redux';

class WelcomeBack extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
          password: ""
        };        
    }

    handleClick(event){
        event.preventDefault();
        this.props.openWallet(this.state.password);
    }

    validateForm() {
        return this.state.password.length > 7;
    }

    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
    }


  render () {
    if (this.props.wallet.address.length > 2) {
        console.log('WelcomeBack/render/address', this.props.wallet.address);
        return (
          <Redirect to="/createidentity" />
        );
    }

    return (
        <div>
            <div>
                <img src="images/icon-128.png" className="center-block" alt="Holon"/>
            </div>
            <br/>
            <Form>
                <div>
                    <h2 align="center" >Welcome Back</h2>
                    <p align="center"> The decentralized web waits for you </p>
                </div>
                <br/>
                <label>Password</label>
                <FormControl 
                    id="password" 
                    type="password" 
                    value={this.state.password}
                    placeholder="Password" 
                    onChange={this.handleChange}
                />
                <Button disabled={!this.validateForm()} className="btn btn-block btn-primary pull-right"  type="submit" onClick={this.handleClick}>
                    LOG IN
                </Button>    
                <p align="center">Forgot your password? <a href="#"><u>Import</u></a>  using your phrase</p>            
            </Form>

        </div>
    );
  }

}

const mapStateToProps = state => ({
    wallet: state.wallet
  });
  
const mapDispatchToProps = dispatch => bindActionCreators(WalletActions, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(WelcomeBack);
