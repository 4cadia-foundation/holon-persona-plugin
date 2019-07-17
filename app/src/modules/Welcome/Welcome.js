import React, { Component } from 'react'
import { Button, Grid, Row, Col } from 'react-bootstrap';
import logo from '../../../images/logo.png';
import './Welcome.css';

 class Welcome extends Component {

  render () {

    return (
        <Grid className="gridPrincipal">
          <header>
            <Row className="text-center">
              <img className="logo" src={logo} alt="Logo" />
            </Row>
            <Row className="text-center">
              <h3 className="Title">Welcome to Holon</h3>
            </Row>
          </header>
          <section>
          <Row className="text-center">
            <p className= "subtitle">Connecting you to the Decentralized Web. <br/> We're happy to see you.</p>
          </Row>
          </section>
          <footer>
            <Row className="text-center">
              <Button bsStyle="warning" block className="welcomeButton" onClick={ () => this.props.history.push('/choosecreateorimport')}>Get started</Button>
            </Row>
          </footer>
        </Grid>
    );
  }

}

export default Welcome;