import React, { Component } from 'react'
import { Grid, Row, Col, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import TableValidations from '../../components/TableValidations/TableValidations';

import styles from './WalletPassword.css';

 class WalletPassword extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        debugger;
        console.log("Funcionou");
    }

  render () {

    return (
        <div>
        <Form>
            <Form.Group controlId="formWalletPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
                <Form.Text className="text-muted">
                    We'll never share your password with anyone else.
                </Form.Text>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />          
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.handleClick}>
            Submit
            </Button>
      </Form>
      </div>
    );
  }

}
export default WalletPassword;

// export default connect(state => (
//     { 
//       activeDocument: state.validations.activeDocument, 
//       publicKey: state.validations.publicKey 
//     }
//   ))(Home);
