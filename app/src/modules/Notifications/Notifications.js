import React, { Component } from 'react';
import { Row, Col, Grid, Panel, Button } from 'react-bootstrap';

import CloseIconPage from '../../components/CloseIconPage/CloseIconPage';
import './Notifications.css';

class Notifications extends Component {
    render() {
        return(
            <Grid className="grid-notifications">
                <Row>
                    <Col>
                        <div className="closeButtonNotifications">
                          <CloseIconPage destination="/home" /> 
                        </div>
                          <div className="header-notification">
                            <h3 className="title">Notifications</h3>
                            <p className="paragraph">See which companies are willing to consume your data.</p>           
                          </div>
                        <div className="box-one">
                          <Panel id="panel-notification">
                             <div>
                                <div className="inner-content-text">
                                  <Panel.Title className="paragraph p-consumername">Atlas Quantum</Panel.Title>
                                  <Panel.Title className="paragraph">Email</Panel.Title>
                                  <Panel.Title className="paragraph">RG</Panel.Title>
                                </div>
                                     
                              <div className="inner-content-button">
                                <Button className="paragraph" bsStyle="warning" bsSize="small">Allow</Button>
                                <Button className="paragraph" bsStyle="warning" bsSize="small">Decline</Button>
                              </div>
                              </div>                              
                            </Panel>
                              <Panel id="panel-notification">
                                <div>
                                  <div className="inner-content-text">
                                    <Panel.Title className="paragraph p-consumername">Mercado Bitcoin</Panel.Title>
                                    <Panel.Title className="paragraph">Email</Panel.Title>
                                    <Panel.Title className="paragraph">CPF</Panel.Title>
                                  </div>

                                  <div className="inner-content-button">
                                    <Button className="paragraph" bsStyle="warning" bsSize="small">Allow</Button>
                                    <Button className="paragraph" bsStyle="warning" bsSize="small">Decline</Button>
                                  </div>
                                </div>                              
                              </Panel>
                        </div>

                        <div className="box-two">
                          <Panel id="panel-notification">
                            <div>
                              <div className="inner-content-text"> 
                                <Panel.Title className="paragraph p-consumername">Janus Plataform</Panel.Title>
                                <Panel.Title className="paragraph">Birth Date</Panel.Title>
                                <Panel.Title className="paragraph">Address</Panel.Title>
                              </div>

                              <div className="inner-content-button">
                                <Button className="paragraph" bsStyle="warning" bsSize="small">Allow</Button>
                                <Button className="paragraph" bsStyle="warning" bsSize="small">Decline</Button>
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