import React, { Component } from 'react';
import { Row, Col, Grid, Panel, Button, Glyphicon } from 'react-bootstrap';
import './Notifications.css';

class Notifications extends Component {
    render() {
        return(
            <Grid>
                <Row>
                    <Col>
                        <Glyphicon className="icon-remove"glyph="remove"/> 
                          <hr className="line"></hr>
                          <div className="title-paragraph">
                            <h1 className="title">Notifications</h1>
                            <p className="paragraph">See which companies are willing to consume your data.</p>           
                          </div>
                        <div className="box-one">
                          <Panel id="panel-notification">
                             <div>
                                <div className="inner-content-text">
                                  <Panel.Title componentClass="h3">Atlas Quantum</Panel.Title>
                                  <Panel.Title componentClass="h3">Email</Panel.Title>
                                  <Panel.Title componentClass="h3">RG</Panel.Title>
                                </div>
                                     
                              <div className="inner-content-button">
                                <Button bsStyle="warning">Allow</Button>
                                <Button bsStyle="warning">Decline</Button>
                              </div>
                              </div>                              
                            </Panel>
                              <Panel id="panel-notification">
                                <div>
                                  <div className="inner-content-text">
                                    <Panel.Title componentClass="h3">Mercado Bitcoin</Panel.Title>
                                    <Panel.Title componentClass="h3">Email</Panel.Title>
                                    <Panel.Title componentClass="h3">CPF</Panel.Title>
                                  </div>

                                  <div className="inner-content-button">
                                    <Button bsStyle="warning">Allow</Button>
                                    <Button bsStyle="warning">Decline</Button>
                                  </div>
                                </div>                              
                              </Panel>
                        </div>

                        <div className="box-two">
                          <Panel id="panel-notification">
                            <div>
                              <div className="inner-content-text"> 
                                <Panel.Title componentClass="h3">Janus Plataform</Panel.Title>
                                <Panel.Title componentClass="h3">Birth Date</Panel.Title>
                                <Panel.Title componentClass="h3">Address</Panel.Title>
                              </div>

                              <div className="inner-content-button">
                                <Button bsStyle="warning">Allow</Button>
                                <Button bsStyle="warning">Decline</Button>
                              </div>
                            </div>                              
                          </Panel>
                            <Panel id="panel-notification">
                              <div>
                                <div className="inner-content-text">
                                  <Panel.Title componentClass="h3">Bounties</Panel.Title>
                                  <Panel.Title componentClass="h3">Email</Panel.Title>
                                  <Panel.Title componentClass="h3">Occupation</Panel.Title>
                                </div>

                              <div className="inner-content-button">
                                <Button bsStyle="warning">Allow</Button>
                                <Button bsStyle="warning">Decline</Button>
                              </div>  
                              </div>                              
                            </Panel>
                        </div>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Notifications;