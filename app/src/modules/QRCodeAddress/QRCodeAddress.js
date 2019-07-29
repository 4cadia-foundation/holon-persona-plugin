import React, { Component } from 'react';
import * as WalletActions from "../../redux/actions/wallet";
import EthereumQRPlugin from 'ethereum-qr-code';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import './QRCodeAddress.css'
import Loader from '../../components/Loader/Loader';
import CloseIconPage from '../../components/CloseIconPage/CloseIconPage';

class QRCodeAddress extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      isLoading: true,
    }
    this._qr = new EthereumQRPlugin();
  }

  componentDidMount() {
    const sendDetails = {
      to: this.props.wallet.address,
    }
    const configDetails = {
      size:280,
      selector: '#ethereum-qr-code-address',
    }
    console.log('qrcodeaddress', sendDetails);
    console.log('qrcodeaddress', configDetails);
    this.setState({
      isLoading: false,
      address: this.props.wallet.address,
    });
    this._qr.toCanvas(sendDetails, configDetails);
  }

  render() {
    return (
      <div className="container-load-qrcode">
        <div className="btn-add-close">
          <CloseIconPage destination="/menu"/>
        </div>
        <div className="vertical-spacer-120"></div>
        <div className="text-center" id="ethereum-qr-code-address">
          &nbsp;
        </div>
        <div className="paragraph text-center">
          {this.state.address}
        </div>
        <Loader visible={this.state.isLoading} message="Loading your address from wallet" />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  wallet: state.wallet
});

const mapDispatchToProps = dispatch => bindActionCreators(WalletActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(QRCodeAddress);
