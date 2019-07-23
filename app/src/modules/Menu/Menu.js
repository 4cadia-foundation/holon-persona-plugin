import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, Grid, Glyphicon, DropdownButton, MenuItem, Button} from 'react-bootstrap';
import './Menu.css';
import '../../styles/_utils.css';

class Menu extends Component {
  
    constructor (props) {
      super(props)
      this.state = {
        closeMenu: false
      }
      this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
      this.setState({
        closeMenu: true
      })
    }

    render() {

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
                        <Glyphicon glyph="remove" onClick={ this.handleClick }/>
                    </nav>
                    <hr className="line"/>
                    <div className="links">
                        <div className="flex-column">
                            <Glyphicon glyph="plus"/> 
                            <a href="" className="icons">Add information</a>
                        </div>
                        <div className="flex-column">
                            <Link to="/validateinformation">
                                <Glyphicon glyph="ok"/>
                                <a href="" className="icons">Validate information</a>
                            </Link>
                        </div>
                        <div className="flex-column">
                            <Glyphicon glyph="download-alt"/>
                            <a href="" className="icons">Notifications</a>
                        </div>
                    </div>
                    <hr className="line" />
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
                                <DropdownButton
                                    bsSize="xsmall"
                                    title="Select network"
                                    id="drop">
                                    <MenuItem eventKey="1">Main ethereum network</MenuItem>
                                    <MenuItem eventKey="2">Rinkeby network</MenuItem>
                                    <MenuItem eventKey="3">Localhost</MenuItem>
                                </DropdownButton>
                        </div>
                    </div>
                    <hr className="line"></hr>
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