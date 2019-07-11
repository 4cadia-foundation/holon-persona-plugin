import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import logo from '../../../images/logo.png';

 class Welcome extends Component {

  render () {

    return (
      <main>
        <img className="logo" src={logo} alt="Logo" />
        <h1 className="Title">Welcome to Holon</h1>
        <h3 className="Subtitle">Connecting you to the Decentralized Web. We're happy to see you.</h3>
        <Button bsStyle="warning">Get started</Button>
      </main>
    );
  }

}

export default Welcome;