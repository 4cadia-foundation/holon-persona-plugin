import React, { Component } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap';
//import { connect } from 'react-redux';
//import TableValidations from '../../components/TableValidations/TableValidations';

import styles from './WelcomeBack.css';

 class WelcomeBack extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
          password: ""
        };        
    }

    handleClick(){
        console.log("Funcionou");
    }
    validateForm() {
        return this.state.password.length > 7;
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
                <img src="images/icon-128.png" className="center-block" alt="Holon"/>
            </div>
            <br/>
            <Form>
                <div>
                    <h2 align="center" >Welcome Back</h2>
                    <p align="center"> The decentralized web awaits </p>
                </div>
                <br/>
                <label>Password</label>
                <FormControl 
                    id="password" 
                    type="password" 
                    value={this.state.password}
                    placeholder="Password" 
                    onChange={this.handleChange}
                />
                <Button disabled={!this.validateForm()} className="btn btn-block btn-primary pull-right"  type="submit" onClick={this.handleClick}>
                    LOG IN
                </Button>    
                <p align="center">Forgot your password? <a href="#"><u>Import</u></a>  using your phrase</p>            
            </Form>

        </div>
    );
  }

}
export default WelcomeBack;

// export default connect(state => (
//     { 
//       activeDocument: state.validations.activeDocument, 
//       publicKey: state.validations.publicKey 
//     }
//   ))(Home);
