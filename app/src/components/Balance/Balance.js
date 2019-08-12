import React, { Component } from 'react'

import {connect} from "react-redux";
import * as PersonaActions from "../../redux/actions/persona";

import './Balance.css';

class Balance extends Component {

    constructor(props) {
        super(props);
        this.state = {balance: 0};
    }

    componentDidMount() {
      PersonaActions.getBalance(this.props.dispatch);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        //console.log('WalletPassword/getDerivedStateFromProps nextProps', nextProps.persona);
        //console.log('WalletPassword/getDerivedStateFromProps prevState', prevState);
        if (nextProps.persona.error.length>2) {
            const msg = 'Erro: ' + nextProps.persona.error;
            console.error('Balance/getDerivedStateFromProps: ', msg);
            return { balance: 0 };
        }
        return { balance : nextProps.persona.balance };
    }

    render() {
        return(
            <div id="container-balance">
                <p id="p-balance" className="text-center paragraph">
                    {this.state.balance} ETH
                </p>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    persona: state.persona
});



export default connect(mapStateToProps)(Balance);
