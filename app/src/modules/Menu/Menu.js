import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Col, DropdownButton, Glyphicon, Grid, MenuItem, Row } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PersonaActions from '../../redux/actions/persona';

import Balance from '../../components/Balance/Balance';
import CloseIconPage from '../../components/CloseIconPage/CloseIconPage';
import Loader from '../../components/Loader/Loader';
import Settings from '../../../config/settings';
import '../../styles/_utils.css';
import '../Menu/Menu.css';

class Menu extends Component {
  
    constructor (props) {
      super(props)
      this.state = {
        closeMenu: false,
        
      }
      this.handleClick = this.handleClick.bind(this);
      this.handleNetworkChange = this.handleNetworkChange.bind(this);
    }
    
    handleClick() {
      this.setState({
        closeMenu: true
      })
    }

    handleNetworkChange(event) {
        console.log('menu/handleNetworkChange/event.target.value', event.target.value);
        this.props.changeNetwork(event.target.value);
    }

    render() {

        let network = '';
        if (Settings.network === 4) {
            network = "rinkeby.";
        }

        if (this.state.closeMenu) {
            return (
              <Redirect to='/home' />
            )
        }

        return(
        <Grid>
            <Row>
                <Col>
                    <div className="btn-menu-close">
                        <CloseIconPage destination="/home"/>
                    </div>
                    <div className="d-flex flex-row justify-content-between margin-top-10">
                        <h3 id="title-menu" className="title">Identity</h3>
                    </div>
                    <hr className="line-menu"/>
                    <div className="links">
                        <div className="flex-column">
                            <Link to='/addinformation'>
                                <Glyphicon id="glyph-color" glyph="plus"/> 
                                <a className="space-icon-p paragraph">Add information</a>
                            </Link>
                        </div>
                        <div className="flex-column">
                            <Link to="/validateinformation">
                                <Glyphicon id="glyph-color" glyph="ok"/>
                                <a href="" className="space-icon-p paragraph">Validate information</a>
                            </Link>
                        </div>
                        <div className="flex-column">
                            <Link to="/notifications">
                                <Glyphicon id="glyph-color" glyph="download-alt"/>
                                <a href="" className="space-icon-p paragraph">Notifications</a>
                            </Link>
                        </div>
                    </div>
                    <hr className="line-menu" />
                    <div className="links2">
                        <div className="flex-column">
                            <Link to="/profile">
                                <Glyphicon id="glyph-color" glyph="user"/> 
                                <a href="" className="space-icon-p paragraph">Profile</a>
                            </Link>
                        </div>
                        <div className="flex-column">
                            <a href={"https://" + network + "etherscan.io/address/" + this.props.persona.address} target="_blank">
                                <Glyphicon glyph="share"/>
                                <span className="icons">Etherscan</span>
                            </a>
                        </div>
                        <div className="flex-column">
                            <Link to="/backupphrase">
                                <Glyphicon id="glyph-color" glyph="lock"/>
                                <a href="" className="space-icon-p paragraph">Secret Backup Phrase</a>
                            </Link>
                        </div>
                        <div  className="flex-column">
                            <Glyphicon id="glyph-color" glyph="cog"/>
                                <DropdownButton
                                    onChange={this.handleNetworkChange}
                                    bsSize="xsmall"
                                    title="Select network"
                                    id="drop">
                                    <MenuItem eventKey="1">Main ethereum network</MenuItem>
                                    <MenuItem eventKey="4">Rinkeby network</MenuItem>
                                    <MenuItem eventKey="99">Localhost</MenuItem>
                                </DropdownButton>
                        </div>
                    </div>
                    <hr className="line-menu"></hr>
                    <div>
                        <Balance />
                    </div>
                    <div>
                      <Link to="/qrcodeaddress"><Button bsStyle="warning">Deposit</Button></Link>
                      <Button bsStyle="warning">Send</Button>
                    </div>
                    <Link to="/welcomeback">
                        <a href="" className="leave">Logout</a>
                    </Link>
                    <Loader message="Changing Blockchain network" visible={this.props.persona.isRunning} />
                </Col>
            </Row>
    </Grid>
)}};

const mapStateToProps = state => ({ 
    persona: state.persona
});
  
const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(Menu);