import React, { Component } from 'react';
import { Button, Col, Glyphicon, Grid, Row, Panel } from 'react-bootstrap';

import "./ChooseCreateOrImport.css";

class ChooseCreateOrImport extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Grid>
                <Row className="margin-top-50">
                    <Col xs={12} md={12}>
                        <h3 className="text-center title">New to Holon?</h3>
                    </Col>
                </Row>
                <div className="margin-top-30">
                    <Row>
                        <Col className="text-center" xs={12} md={12}>
                            <Panel className="panel paragraph">
                                <div className="text-inside">
                                    <Glyphicon glyph="download-alt" />
                                    <Panel.Title componentClass="h3">I already have a wallet </Panel.Title>
                                    <Button className="paragraph" bsStyle="warning" onClick={ () => this.props.history.push('/importwallet')}>Import</Button>
                                </div>
                            </Panel>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center" xs={12} md={12}>
                            <Panel className="panel paragraph">
                                <div className="text-inside">
                                    <Glyphicon glyph="plus"/>
                                    <Panel.Title componentClass="h3">Let's create a wallet </Panel.Title>
                                    <Button className="paragraph" bsStyle="warning" onClick={ () => this.props.history.push('/walletpassword')}>Create</Button>
                                </div>
                            </Panel>
                        </Col>
                    </Row>
                </div>
            </Grid>
        )
    }
}


export default ChooseCreateOrImport;