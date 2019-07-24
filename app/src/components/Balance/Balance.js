import React, { Component } from 'react'
import * as WalletActions from "../../redux/actions/wallet";

import {connect} from "react-redux";
import { bindActionCreators } from 'redux';

class Balance extends Component {

    render() {
        return(
            <div></div>
        )
    }
}


const mapStateToProps = state => ({
    wallet: state.wallet
  });
  
const mapDispatchToProps = dispatch => bindActionCreators(WalletActions, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(Balance);