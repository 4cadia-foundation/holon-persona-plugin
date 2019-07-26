import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Col, DropdownButton, Glyphicon, Grid, MenuItem, Row } from 'react-bootstrap';

import Balance from '../../components/Balance/Balance';
import CloseIconPage from '../../components/CloseIconPage/CloseIconPage';
import '../../styles/_utils.css';
import './Menu.css';

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
                            <Glyphicon id="glyph-color" glyph="share"/>
                            <a href="" className="space-icon-p paragraph">Etherscan</a>
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
                                    bsSize="xsmall"
                                    title="Select network"
                                    id="dropdown">
                                    <MenuItem className="paragraph" eventKey="1">Main ethereum network</MenuItem>
                                    <MenuItem className="paragraph" eventKey="2">Rinkeby network</MenuItem>
                                    <MenuItem className="paragraph" eventKey="3">Localhost</MenuItem>
                                </DropdownButton>
                        </div>
                    </div>
                    <hr className="line-menu"></hr>
                    <div>
                        <Balance />
                    </div>
                    <Button className="paragraph" bsSize="small" onClick={() => this.props.history.push('/welcomeback')}>Logout</Button>
                </Col>
            </Row>
    </Grid>
)}};

export default Menu;