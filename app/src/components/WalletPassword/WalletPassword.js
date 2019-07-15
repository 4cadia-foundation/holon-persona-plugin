import React, { Component } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap';
//import { connect } from 'react-redux';
//import TableValidations from '../../components/TableValidations/TableValidations';

import styles from './WalletPassword.css';

 class WalletPassword extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
          password: "",
          password2: ""
        };        
    }

    handleClick(){
        console.log("Funcionou");
    }
    validateForm() {
        return this.state.password.length > 0 && this.state.password2.length > 0;
    }
    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
    }

  render () {

    return (
        <div>
            <div>
                <img src="images/icon-128.png" className="rounded center-block" alt="Holon"/>
            </div>
            <hr/>
            <Form>
                <div>
                    <h2 align="center" >Create Your Wallet</h2>
                </div>
                
                <label>New Password</label>
                <FormControl 
                    id="password" 
                    type="password" 
                    value={this.state.password}
                    placeholder="Password" 
                    onChange={this.handleChange}
                />
                <br></br>
                <label>Confirm Password</label>
                <FormControl 
                    id="password2" 
                    type="password" 
                    value={this.state.password2}
                    placeholder="Confirm Password" 
                    onChange={this.handleChange}
                />
                
                <Button disabled={!this.validateForm()} className="btn btn-primary btn-block"  type="submit" onClick={this.handleClick}>
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
