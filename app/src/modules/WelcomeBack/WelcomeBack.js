import React, { Component } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import * as WalletActions from "../../redux/actions/wallet";
import { bindActionCreators } from 'redux';
import Loader from '../../components/Loader/Loader';

class WelcomeBack extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
          password: "",
          openedWallet: false,
          isProcessing: false
        };        
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.wallet.address.length > 2) {
            console.log('WelcomeBack/componentDidMount/address', this.props.wallet.address);
            this.setState({
                isProcessing: false,
                openedWallet: true
            })
        }
    }

    handleClick(event){
        event.preventDefault();
        this.setState({
            isProcessing: true
        })
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
    if (this.state.openedWallet) {
        return (
          <Redirect to="/choosecreateidentityorhome" />
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
                <p align="center">Forgot your password? <Link to="/importwallet"><u>Import</u></Link>  using your phrase</p>            
            </Form>
            <Loader visible={this.state.isProcessing} />
        </div>
    );
  }

}

const mapStateToProps = state => ({
    wallet: state.wallet
  });
  
const mapDispatchToProps = dispatch => bindActionCreators(WalletActions, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(WelcomeBack);
