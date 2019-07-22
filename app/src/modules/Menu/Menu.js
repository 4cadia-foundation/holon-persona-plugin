import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Grid, Glyphicon, DropdownButton, MenuItem, Button} from 'react-bootstrap';
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
                            <Link to='/addinformation'>
                                <Glyphicon glyph="plus"/> 
                                <a className="icons">Add information</a>
                            </Link>
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
                        <div  className="flex-column">
                            <Glyphicon glyph="cog"/>
                            {/* <ButtonToolbar  className="flex-column"> */}
                                <DropdownButton
                                    bsSize="xsmall"
                                    title="Select network"
                                    id="drop">
                                    <MenuItem eventKey="1">Main ethereum network</MenuItem>
                                    <MenuItem eventKey="2">Rinkeby network</MenuItem>
                                    <MenuItem eventKey="3">Localhost</MenuItem>
                                </DropdownButton>
                            {/* </ButtonToolbar> */}
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