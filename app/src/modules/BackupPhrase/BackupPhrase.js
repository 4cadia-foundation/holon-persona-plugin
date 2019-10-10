import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as WalletActions from '../../redux/actions/wallet';

import CloseIconPage from '../../components/CloseIconPage/CloseIconPage';
import './BackupPhrase.css';

class BackupPhrase extends Component {
  render() {
    return (
            <Grid>
                <Row>
                    <Col>
                        <div className="btn-add-close">
                            <CloseIconPage destination="/menu"/>
                        </div>
                        <div className="margin-top-50">
                            <h3 id="title-backup" className="text-center title">Secret Backup Phrase</h3>
                        </div>
                        <div className="paragraph-explication text-center">
                            <p className="paragraph">Your <strong>secret backup phrase</strong> makes it easy restore your account.
                                <strong> Never</strong> disclose your backup phrase.
                                Anyone with this phrase can takes your Ether forever.
                            </p>
                        </div>
                        <div className="backup-phrase paragraph">
                            <div className="mnemonic-returned">
                                {this.props.mnemonic}
                            </div>
                        </div>
                        <div className="paragraph-pk text-center">
                            <h4 className="title">Private Key</h4>
                        </div>
                        <div className="paragraph">
                            <div className="privateKey-returned">
                                {this.props.ethersWallet.privateKey.substring(2)}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  mnemonic: state.wallet.mnemonic,
  ethersWallet: state.wallet.ethersWallet,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(WalletActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BackupPhrase);