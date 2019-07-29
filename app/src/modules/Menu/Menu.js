import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, Grid, Glyphicon, DropdownButton, MenuItem, Button} from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PersonaActions from '../../redux/actions/persona';

import CloseIconPage from '../../components/CloseIconPage/CloseIconPage';
import './Menu.css';
import '../../styles/_utils.css';
import Balance from '../../components/Balance/Balance';
import Settings from '../../../config/settings';
import Loader from '../../components/Loader/Loader';

class Menu extends Component {
  
    constructor (props) {
      super(props)
      this.state = {
        closeMenu: false
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
                    <nav className="d-flex flex-row justify-content-between">
                        <p className="titleMenu">Identity</p>
                        <CloseIconPage className="destination-icon" destination="/home"/>                    
                    </nav>
                    <hr className="line"/>
                    <div className="links">
                        <div className="flex-column">
                            <Link to='/addinformation'>
                                <Glyphicon glyph="plus"/> 
                                <a className="icons">Add information</a>
                            </Link>
                        </div>
                        <div className="flex-column">
                            <Link to="/validateinformation">
                                <Glyphicon glyph="ok"/>
                                <a href="" className="icons">Validate information</a>
                            </Link>
                        </div>
                        <div className="flex-column">
                            <Link to="/notifications">
                                <Glyphicon glyph="download-alt"/>
                                <a href="" className="icons">Notifications</a>
                            </Link>
                        </div>
                    </div>
                    <hr className="line" />
                    <div className="links2">
                        <div className="flex-column">
                            <Link to="/profile">
                                <Glyphicon glyph="user"/> 
                                <a href="" className="icons">Profile</a>
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
                                <Glyphicon glyph="lock"/>
                                <a href="" className="icons">Secret Backup Phrase</a>
                            </Link>
                        </div>
                        <div  className="flex-column">
                            <Glyphicon glyph="cog"/>
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
                    <hr className="line"></hr>
                    <div>
                        <Balance />
                    </div>
                    <div className="botoes">
                      <Link to="/qrcodeaddress"><Button bsStyle="warning">Deposit</Button></Link>
                      <Button bsStyle="warning">Send</Button>
                    </div>
                    <Link to="/welcomeback">
                        <a href="" className="sair">Logout</a>
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