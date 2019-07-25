import React, { Component } from 'react'
import * as PersonaActions from "../../redux/actions/persona";
import './Balance.css';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';

class Balance extends Component {

    constructor(props) {
        super(props);
        this.state = {balance: 0};        
    }

    componentDidMount() {
        this.props.getBalance();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        //console.log('WalletPassword/getDerivedStateFromProps nextProps', nextProps.persona);
        //console.log('WalletPassword/getDerivedStateFromProps prevState', prevState);
        if (nextProps.persona.error.length>2) {
            const msg = 'Erro: ' + nextProps.persona.error;
            console.error('Balance/getDerivedStateFromProps: ', msg);
            alert(msg);
            return { balance: 0 };
        }
        return { balance : nextProps.persona.balance };        
    }

    render() {
        return(
            <div id="display-balance">
                <h3 className="text-center">
                    {this.state.balance}
                </h3>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    persona: state.persona
  });
  
const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(Balance);