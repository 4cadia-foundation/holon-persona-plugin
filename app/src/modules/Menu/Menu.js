import React, {Component} from 'react';
import { Row, Col, Grid, Glyphicon, DropdownButton, ButtonToolbar, MenuItem, Button} from 'react-bootstrap';
import './Menu.css';

class Menu extends Component {
    render() {
        return(
        <Grid>
            <Row>
                <Col>
                    <h2 className="margin-left">Identify</h2>
                    <hr className="linha"/>
                    <div className="links">
                        <div className="flex-column">
                            <Glyphicon glyph="plus"/> 
                            <a href="" className="icons">Add information</a>
                        </div>
                        <div className="flex-column">
                            <Glyphicon glyph="ok"/>
                            <a href="" className="icons">Validate information</a>
                        </div>
                        <div className="flex-column">
                            <Glyphicon glyph="download-alt"/>
                            <a href="" className="icons">Notifications</a>
                        </div>
                    </div>
                    <hr className="linha" />
                    <div className="links2">
                        <div className="flex-column">
                            <Glyphicon glyph="user"/> 
                            <a href="" className="icons">Profile</a>
                        </div>
                        <div className="flex-column">
                            <Glyphicon glyph="share"/>
                            <a href="" className="icons">Etherscan</a>
                        </div>
                        <div className="flex-column">
                            <Glyphicon glyph="lock"/>
                            <a href="" className="icons">Export Private Key</a>
                        </div>
                        <div className="flex-column">
                            <Glyphicon glyph="cog"/>
                            <ButtonToolbar >
                                <DropdownButton
                                    bsSize="xsmall"
                                    title="Select network">
                                    <MenuItem >Main ethereum network</MenuItem>
                                    <MenuItem >Rinkeby test network</MenuItem>
                                    <MenuItem >Localhost</MenuItem>
                                </DropdownButton>
                            </ButtonToolbar>
                        </div>
                    </div>
                    <hr className="linha"></hr>
                    <div>
                      <h1 className="text-center">2 ETH</h1>
                    </div>
                    <div className="botoes">
                      <Button bsStyle="warning">Deposit</Button>
                      <Button bsStyle="warning">Send</Button>
                    </div>
                    <a href="" className="sair">Logout</a>

                </Col>
            </Row>
        </Grid>
)}};

export default Menu;