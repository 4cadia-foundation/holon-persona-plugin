import React, { Component } from 'react'
import { Button, Form, FormControl, Grid, Row} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as WalletActions from "../../redux/actions/wallet";

import Loader from '../../components/Loader/Loader';
import logo from '../../../images/logo.png';
import './WelcomeBack.css'

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
            //console.log('WelcomeBack/componentWillReceiveProps/address', nextProps.wallet);
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
        return this.state.password.length >= 8;
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
        <Grid className="margin-top-50">
            <Row className="text-center">
                <img className="logo" src={logo} alt="Logo" />
            </Row>
            <Form>
                <div>
                    <h3 align="center" className="title" >Welcome Back</h3>
                    <p align="center" className="paragraph"> The decentralized web waits for you </p>
                </div>
                <label className="paragraph">Password</label>
                <FormControl 
                    className="paragraph"
                    id="password" 
                    type="password" 
                    value={this.state.password}
                    placeholder="The password must have 8 characters" 
                    onChange={this.handleChange}
                />
                <Button disabled={!this.validateForm()} className="paragraph btn btn-block" bsSize="large" block bsStyle="warning" type="submit" onClick={this.handleClick}>
                    Log in
                </Button>    
                <p className="paragraph p-welcomeback" align="center">Forgot your password? <Link to="/importwallet">Import</Link>  using your phrase</p>            
            </Form>
            <Loader visible={this.state.isProcessing} />
        </Grid>
    );
  }

}

const mapStateToProps = state => ({
    wallet: state.wallet
});

const mapDispatchToProps = dispatch => bindActionCreators(WalletActions, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(WelcomeBack);
