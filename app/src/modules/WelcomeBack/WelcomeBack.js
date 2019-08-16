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
          isProcessing: false,
          msg: "Loading",
        };        
    }

    handleClick(event){
        event.preventDefault();
        this.setState({
            isProcessing: true,
            msg: "Openning wallet",
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

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.wallet.error.length > 2 && prevState.isProcessing && prevState.password.length > 1) {
            const msg = 'Erro: ' + nextProps.wallet.error;
            console.log('WelcomeBack/getDerivedStateFromProps', msg);
            return { isProcessing: false, password: ""};
        }
        if (nextProps.wallet.openedWallet) {
            return { openedWallet: nextProps.wallet.openedWallet };
        }
        return null;
    }

    render () {
    if (this.state.openedWallet) {
        return (
          <Redirect to="/choosecreateidentityorhome" />
        );
    }

    return (
        <Grid className="margin-welcomeBack">
            <Row className="text-center">
                <img className="logo" src={logo} alt="Logo" />
            </Row>
            <Form>
                <div>
                    <h3 align="center" className="title" >Welcome Back</h3>
                    <p align="center" className="paragraph"> The decentralized web waits for you </p>
                </div>
                <label className="paragraph label-welcomeback">Password</label>
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
            <Loader visible={this.state.isProcessing} message={this.state.msg} />
        </Grid>
    );
  }

}

const mapStateToProps = state => ({
    wallet: state.wallet
});

const mapDispatchToProps = dispatch => bindActionCreators(WalletActions, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(WelcomeBack);
