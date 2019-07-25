import React, { Component } from 'react'
import {Button} from 'react-bootstrap';
import * as WalletActions from "../../redux/actions/wallet";

import {connect} from "react-redux";
import { bindActionCreators } from 'redux';

class Balance extends Component {

    constructor(props) {
        super(props);
        
        this.state = {balance: 0};
    }

    render() {
        return(
            <div>
                <h3>
                    {this.state.balance}
                </h3>
            </div>
        )
    }
    
    getBalance() {
        const balance = this.props.wallet.getBalance();
        balance.then((chiboquinha) => {
            this.setState({
                balance: chiboquinha
            })
        });
    }

    componentDidMount() {
        this.getBalance();
    }
}


const mapStateToProps = state => ({
    wallet: state.wallet.ethersWallet
  });
  
const mapDispatchToProps = dispatch => bindActionCreators(WalletActions, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(Balance);