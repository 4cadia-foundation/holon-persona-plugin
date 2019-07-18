import React, { Component } from 'react';
import {Button, Grid, Col, Row, Glyphicon } from 'react-bootstrap';
import './BackupPhrase.css'

class BackupPhrase extends Component {
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
                        <textarea className="box-mnemonico"rows="10" cols="40" maxlength="50"></textarea>
                        <div className="button-exit">
                            <Button bsStyle="warning" >Back</Button>
                            <Button bsStyle="warning" >Next</Button>
                        </div>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default BackupPhrase;