import React, { Component } from 'react';
import {Button, Grid, Col, Row, Glyphicon } from 'react-bootstrap';
import './BackupPhrase.css'
import {connect} from "react-redux";
import * as WalletActions from "../../redux/actions/wallet";
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';


class BackupPhrase extends Component {

    constructor(props){
        super(props);
    }

    render() {

        return (
            <Grid>
                <Row>
                    <Col>
                        <h1 className="text-center title">Secret Backup Phrase</h1>
                            <div className="paragraph-explication">
                                 <Glyphicon className="icon-alert" glyph="alert" />
                                 <p>Your <strong>secret backup phrase</strong> makes it easy restore your account.
                                 <strong> Never</strong> disclose your backup phrase.
                                 Anyone with this phrase can takes your Ether forever.</p>
                            </div>
                            <div>
                                {this.props.mnemonic}
                            </div>
                            <div className="button-exit">
                                <Button bsStyle="warning" >Back</Button>
                                <Link to="/home">
                                    <Button bsStyle="warning" >Next</Button>
                                </Link>
                            </div>
                     </Col>
                 </Row>
             </Grid>
         )
     }
 }
 
 const mapStateToProps = state => ({
   mnemonic: state.wallet.mnemonic
  });
  const mapDispatchToProps = dispatch => bindActionCreators(WalletActions, dispatch);

  export default connect(mapStateToProps, mapDispatchToProps)(BackupPhrase);
